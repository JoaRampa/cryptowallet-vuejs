<template>
  <div class="container">
    <b style="font-size: 2rem;">Welcome!</b>
    <div class="logIn">
      <p>User</p>
      <form @submit.prevent="handleUser" class="id-input" id="form-id">
        <input @keydown.enter="handleUser" v-model="userId" type="text" placeholder="('RampaJoa' has already data to see)"/>
        <button type="submit" :disabled="!userId">Continue</button>
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

<style scoped>
.container {
  z-index: 999999;
}
.logIn {
  text-align: left;
  width: 80%;
  margin-top: .75rem;
}

.logIn input {
  margin-bottom: .75rem;
}

.logIn p {
  font-weight: bold;
}

button:disabled {
  cursor: not-allowed;
}

button {
  background-color: #11cfc8;
  color: black;
  letter-spacing: .05em;
}
</style>
