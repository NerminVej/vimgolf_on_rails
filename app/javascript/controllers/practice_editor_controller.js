import { Controller } from "@hotwired/stimulus"
import { EditorView } from "@codemirror/view"
import { EditorState } from "@codemirror/state"
import { vim } from "@replit/codemirror-vim"

export default class extends Controller {
  static values = {
    startContent: String,
    targetContent: String,
    attemptId: String,
    sessionId: String,
    sessionStartedAt: Number
  }

  static targets = [
    "editor",
    "status",
    "keystrokes",
    "completedCount",
    "attemptedCount",
    "totalKeystrokes",
    "sessionTime"
  ]

  connect() {
    console.log("🎯 PracticeEditorController connected")

    this.keystrokeCount = 0
    this.completionInProgress = false

    this.initializeEditor()
    this.startSessionTimer()
  }

  disconnect() {
    console.log("🎯 PracticeEditorController disconnected")

    if (this.editorView) {
      this.editorView.destroy()
    }

    if (this.sessionTimerInterval) {
      clearInterval(this.sessionTimerInterval)
    }
  }

  initializeEditor() {
    try {
      const startContent = JSON.parse(this.startContentValue)
      const targetContent = JSON.parse(this.targetContentValue)

      this.parsedTargetContent = targetContent

      const vimExtension = vim()

      const updateListener = EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          this.keystrokeCount++
          this.updateKeystrokeCount()
          this.checkCompletion()
        }
      })

      const extensions = [vimExtension, updateListener]

      const startState = EditorState.create({
        doc: startContent,
        extensions: extensions
      })

      this.editorView = new EditorView({
        state: startState,
        parent: this.editorTarget
      })

      console.log("✅ Practice editor initialized successfully")
    } catch (error) {
      console.error("❌ Error initializing practice editor:", error)
      throw error
    }
  }

  startSessionTimer() {
    const updateTimer = () => {
      const now = Math.floor(Date.now() / 1000)
      const elapsed = now - this.sessionStartedAtValue

      const minutes = Math.floor(elapsed / 60)
      const seconds = elapsed % 60

      const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

      if (this.hasSessionTimeTarget) {
        this.sessionTimeTarget.textContent = formattedTime
      }
    }

    // Update immediately
    updateTimer()

    // Update every second
    this.sessionTimerInterval = setInterval(updateTimer, 1000)
  }

  updateKeystrokeCount() {
    if (this.hasKeystrokesTarget) {
      this.keystrokesTarget.textContent = this.keystrokeCount
    }
  }

  checkCompletion() {
    const currentContent = this.editorView.state.doc.toString()

    if (currentContent.trim() === this.parsedTargetContent.trim()) {
      console.log("✅ Content matches! Marking as completed")
      this.markAsCompleted()
    }
  }

  markAsCompleted() {
    if (this.completionInProgress) {
      return
    }
    this.completionInProgress = true

    if (this.hasStatusTarget) {
      this.statusTarget.classList.remove("bg-gray-100")
      this.statusTarget.classList.add("bg-green-100", "border-green-300")
      this.statusTarget.querySelector('span:nth-child(2)').textContent = "Completed!"
      this.statusTarget.querySelector('span:nth-child(2)').classList.add("text-green-700", "font-bold")
    }

    this.submitCompletion()
  }

  async submitCompletion() {
    console.log("📤 Submitting practice completion")
    const content = this.editorView.state.doc.toString()

    const csrfToken = document.querySelector("[name='csrf-token']").content

    try {
      const response = await fetch(`/practice_attempts/${this.attemptIdValue}/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken
        },
        body: JSON.stringify({
          content: content,
          keystrokes: this.keystrokeCount
        })
      })

      const data = await response.json()
      console.log("📤 Response data:", data)

      if (data.success) {
        // Update session stats in UI
        this.updateSessionStats(data.stats)

        // Show success message
        this.showSuccessMessage(data.message)

        // Auto-advance to next exercise after 1.5 seconds
        console.log("📤 Auto-advancing to next exercise in 1.5s...")
        setTimeout(() => {
          console.log("📤 Redirecting to:", data.next_url)
          window.location.href = data.next_url
        }, 1500)
      } else {
        console.error("❌ Completion failed:", data.message)
        this.completionInProgress = false
      }
    } catch (error) {
      console.error("❌ Error submitting completion:", error)
      this.completionInProgress = false
    }
  }

  updateSessionStats(stats) {
    console.log("📊 Updating session stats:", stats)

    if (this.hasCompletedCountTarget) {
      this.completedCountTarget.textContent = stats.completed
    }

    if (this.hasAttemptedCountTarget) {
      this.attemptedCountTarget.textContent = stats.attempted
    }

    if (this.hasTotalKeystrokesTarget) {
      this.totalKeystrokesTarget.textContent = stats.keystrokes
    }
  }

  showSuccessMessage(message) {
    console.log("🎉 Showing success message:", message)

    // Create toast notification
    const toast = document.createElement('div')
    toast.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg font-semibold text-lg z-50 animate-slide-in'
    toast.textContent = message

    document.body.appendChild(toast)

    // Remove after 1.5 seconds
    setTimeout(() => {
      toast.remove()
    }, 1500)
  }
}
