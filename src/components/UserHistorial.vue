<template>
    <div>
      <div class="header">
        <h1>Historial de Tutorías</h1>
        <div class="nav">
          <router-link to="/dashboard">Home</router-link>
          <span id="user-name">{{ loggedInUser }}</span>
        </div>
      </div>
      <div class="history-container">
        <label for="date">Fecha de la Tutoría</label>
        <input type="date" v-model="searchParams.date">
  
        <label for="topic">Tema</label>
        <input type="text" v-model="searchParams.topic" placeholder="Tema de la tutoría">
  
        <label for="participants">Participantes</label>
        <input type="text" v-model="searchParams.participants" placeholder="Nombre de los participantes">
  
        <button @click="searchHistory">Buscar</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        loggedInUser: '',
        searchParams: {
          date: '',
          topic: '',
          participants: ''
        }
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
      searchHistory() {
        const { date, topic, participants } = this.searchParams;
  
        if (date || topic || participants) {
          alert(`Buscando historial de tutorías con los siguientes datos:\n\nFecha: ${date}\nTema: ${topic}\nParticipantes: ${participants}`);
        } else {
          alert('Por favor, completa al menos uno de los campos antes de buscar.');
        }
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
  
  .history-container {
    padding: 20px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 20px;
  }
  
  .history-container label {
    display: block;
    margin: 10px 0 5px;
  }
  
  .history-container input {
    width: calc(100% - 20px);
    padding: 10px;
    margin: 5px 0 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .history-container button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .history-container button:hover {
    background-color: #0056b3;
  }
  </style>
  