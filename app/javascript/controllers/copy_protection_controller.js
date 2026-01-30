import { Controller } from "@hotwired/stimulus"

// Prevents copying/pasting of protected content
export default class extends Controller {
  connect() {
    this.element.addEventListener('copy', this.preventCopy.bind(this))
    this.element.addEventListener('cut', this.preventCopy.bind(this))
    this.element.addEventListener('paste', this.preventPaste.bind(this))
    this.element.addEventListener('contextmenu', this.preventContextMenu.bind(this))
    this.element.addEventListener('selectstart', this.preventSelect.bind(this))

    // Prevent keyboard shortcuts for copying
    this.element.addEventListener('keydown', this.preventKeyboardCopy.bind(this))
  }

  disconnect() {
    this.element.removeEventListener('copy', this.preventCopy.bind(this))
    this.element.removeEventListener('cut', this.preventCopy.bind(this))
    this.element.removeEventListener('paste', this.preventPaste.bind(this))
    this.element.removeEventListener('contextmenu', this.preventContextMenu.bind(this))
    this.element.removeEventListener('selectstart', this.preventSelect.bind(this))
    this.element.removeEventListener('keydown', this.preventKeyboardCopy.bind(this))
  }

  preventCopy(event) {
    event.preventDefault()
    return false
  }

  preventPaste(event) {
    event.preventDefault()
    return false
  }

  preventContextMenu(event) {
    event.preventDefault()
    return false
  }

  preventSelect(event) {
    event.preventDefault()
    return false
  }

  preventKeyboardCopy(event) {
    // Prevent Ctrl+C, Ctrl+X, Ctrl+A (Windows/Linux)
    // Prevent Cmd+C, Cmd+X, Cmd+A (Mac)
    if ((event.ctrlKey || event.metaKey) && (event.key === 'c' || event.key === 'x' || event.key === 'a')) {
      event.preventDefault()
      return false
    }
  }
}
