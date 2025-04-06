<template>
  <div>
    <nav :class="{'nav-top': !isAuthenticated, 'nav-left': isAuthenticated}">
      <div>
        <img src="@/assets/logo.png" alt="Logo" />
        <b>CRYPCREATE</b>
      </div>
      <div v-if="isAuthenticated" class="nav-middle">
        <hr>
        <router-link :to="{ name: 'Home' }" active-class="active-link">
          <i class="fas fa-chart-line"></i>Trade
        </router-link>
        <router-link :to="{ name: 'investmentsCrypto' }" active-class="active-link">
          <i class="fas fa-piggy-bank"></i>Investments
        </router-link>
        <router-link to="/history" active-class="active-link">
          <i class="fas fa-history"></i>History
        </router-link>
        <router-link to="/wallet" active-class="active-link">
          <i class="fas fa-wallet"></i>Wallet
        </router-link>
        <hr>
      </div>
      <div v-if="isAuthenticated" class="nav-bottom">
        <hr>
        <p>{{ userId }}</p>
        <router-link to="/" @click="$store.commit('logout')">
          <i class="fas fa-sign-out-alt"></i>Logout
        </router-link>
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
  height: 100vh;
  width: 185px;
}

.nav-middle {
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 8px;
  gap: .25rem;
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

.nav-bottom {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: .25rem
}

.nav-middle i, .nav-bottom i {
  margin-right: 12px;
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
  position: fixed;
  bottom: 0;
  left: 185px;
  width: calc(100% - 185px);
  margin-bottom: 10px;
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
