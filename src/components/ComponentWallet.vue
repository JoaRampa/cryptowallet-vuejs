<template>
  <div class="header">
    <p>Coins</p>
    <p>Amount</p>
    <p>Cash in</p>
  </div>
  <div>
    <div v-if="Object.keys(getWallet).length === 0">
      <p>No hay elementos en la billetera.</p>
    </div>
    <div v-else
      v-for="(amount, cryptoCode) in getWallet" :key="cryptoCode" class="row-wallet">
      <div class="coin">
        <img :src="require(`@/assets/${cryptoCode}.png`)" :alt="cryptoCode" />
        {{ cryptoCode.toUpperCase() }}
      </div>
        <p>{{ amount }}</p>
        <p>${{ formatNumber(calculateCash(amount, cryptoCode)) }}</p>
    </div>
  </div>
  <div class="header-p">
    <p>Total: ${{ totalCash }}</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { formatNumber } from "@/utils";

export default {
  computed: {
    ...mapGetters(["userId"]),
    ...mapGetters("transactions", ["getWallet"]),
    ...mapGetters(["getBTCPrice", "getETHPrice", "getUSDTPrice"]),
    totalCash() {
      let total = 0;
      for (let cryptoCode in this.getWallet) {
        total += this.calculateCash(this.getWallet[cryptoCode], cryptoCode);
      }
      return this.formatNumber(total);
    },
  },
  methods: {
    ...mapActions("transactions", ["getState"]),
    formatNumber,

    calculateCash(amount, cryptoCode) {
      const code = cryptoCode.toUpperCase();
      const cryptoGetter = `get${code}Price`;
      const cryptoPrice = this[cryptoGetter];
      if (cryptoPrice) {
        const cash = parseFloat(amount * cryptoPrice.totalBid);
        return cash;
      } else {
        console.error(`Getter ${cryptoGetter} no encontrado`);
        return 0;
      }
    },
    async fetchData() {
      try {
        await this.getState(this.userId);
      } catch (error) {
        console.error("Error:", error);
      }
    },
    mounted() {
      this.fetchData();
    },
  },
};
</script>

<style>
.header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  background-color: #35314a;
  padding: 4px 10px;
  font-weight: bold;
}

.row-wallet {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  padding: 10px;
}

.coin {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

img {
  padding: 5px 0;
  width: 25px;
  margin-right: 8px;
}

.header-p {
  background-color: #35314a;
  width: 100%;
  padding: 4px 10px;
}
</style>