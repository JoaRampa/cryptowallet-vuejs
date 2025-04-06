<template>
  <div>
    <nav :class="{'nav-top': !isAuthenticated, 'nav-left': isAuthenticated}">
      <img src="@/assets/logo.png" alt="Logo" width="35" />
      <b>CRYPCREATE</b>
      <div v-if="isAuthenticated">
        <div>
          <router-link :to="{ name: 'Home' }">Tradear </router-link>
          <router-link :to="{ name: 'investmentsCrypto' }">Analisis Inversiones </router-link>
          <router-link to="/history">Historial </router-link>
          <router-link to="/wallet">Billetera </router-link>
        </div>
        <div>
          <button>{{ userId }}</button>
          <router-link to="/" @click="$store.commit('logout')">Cerrar Sesión</router-link>
        </div>
      </div>
    </nav>
    <main :class="{'main-with-sidebar': isAuthenticated}">
      <router-view />
    </main>
    <footer v-if="isAuthenticated">
      <FooterComponent />
    </footer>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  components: {
    FooterComponent,
  },
  data() {
    return {
      showMenu: false,
    };
  },
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
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

.nav-top {
  display: flex;
  padding: 8px;
  align-items: center;
  background-color: rgb(22, 29, 41);
  margin-bottom: 6px;
}

.nav-left {
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: rgb(22, 29, 41);
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 185px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
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

footer {
  border-top: 1px solid #35314a;
  margin-top: 100px;
  margin-left: 185px;
}

button, input {
  cursor: pointer;
  border: none;
  border-radius: 8px;
  padding: 8px;
  width: 100%;
}

button:enabled {
  cursor: pointer;
  border: none;
  border-radius: 8px;
  padding: 8px;
  width: 100%;
}

button:disabled {
  background-color: #ccc; 
  border-radius: 8px;
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
