document.addEventListener('DOMContentLoaded', function () {
  initializeChat();
});

if (
  document.readyState === 'complete' ||
  document.readyState === 'interactive'
) {
  initializeChat();
}

async function initializeChat() {
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.querySelector('.chat-input input');
  const chatButton = document.querySelector('.chat-input button');
  clearChat();

  if (!chatMessages || !chatInput || !chatButton) return;

  let users = [];
  let comments = {};

  try {
    const usersResponse = await fetch('/data/users.json');
    const usersData = await usersResponse.json();
    users = usersData.users;

    const commentsResponse = await fetch('/data/comments.json');
    const commentsData = await commentsResponse.json();
    comments = commentsData;
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }

  function getRandomUser() {
    return users[Math.floor(Math.random() * users.length)];
  }

  function getRandomComment() {
    const categories = Object.keys(comments);
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    const categoryComments = comments[randomCategory];
    return categoryComments[
      Math.floor(Math.random() * categoryComments.length)
    ];
  }

  function generateRandomMessage() {
    const user = getRandomUser();
    const comment = getRandomComment();

    let finalComment = comment;
    if (Math.random() > 0.7 && comments.reactions) {
      const reaction =
        comments.reactions[
          Math.floor(Math.random() * comments.reactions.length)
        ];
      finalComment = `${comment} ${reaction}`;
    }

    return {
      author: user.username,
      text: finalComment,
    };
  }

  for (let i = 0; i < 2; i++) {
    const randomMsg = generateRandomMessage();
    addMessageToChat(randomMsg.author, randomMsg.text);
  }
  scrollToBottom();

  setInterval(() => {
    const randomMsg = generateRandomMessage();
    addMessageToChat(randomMsg.author, randomMsg.text);

    scrollToBottom();
  }, 4000 + Math.random() * 2000);

  chatButton.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
      addMessageToChat('Você', message);
      chatInput.value = '';
      scrollToBottom();
    }
  }

  function addMessageToChat(author, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');

    const authorDiv = document.createElement('div');
    authorDiv.classList.add('message-author');
    authorDiv.textContent = author;

    const textDiv = document.createElement('div');
    textDiv.classList.add('message-text');
    textDiv.textContent = text;

    messageDiv.appendChild(authorDiv);
    messageDiv.appendChild(textDiv);

    chatMessages.appendChild(messageDiv);

    const messages = chatMessages.querySelectorAll('.message');
    if (messages.length > 50) {
      chatMessages.removeChild(messages[0]);
    }
  }

  function clearChat() {
    chatMessages.innerHTML = '';
  }

  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}
