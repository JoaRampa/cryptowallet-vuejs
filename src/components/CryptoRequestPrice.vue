<template>
  <div class="requestPrice">
    <b class="center">Coins</b>
    <div v-for="crypto in cryptoList" :key="crypto.code">
        <div class="coin">
          <img :src="require(`@/assets/${crypto.code}.png`)" :alt="crypto.name"/>
            {{ crypto.name }}
        </div>
        <div class="prices">
          <div v-if="crypto.price">
            BUY: ${{ formatNumber(crypto.price.totalAsk) }}
          </div>
          <div v-if="crypto.price">
            SELL: ${{ formatNumber(crypto.price.totalBid) }}
          </div>
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
<style>
.requestPrice {
  padding: 18px;
  border: 1px solid rgba(171, 177, 196, 0.137);
  border-radius: 6px;
}
.center {
  display: flex;
  justify-content: center;
}
.coin {
  margin: .5rem 0;
}
.prices {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 0.5rem;
}
</style>