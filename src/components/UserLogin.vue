<template>
  <div class="container">
    <h1>Tutorías</h1>
    <form @submit.prevent="validateForm">
      <label for="username">Usuario</label>
      <input type="text" id="username" v-model="username" required>
      
      <label for="password">Contraseña</label>
      <input type="password" id="password" v-model="password" required>
      
      <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
      
      <button type="submit">Iniciar</button>
      <button type="button" @click="createAccount">Crear Cuenta</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    createAccount() {
      this.$router.push('/create-user'); 
    },
    validateForm() {
      this.errorMessage = '';

      if (this.username.trim() === '') {
        this.showError("El campo 'Usuario' no puede estar vacío.");
        return;
      }

      if (this.password.trim() === '') {
        this.showError("El campo 'Contraseña' no puede estar vacío.");
        return;
      }

      if (this.password.length < 6) {
        this.showError("La 'Contraseña' debe tener al menos 6 caracteres.");
        return;
      }

      
      let user = localStorage.getItem(this.username);
      if (user) {
        user = JSON.parse(user);
        if (user.password === this.password) {
          // Guardar el nombre de usuario y rol en localStorage
          localStorage.setItem('loggedInUser', this.username);
          localStorage.setItem('loggedInUserRole', user.role);

          
          if (user.role === 'docente') {
            this.$router.push('/teacher-dashboard'); 
          } else {
            this.$router.push('/dashboard'); 
          }
        } else {
          this.showError("Credenciales incorrectas.");
        }
      } else {
        this.showError("Credenciales incorrectas.");
      }
    },
    showError(message) {
      this.errorMessage = message;
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

.container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

h1 {
    text-align: center;
}

form {
    display: flex;
    flex-direction: column;
}

label {
    margin: 10px 0 5px;
}

input {
    padding: 10px;
    margin: 5px 0 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px;
    margin: 5px 0;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.error-message {
    color: red;
    text-align: center;
    margin-top: 20px;
}
</style>
