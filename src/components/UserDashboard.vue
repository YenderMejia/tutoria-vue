<template>
  <div>
    <div class="header">
      <h1>Tutorías</h1>
      <div class="user-info">
        <button @click="goToMessaging">Mensajería</button>
        <button @click="goToFeedback">Retroalimentación</button>
        <button @click="goToHistorial">Historial</button>
        <span id="user-name">{{ loggedInUser }}</span>
        <button @click="cerrarSesion">Cerrar</button>
      </div>
    </div>
    <div class="welcome">
      <h2 id="welcome-message">Bienvenido, {{ loggedInUserRole }} {{ loggedInUser }}</h2>
    </div>
    <div class="content">
      <div class="left-panel">
        <div class="section">
          <h3>Solicitudes pendientes</h3>
          <ul>
            <li v-for="(request, index) in pendingRequests" :key="index">
              Tema: {{ request.topic }}, Fecha: {{ request.date }}, Hora: {{ request.time }}
            </li>
          </ul>
        </div>
        <div class="section">
          <h3>Sesiones programadas</h3>
          <ul>
            <li v-for="(session, index) in scheduledSessions" :key="index">
              Tema: {{ session.topic }}, Fecha: {{ session.date }}, Hora: {{ session.time }}, Docente: {{ session.docente }}
            </li>
          </ul>
        </div>
        <div class="section">
          <h3>Historial de tutorías</h3>
          <ul>
            
          </ul>
        </div>
      </div>
      <div class="right-panel">
        <h3>Formulario de solicitud</h3>
        <form @submit.prevent="submitRequest">
          <label for="topic">Tema</label>
          <input type="text" id="topic" v-model="newRequest.topic" required>
          
          <label for="date">Día/Mes/Año</label>
          <input type="date" id="date" v-model="newRequest.date" required>
          
          <label for="time">Hora (solo hora)</label>
          <input type="time" id="time" v-model="newRequest.time" required>
          
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loggedInUser: '',
      loggedInUserRole: '',
      pendingRequests: [],
      scheduledSessions: [],
      newRequest: {
        topic: '',
        date: '',
        time: ''
      }
    };
  },
  mounted() {
    this.checkLoggedIn();
    this.loadPendingRequests();
    this.loadScheduledSessions();
  },
  methods: {
    checkLoggedIn() {
      this.loggedInUser = localStorage.getItem('loggedInUser');
      this.loggedInUserRole = localStorage.getItem('loggedInUserRole');

      if (!this.loggedInUser) {
        this.$router.push('/login'); 
      }
    },
    loadPendingRequests() {
      this.pendingRequests = JSON.parse(localStorage.getItem('pendingRequests')) || [];
    },
    loadScheduledSessions() {
      this.scheduledSessions = JSON.parse(localStorage.getItem('scheduledSessions')) || [];
    },
    cerrarSesion() {
      localStorage.removeItem('loggedInUser');
      localStorage.removeItem('loggedInUserRole');
      this.$router.push('/login'); 
    },
    goToMessaging() {
      this.$router.push('/messaging'); 
    },
    goToHistorial() {
      this.$router.push('/historial'); 
    },
    goToFeedback() {
      this.$router.push('/feedback'); 
    },
    submitRequest() {
      
      let requests = JSON.parse(localStorage.getItem('pendingRequests')) || [];
      requests.push({
        topic: this.newRequest.topic,
        date: this.newRequest.date,
        time: this.newRequest.time
      });
      localStorage.setItem('pendingRequests', JSON.stringify(requests));
      
      // Limpiar el formulario después de enviar
      this.newRequest.topic = '';
      this.newRequest.date = '';
      this.newRequest.time = '';

      // Actualizar la lista de solicitudes pendientes
      this.loadPendingRequests();
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

.user-info {
    display: flex;
    align-items: center;
}

.user-info span {
    margin: 0 10px;
}

.user-info button {
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #0056b3;
    color: white;
    cursor: pointer;
    margin-left: 5px;
}

.user-info button:hover {
    background-color: #003f7f;
}

.welcome {
    text-align: center;
    margin: 20px 0;
}

.content {
    display: flex;
    justify-content: space-around;
    margin: 20px;
}

.left-panel, .right-panel {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 45%;
}

.section {
    margin-bottom: 20px;
}

.section h3 {
    margin-top: 0;
}

ul {
    list-style: none;
    padding: 0;
}

form {
    display: flex;
    flex-direction: column;
}

label {
    margin-top: 10px;
    margin-bottom: 5px;
}

input, button {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
}

button {
    background-color: #007bff;
    color: white;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>
