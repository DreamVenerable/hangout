import consumer from "channels/consumer"

consumer.subscriptions.create("MessageChannel", {
  connected() {
    this.scrollToBottom()
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    console.log(data)
    const messageDisplay = document.querySelector('#message-display')
    messageDisplay.insertAdjacentHTML('beforeend', this.template(data))
    this.clearInputField()
    this.scrollToBottom()
  },

  template(data) {
    return `<article class="message">
              <div class="message-header">
                <p>${data.user.email}</p>
              </div>
              <div class="message-body">
                <p>${data.body}</p>
              </div>
            </article>`
  },

  clearInputField() {
    const messageInput = document.querySelector('#message-input');
    if (messageInput) {
      messageInput.value = '';
    }
  },

  scrollToBottom() {
    const messageDisplay = document.querySelector('#message-display');
    if (messageDisplay) {
      messageDisplay.scrollTop = messageDisplay.scrollHeight;
    }
  }
});
