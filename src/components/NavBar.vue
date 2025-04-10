<template>
  <nav :class="{'nav nav-top': !isAuthenticated, 'nav nav-left': isAuthenticated && !isMobile}">
    <div>
      <b class="nav">CRYPCREATE</b>
    </div>
    <div v-if="isAuthenticated" class="nav middle">
      <hr>
      <router-link :to="{ name: 'Home' }" active-class="active-link">
        <i class="fas fa-chart-line"></i>Trade
      </router-link>
      <router-link to="/history" active-class="active-link">
        <i class="fas fa-history"></i>History
      </router-link>
      <router-link to="/wallet" active-class="active-link">
        <i class="fas fa-wallet"></i>Wallet
      </router-link>
      <hr>
    </div>
    <div v-if="isAuthenticated" class="nav bottom">
      <hr>
      <p>{{ userId }}</p>
      <router-link to="/" @click="$store.commit('logout')">
        <i class="fas fa-sign-out-alt"></i>Logout
      </router-link>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      isMobile: window.innerWidth < 768,
    };
  },
  computed: {
    ...mapGetters(["userId", "isAuthenticated"]),
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.isMobile = window.innerWidth < 768;
    },
  },
};
</script>

<style>
.nav-left {
  position: fixed;
  height: 100vh;
  width: 185px;
}

.nav {
  display: flex;
  flex-direction: column;
  background-color: rgb(22, 29, 41);
  padding: 8px !important;
  gap: .35rem;
}

.bottom {
  margin-top: auto;
  gap: .25rem;
}

.nav-middle i, .nav-bottom i {
  margin-right: 12px;
}

@media (max-width: 768px) {
  nav {
    display: none;
  }
  .main-with-sidebar {
    margin: 0 !important;
  }
  .row {
    left: 0 !important;
    width: 100% !important;
  }
}
</style>