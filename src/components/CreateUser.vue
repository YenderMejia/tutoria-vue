<template>
  <div class="container">
    <h1>Crear Usuario</h1>
    <form @submit.prevent="validateCreateUserForm">
      <label for="username">Usuario</label>
      <input type="text" id="username" v-model="username" required>
      
      <label>Rol</label>
      <div class="radio-group">
        <input type="radio" id="docente" v-model="role" value="docente" required>
        <label for="docente">Docente</label>
        <input type="radio" id="estudiante" v-model="role" value="estudiante" required>
        <label for="estudiante">Estudiante</label>
      </div>

      <label for="password">Contraseña</label>
      <input type="password" id="password" v-model="password" required>
      
      <label for="confirm-password">Confirmar Contraseña</label>
      <input type="password" id="confirm-password" v-model="confirmPassword" required>

      <button type="submit">Registrar</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      role: '',
      password: '',
      confirmPassword: ''
    };
  },
  methods: {
    validateCreateUserForm() {
      if (this.username.trim() === "") {
        this.showError("El campo 'Usuario' no puede estar vacío.");
        return;
      }

      if (!this.role) {
        this.showError("Debe seleccionar un rol.");
        return;
      }

      if (this.password.trim() === "") {
        this.showError("El campo 'Contraseña' no puede estar vacío.");
        return;
      }

      if (this.password.length < 6) {
        this.showError("La 'Contraseña' debe tener al menos 6 caracteres.");
        return;
      }

      if (this.confirmPassword.trim() === "") {
        this.showError("El campo 'Confirmar Contraseña' no puede estar vacío.");
        return;
      }

      if (this.password !== this.confirmPassword) {
        this.showError("Las contraseñas no coinciden.");
        return;
      }

      // Guardar los datos del usuario en el localStorage
      const user = {
        username: this.username,
        role: this.role,
        password: this.password
      };
      localStorage.setItem(this.username, JSON.stringify(user));

      alert("Usuario registrado correctamente.");
      this.$router.push('/login'); 
    },
    showError(message) {
      alert(message);
    }
  }
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.container {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

label {
  margin-bottom: 5px;
  align-self: flex-start;
}

input[type="text"],
input[type="password"] {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}

.radio-group {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 15px;
}

.radio-group input[type="radio"] {
  margin-right: 5px;
}

button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #0056b3;
}
</style>
