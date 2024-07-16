<template>
    <div>
      <div class="header">
        <h1>Mensajería</h1>
        <div class="nav">
          <router-link to="/dashboard">Home</router-link>
          <span id="user-name">{{ loggedInUser }}</span>
        </div>
      </div>
      <div class="chat-container">
        <div class="chat-messages" ref="chatMessages"></div>
        <div class="chat-input">
          <input type="text" v-model="recipient" placeholder="Destinatario">
          <input type="text" v-model="message" placeholder="Escribe un mensaje">
          <button @click="sendMessage">Enviar</button>
        </div>
      </div>
    </div>
  </template>
  
<script>
export default {
  data() {
    return {
      loggedInUser: '',
      recipient: '',
      message: ''
    };
  },
  mounted() {
    this.checkLoggedIn();
  },
  watch: {
    recipient(newRecipient, oldRecipient) {
      if (newRecipient !== oldRecipient) {
        this.loadConversation();
      }
    }
  },
  methods: {
    checkLoggedIn() {
      this.loggedInUser = localStorage.getItem('loggedInUser');
      if (!this.loggedInUser) {
        this.$router.push('/login');
      } else {
        this.loadConversation();
      }
    },
    sendMessage() {
      if (!this.message.trim()) {
        alert('El mensaje no puede estar vacío.');
        return;
      }

      if (!this.recipient.trim()) {
        alert('El destinatario no puede estar vacío.');
        return;
      }

      if (localStorage.getItem(this.recipient)) {
        const conversationKey = this.getConversationKey(this.loggedInUser, this.recipient);
        let conversation = JSON.parse(localStorage.getItem(conversationKey)) || [];
        conversation.push({ sender: this.loggedInUser, message: this.message });
        localStorage.setItem(conversationKey, JSON.stringify(conversation));

        this.displayMessage(this.loggedInUser, this.message);
        this.message = '';
      } else {
        alert('El usuario destinatario no está registrado.');
      }
    },
    displayMessage(sender, message) {
      const messageContainer = document.createElement('div');
      messageContainer.classList.add('message');
      messageContainer.textContent = `${sender}: ${message}`;
      this.$refs.chatMessages.appendChild(messageContainer);
      messageContainer.scrollIntoView({ behavior: 'smooth' });
    },
    loadConversation() {
      if (!this.recipient.trim()) return;
      const conversationKey = this.getConversationKey(this.loggedInUser, this.recipient);
      const conversation = JSON.parse(localStorage.getItem(conversationKey)) || [];
      this.$refs.chatMessages.innerHTML = '';
      conversation.forEach(msg => {
        this.displayMessage(msg.sender, msg.message);
      });
    },
    getConversationKey(user1, user2) {
      return [user1, user2].sort().join('-');
    }
  }
};
</script>

  
  <style scoped>
  .body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 0;
  }
  
  .header {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .header h1 {
    margin: 0;
  }
  
  .nav a,
  .nav span {
    margin-left: 20px;
    color: white;
    text-decoration: none;
  }
  
  .nav a:hover {
    text-decoration: underline;
  }
  
  .search-bar {
    padding: 10px 20px;
    background-color: #f8f9fa;
    display: flex;
    justify-content: center;
  }
  
  .search-bar input {
    width: 80%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .chat-container {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 120px); 
    margin: 0 20px;
  }
  
  .chat-messages {
    flex: 1;
    padding: 20px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow-y: auto;
  }
  
  .chat-input {
    display: flex;
    padding: 10px 0;
  }
  
  .chat-input input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .chat-input button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    margin-left: 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .chat-input button:hover {
    background-color: #0056b3;
  }
  </style>
  
