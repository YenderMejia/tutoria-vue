<template>
    <div>
      <div class="header">
        <h1>Retroalimentación</h1>
        <div class="nav">
          <router-link to="/dashboard">Home</router-link>
          <span id="user-name">{{ loggedInUser }}</span>
        </div>
      </div>
      <div class="feedback-container">
        <h2>Enviar Retroalimentación</h2>
        <form @submit.prevent="submitFeedback">
          <label for="recipient">Destinatario</label>
          <input type="text" v-model="recipient" id="recipient" name="recipient" required>
  
          <label for="feedback">Retroalimentación</label>
          <textarea v-model="feedback" id="feedback" name="feedback" required></textarea>
  
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        loggedInUser: '',
        recipient: '',
        feedback: ''
      };
    },
    mounted() {
      this.checkLoggedIn();
    },
    methods: {
      checkLoggedIn() {
        this.loggedInUser = localStorage.getItem('loggedInUser');
        if (!this.loggedInUser) {
          this.$router.push('/login');
        }
      },
      submitFeedback() {
        const recipient = this.recipient.trim();
        const feedback = this.feedback.trim();
  
        if (recipient && feedback) {
          if (localStorage.getItem(recipient)) {
            const feedbackData = {
              sender: this.loggedInUser,
              recipient: recipient,
              feedback: feedback
            };
  
            this.saveFeedback(feedbackData);
            this.resetForm();
          } else {
            alert('El usuario destinatario no está registrado.');
          }
        } else {
          alert('Por favor completa todos los campos.');
        }
      },
      saveFeedback(feedbackData) {
        let feedbackList = JSON.parse(localStorage.getItem('feedbackList')) || [];
        feedbackList.push(feedbackData);
        localStorage.setItem('feedbackList', JSON.stringify(feedbackList));
      },
      resetForm() {
        this.recipient = '';
        this.feedback = '';
      }
    }
  };
  </script>
  
  <style scoped>
  body {
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
  
  .feedback-container {
    padding: 20px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 20px;
  }
  
  .feedback-container label {
    display: block;
    margin: 10px 0 5px;
  }
  
  .feedback-container input,
  .feedback-container textarea {
    width: calc(100% - 20px);
    padding: 10px;
    margin: 5px 0 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .feedback-container textarea {
    height: 100px;
  }
  
  .feedback-container button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .feedback-container button:hover {
    background-color: #0056b3;
  }
  </style>
  