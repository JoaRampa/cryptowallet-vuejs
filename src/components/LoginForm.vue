<template>
  <div class="container">
    <div class="logIn">
      <b>Welcome!</b>
      <h3>Inicio de sesión</h3>
      <form @submit.prevent="handleUser" class="id-input" id="form-id">
        <input @keydown.enter="handleUser" v-model="userId" type="text" placeholder="Ingrese UserID"/>
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
  margin-top: 10rem;
}
.logIn {
  text-align: left;
  width: 35%;
}

.logIn input {
  margin-bottom: .5rem;
}
</style>
