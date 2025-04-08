<template>
  <div>
    <b>Coins</b>
    <div v-for="crypto in cryptoList" :key="crypto.code">
      <div class="coin">
        <img :src="require(`@/assets/${crypto.code}.png`)" :alt="crypto.name"/>
          {{ crypto.name }}
        </div>
        <div v-if="crypto.price">
          Compra: ${{ formatNumber(crypto.price.totalAsk) }}
        </div>
        <div v-if="crypto.price">
          Venta: ${{ formatNumber(crypto.price.totalBid) }}
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {formatNumber} from "../utils/index.js"

export default {
  computed: {
    ...mapGetters(["isAuthenticated","getBTCPrice","getETHPrice","getUSDTPrice",]),
    cryptoList() {
      return [
        { code: "btc", name: "BTC", price: this.getBTCPrice },
        { code: "eth", name: "ETH", price: this.getETHPrice },
        { code: "usdt", name: "USDt", price: this.getUSDTPrice },
      ];
    },
  },
  methods: {
    ...mapActions(["CryptoRequestPrice"]),
    formatNumber,

    async fetchData() {
      try {
        await this.CryptoRequestPrice();
      } catch (error) {
        console.error("Error:", error);
      }
    },
  },
  async created() {
    await this.fetchData();
  },
};
</script>