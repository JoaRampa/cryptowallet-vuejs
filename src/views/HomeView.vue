<template>
  <LogIn v-if="!isAuthenticated" />
  <div v-if="isAuthenticated">
    <div class="view">
      <div class="cripto"><CryptoRequestPrice /></div>
      <div class="operation">
        <div class="tabs">
          <button
            :class="{ active: currentTab === 'purchase' }"
            @click="currentTab = 'purchase'"
          >
            Compra Crypto
          </button>
          <button
            :class="{ active: currentTab === 'sale' }"
            @click="currentTab = 'sale'"
          >
            Venta Crypto
          </button>
        </div>
        <div class="tab-content">
          <component :is="currentTabComponent"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LogIn from "@/components/LoginForm.vue";
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
.view {
  margin-top: 20px;
}

.cripto {
  margin-bottom: 4rem;
}

.tabs {
  display: flex;
}

.tabs button {
  transition: background-color 0.8s;
}

.tabs button.active,
.tabs button:hover {
  background-color: rgb(15, 19, 78);
}
</style>
