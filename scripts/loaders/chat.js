import loader from './index.js'

function loadChat() {
  const url = '/components/chat.html'

  loader(url, function (response) {
    const chatContainer = document.querySelector('.chat-container')
    
    if (chatContainer) {
      chatContainer.innerHTML = response
      
      setTimeout(() => {
        const chatScript = document.createElement('script');
        chatScript.src = '/scripts/chat.js';
        document.body.appendChild(chatScript);
      }, 100);
    } else {
      console.error('Elemento .chat-container não encontrado no DOM');
    }
  })
}

loadChat()
