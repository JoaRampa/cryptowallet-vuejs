<template>
    <NavBar />
    <main :class="{'main-with-sidebar': isAuthenticated}">
      <router-view />
    </main>
    <FooterComponent v-if="isAuthenticated"/>
</template>

<script>
import { mapGetters } from "vuex";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import FooterComponent from "@/components/FooterComponent.vue";
import NavBar from "./components/NavBar.vue";

export default {
  components: {FooterComponent, NavBar},
  computed: {
    ...mapGetters(["userId", "isAuthenticated"]),
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  color: beige;
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: rgb(10, 13, 23);
  min-height: 100vh;
  overflow-x: hidden;
}

html,
body {
  height: 100%;
  margin: 0;
}

a {
  color: beige !important;
  text-decoration: none !important;
  opacity: 0.6;
  letter-spacing: .08em;
  font-size: 16px;
}

a:hover, .active-link {
  opacity: 1;
}

.main-with-sidebar {
  margin-left: 185px; 
  padding: 16px;
}

b {
  background: -webkit-linear-gradient(#49e0bd, rgb(157, 32, 149));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.1em;
}

p {
  margin: 0 !important;
}

button, button:enabled, button:disabled, input, select {
  cursor: pointer;
  border-radius: 6px;
  width: 100%;
  height: 32px;
  font-size: 12px;
  font-weight: 600;
  background-color: rgb(10, 13, 23);
  border: 1px solid rgba(171, 177, 196, 0.137);
  color: beige;
  outline: none;
}

input:focus, select:focus {
  border-color: #11cfc8;
  box-shadow: 0 0 5px rgba(73, 224, 189, 0.5);
}
</style>
