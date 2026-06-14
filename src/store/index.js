import { reactive } from 'vue'

const STORAGE_KEY = 'love-letter-custom-tags'

function loadCustomTags() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export const store = reactive({
  conversations: [],
  selectedConversation: null,
  loveLetters: [],
  anonymousPosts: [],
  processing: false,
  error: null,
  customTags: loadCustomTags(),

  setConversations(convs) {
    this.conversations = convs
  },

  setLoveLetters(letters) {
    this.loveLetters = letters
  },

  setSelectedConversation(conv) {
    this.selectedConversation = conv
  },

  addAnonymousPost(post) {
    this.anonymousPosts.unshift(post)
  },

  setProcessing(val) {
    this.processing = val
  },

  setError(err) {
    this.error = err
  },

  addCustomTag(messageId, tag) {
    if (!this.customTags[messageId]) {
      this.customTags[messageId] = []
    }
    if (!this.customTags[messageId].includes(tag)) {
      this.customTags[messageId].push(tag)
      this._persistCustomTags()
    }
  },

  removeCustomTag(messageId, tag) {
    if (this.customTags[messageId]) {
      this.customTags[messageId] = this.customTags[messageId].filter(t => t !== tag)
      if (this.customTags[messageId].length === 0) {
        delete this.customTags[messageId]
      }
      this._persistCustomTags()
    }
  },

  getCustomTags(messageId) {
    return this.customTags[messageId] || []
  },

  _persistCustomTags() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.customTags))
    } catch { /* ignore */ }
  },

  clearAll() {
    this.conversations = []
    this.selectedConversation = null
    this.loveLetters = []
    this.error = null
  }
})
