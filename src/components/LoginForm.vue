<template>
  <div class="container">
    <div class="logIn">
      <b>Welcome!</b>
      <h3>Inicio de sesión</h3>
      <form @submit.prevent="handleUser" class="id-input" id="form-id">
        <div class="input-container">
          <input
            @keydown.enter="handleUser"
            v-model="userId"
            type="text"
            id="inputId"
            placeholder="Ingrese UserID"
          />
        </div>
        <button type="submit" :disabled="!userId">Siguiente</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      userId: "",
      error: false,
    };
  },
  methods: {
    ...mapActions(["submitUser"]),

    async handleUser() {
      if (this.userId) {
        await this.submitUser(this.userId);
        this.$router.push("/#");
      } else {
        this.userId = "";
      }
    },
  },
};
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
.logIn {
  text-align: left;
  width: 35%;
}

h3 {
  font-size: 24px;
  margin-bottom: 20px;
}

.input-container {
  margin: 25px 0px 25px;
}

.input-container input {
  width: 100%;
}
</style>
