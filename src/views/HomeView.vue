<template>
  <div v-if="!isAuthenticated" class="auth">
    <Info />
    <LogIn />
    <div class="foot">
      <ul>
        <li>Cryptocurrency app built with VueJS, queries API to get crypto price and stores user transactions.</li>
        <li>This website was part of my degree program, and was updated 10 months later (10/04/25, -600 lines of code).</li>
        <li>API prices in Argentine $, currency exchange. 1 USDT = Argentine $</li>
      </ul>
    </div>
  </div>
  <div v-if="isAuthenticated">
    <div class="view">
      <CryptoRequestPrice />
      <div>
        <div class="tabs">
          <button :class="{ active: currentTab === 'purchase' }" @click="currentTab = 'purchase'">
            Buy Crypto
          </button>
          <button :class="{ active: currentTab === 'sale' }" @click="currentTab = 'sale'">
            Sell Crypto
          </button>
        </div>
        <component :is="currentTabComponent"/>
      </div>
    </div>
  </div>
</template>

<script>
import Info from "@/components/auth/InfoApp";
import LogIn from "@/components/auth/LoginForm.vue";
import CryptoRequestPrice from "@/components/CryptoRequestPrice.vue";
import CryptoPurchase from "@/components/CryptoPurchase.vue";
import CryptoSale from "@/components/CryptoSale.vue";
import { mapGetters } from "vuex";
export default {
  name: "HomeView",
  components: {
    CryptoPurchase,
    CryptoSale,
    LogIn,
    Info,
    CryptoRequestPrice,
  },
  data() {
    return {
      currentTab: "purchase",
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
    currentTabComponent() {
      return this.currentTab === "purchase" ? "CryptoPurchase" : "CryptoSale";
    },
  },
};
</script>

<style scoped>
.auth {
  display: flex;
  padding: 20px;
  margin-top: 5rem;
}
.view { 
  display: flex;
  margin-top: 4rem;
  width: 100%;
  gap: 1rem; 
}

.view > div {
  width: 50%; 
  display: flex;
  flex-direction: column;
}
.cripto {
  margin-bottom: 4rem;
}

.tabs {
  display: flex;
  width: 100%;
  margin-top: 3rem;
}

.tabs button {
  transition: background-color 0.8s;
}

.tabs button.active,
.tabs button:hover {
  background-color: rgb(15, 19, 78);
}
.foot {
  position: fixed;
  bottom: 0;
  width: 100%;
  margin-bottom: 10px;
}
</style>
