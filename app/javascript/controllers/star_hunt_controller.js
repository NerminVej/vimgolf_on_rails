import { Controller } from "@hotwired/stimulus"
import { EditorView } from "@codemirror/view"
import { EditorState } from "@codemirror/state"
import { vim } from "@replit/codemirror-vim"

export default class extends Controller {
  static targets = ["editor", "keystrokes", "completedStages", "totalKeystrokes"]
  static values = {
    sessionId: String,
    startFile: String,
    endFile: String,
    currentStage: Number,
    completedStages: Number,
    totalKeystrokes: Number
  }

  connect() {
    this.keystrokeCount = 0
    this.initializeEditor()
    this.updateStatsDisplay()
  }

  disconnect() {
    if (this.editorView) {
      this.editorView.destroy()
    }
  }

  initializeEditor() {
    // Create CodeMirror editor with Vim mode
    const vimExtension = vim()

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        this.keystrokeCount++
        this.keystrokesTarget.textContent = this.keystrokeCount
        this.checkCompletion()
      }
    })

    const extensions = [vimExtension, updateListener]

    const startState = EditorState.create({
      doc: this.startFileValue,
      extensions: extensions
    })

    this.editorView = new EditorView({
      state: startState,
      parent: this.editorTarget
    })

    // Focus the editor
    this.editorView.focus()
  }

  checkCompletion() {
    const currentContent = this.editorView.state.doc.toString()
    const expectedContent = this.endFileValue.trim()

    if (currentContent.trim() === expectedContent) {
      this.completeStage()
    }
  }

  async completeStage() {
    // Prevent multiple submissions
    if (this.isSubmitting) return
    this.isSubmitting = true

    try {
      const response = await fetch(`/star_hunt_sessions/${this.sessionIdValue}/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content
        },
        body: JSON.stringify({
          keystrokes: this.keystrokeCount,
          content: this.editorView.state.doc.toString()
        })
      })

      const data = await response.json()

      if (data.success) {
        // Show success message
        this.showToast(data.message, 'success')

        // Update stats
        this.completedStagesValue = data.stats.completed_stages
        this.totalKeystrokesValue = data.stats.total_keystrokes
        this.updateStatsDisplay()

        // Load next stage after a short delay
        setTimeout(() => {
          window.location.href = `/star_hunt_sessions/${this.sessionIdValue}`
        }, 1500)
      } else {
        this.showToast(data.message, 'error')
        this.isSubmitting = false
      }
    } catch (error) {
      console.error('Error completing stage:', error)
      this.showToast('An error occurred. Please try again.', 'error')
      this.isSubmitting = false
    }
  }

  updateStatsDisplay() {
    this.completedStagesTarget.textContent = this.completedStagesValue
    this.totalKeystrokesTarget.textContent = this.totalKeystrokesValue
  }

  showToast(message, type = 'info') {
    // Simple toast notification
    const toast = document.createElement('div')
    toast.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white font-semibold z-50 ${
      type === 'success' ? 'bg-green-600' :
      type === 'error' ? 'bg-red-600' :
      'bg-blue-600'
    }`
    toast.textContent = message

    document.body.appendChild(toast)

    setTimeout(() => {
      toast.style.transition = 'opacity 0.3s'
      toast.style.opacity = '0'
      setTimeout(() => toast.remove(), 300)
    }, 2000)
  }
}
