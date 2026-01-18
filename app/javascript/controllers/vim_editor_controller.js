import { Controller } from "@hotwired/stimulus"
import { EditorView } from "@codemirror/view"
import { EditorState } from "@codemirror/state"
import { vim } from "@replit/codemirror-vim"

console.log("🔷 VimEditorController module loaded")
console.log("🔷 EditorView:", EditorView)
console.log("🔷 EditorState:", EditorState)
console.log("🔷 vim function:", vim)

export default class extends Controller {
  static values = {
    startContent: String,
    targetContent: String,
    exerciseId: String
  }

  static targets = ["editor", "status", "keystrokes"]

  connect() {
    console.log("🟢 VimEditorController connect() called")
    console.log("🟢 Element:", this.element)
    console.log("🟢 Editor target:", this.editorTarget)
    console.log("🟢 Start content value:", this.startContentValue)
    console.log("🟢 Target content value:", this.targetContentValue)
    console.log("🟢 Exercise ID:", this.exerciseIdValue)

    this.keystrokeCount = 0
    this.completionInProgress = false

    console.log("🟢 About to initialize editor...")
    try {
      this.initializeEditor()
      console.log("✅ Editor initialized successfully")
    } catch (error) {
      console.error("❌ Error in connect():", error)
      console.error("❌ Error stack:", error.stack)
    }
  }

  disconnect() {
    console.log("🔴 VimEditorController disconnect() called")
    if (this.editorView) {
      console.log("🔴 Destroying editor view")
      this.editorView.destroy()
    }
  }

  initializeEditor() {
    console.log("🟡 initializeEditor() started")

    try {
      console.log("🟡 Parsing start content...")
      const startContent = JSON.parse(this.startContentValue)
      console.log("🟡 Start content parsed:", startContent)

      console.log("🟡 Parsing target content...")
      const targetContent = JSON.parse(this.targetContentValue)
      console.log("🟡 Target content parsed:", targetContent)

      this.parsedTargetContent = targetContent
      console.log("🟡 Stored target content:", this.parsedTargetContent)

      console.log("🟡 Creating vim extension...")
      const vimExtension = vim()
      console.log("🟡 Vim extension created:", vimExtension)
      console.log("🟡 Vim extension type:", typeof vimExtension)
      console.log("🟡 Vim extension is array?:", Array.isArray(vimExtension))

      console.log("🟡 Creating update listener...")
      const updateListener = EditorView.updateListener.of((update) => {
        console.log("📝 Update listener called, docChanged:", update.docChanged)
        if (update.docChanged) {
          this.keystrokeCount++
          console.log("📝 Keystroke count:", this.keystrokeCount)
          this.updateKeystrokeCount()
          this.checkCompletion()
        }
      })
      console.log("🟡 Update listener created:", updateListener)

      const extensions = [vimExtension, updateListener]
      console.log("🟡 Extensions array:", extensions)
      console.log("🟡 Extensions array length:", extensions.length)
      extensions.forEach((ext, i) => {
        console.log(`🟡 Extension ${i}:`, ext)
        console.log(`🟡 Extension ${i} type:`, typeof ext)
        console.log(`🟡 Extension ${i} is array?:`, Array.isArray(ext))
      })

      console.log("🟡 Creating EditorState with doc:", startContent)
      const startState = EditorState.create({
        doc: startContent,
        extensions: extensions
      })
      console.log("🟡 EditorState created:", startState)

      console.log("🟡 Creating EditorView with parent:", this.editorTarget)
      this.editorView = new EditorView({
        state: startState,
        parent: this.editorTarget
      })
      console.log("🟡 EditorView created:", this.editorView)
      console.log("🟡 EditorView DOM element:", this.editorView.dom)

    } catch (error) {
      console.error("❌ Error in initializeEditor():", error)
      console.error("❌ Error message:", error.message)
      console.error("❌ Error stack:", error.stack)
      throw error
    }
  }

  updateKeystrokeCount() {
    console.log("🔢 updateKeystrokeCount() called")
    console.log("🔢 Has keystrokes target:", this.hasKeystrokesTarget)
    if (this.hasKeystrokesTarget) {
      this.keystrokesTarget.textContent = this.keystrokeCount
      console.log("🔢 Updated keystroke display to:", this.keystrokeCount)
    }
  }

  checkCompletion() {
    console.log("🔍 checkCompletion() called")
    const currentContent = this.editorView.state.doc.toString()
    console.log("🔍 Current content:", currentContent)
    console.log("🔍 Target content:", this.parsedTargetContent)
    console.log("🔍 Current trimmed:", currentContent.trim())
    console.log("🔍 Target trimmed:", this.parsedTargetContent.trim())

    if (currentContent.trim() === this.parsedTargetContent.trim()) {
      console.log("✅ Content matches! Marking as completed")
      this.markAsCompleted()
    } else {
      console.log("⏳ Content doesn't match yet")
    }
  }

  markAsCompleted() {
    console.log("🎉 markAsCompleted() called")
    console.log("🎉 Completion in progress:", this.completionInProgress)
    if (this.completionInProgress) {
      console.log("⚠️ Already in progress, returning")
      return
    }
    this.completionInProgress = true

    console.log("🎉 Has status target:", this.hasStatusTarget)
    if (this.hasStatusTarget) {
      console.log("🎉 Updating status target classes")
      this.statusTarget.classList.remove("bg-gray-100")
      this.statusTarget.classList.add("bg-green-100", "text-green-800")
    }

    console.log("🎉 Calling submitCompletion()")
    this.submitCompletion()
  }

  async submitCompletion() {
    console.log("📤 submitCompletion() called")
    const content = this.editorView.state.doc.toString()
    console.log("📤 Content to submit:", content)

    const csrfToken = document.querySelector("[name='csrf-token']").content
    console.log("📤 CSRF token:", csrfToken)

    try {
      console.log("📤 Fetching:", `/exercises/${this.exerciseIdValue}/complete`)
      const response = await fetch(`/exercises/${this.exerciseIdValue}/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken
        },
        body: JSON.stringify({ content })
      })

      console.log("📤 Response status:", response.status)
      const data = await response.json()
      console.log("📤 Response data:", data)

      if (data.success) {
        console.log("📤 Success! Redirecting in 1.5 seconds...")
        setTimeout(() => {
          const redirectUrl = `/exercises/${this.exerciseIdValue}?completed=true&keystrokes=${this.keystrokeCount}`
          console.log("📤 Redirecting to:", redirectUrl)
          window.location.href = redirectUrl
        }, 1500)
      }
    } catch (error) {
      console.error("❌ Error submitting completion:", error)
      console.error("❌ Error stack:", error.stack)
      this.completionInProgress = false
    }
  }
}
