import { Controller } from "@hotwired/stimulus"
import { EditorView, basicSetup } from "codemirror"
import { Vim, vim } from "@replit/codemirror-vim"

export default class extends Controller {
  static targets = ["editor", "keystrokes", "mode", "completedStages", "totalKeystrokes"]
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
    if (this.view) {
      this.view.destroy()
    }
  }

  initializeEditor() {
    // Create CodeMirror editor with Vim mode
    this.view = new EditorView({
      doc: this.startFileValue,
      extensions: [
        basicSetup,
        vim(),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            this.checkCompletion()
          }
        })
      ],
      parent: this.editorTarget
    })

    // Track keystrokes
    this.view.dom.addEventListener('keydown', (e) => {
      // Don't count modifier keys alone
      if (!['Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) {
        this.keystrokeCount++
        this.keystrokesTarget.textContent = this.keystrokeCount
      }
    })

    // Track Vim mode changes
    Vim.defineOption('mode', undefined, 'normal')
    const updateMode = () => {
      const vimState = this.view.state.field(vim)
      if (vimState) {
        const mode = vimState.vim?.mode || 'normal'
        this.modeTarget.textContent = mode.toUpperCase()
      }
    }

    // Update mode on state changes
    setInterval(updateMode, 100)

    // Focus the editor
    this.view.focus()
  }

  checkCompletion() {
    const currentContent = this.view.state.doc.toString()
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
          content: this.view.state.doc.toString()
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
          window.location.reload()
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
