<template>
  <b>Investments</b>
  <div class="investments">
    <div>
      <p>Posesiones:</p>
      <p>Gastos por compras</p>
      <p>Retornos por ventas</p>
      <p>Total Profit:</p>
    </div>
    <div>
      <p>$ {{ formatNumber(totalCash) }}</p>
      <p>$ {{ formatNumber(calculateBuys()) }}</p>
      <p>$ {{ formatNumber(calculateSale()) }}</p>
      <p>$ {{ formatNumber(calculateTotalProfit()) }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {formatNumber} from "../utils/index.js"

export default {
  data() {
    return {
      transactions: [],
      money: 0,
    };
  },
  computed: {
    ...mapGetters(["userId"]),
    ...mapGetters("transactions", ["getWallet"]),
    ...mapGetters(["getBTCPrice", "getETHPrice", "getUSDTPrice"]),
    totalCash() {
      let total = 0;
      for (let cryptoCode in this.getWallet) {
        total += this.calculateCash(this.getWallet[cryptoCode], cryptoCode);
      }
      return total;
    },
  },
  methods: {
    ...mapActions("transactions", ["getState"]),
    ...mapActions("transactions", ["getHistory"]),
    formatNumber,

    calculateBuys() {
      let buys = 0;
      for (let index = 0; index < this.transactions.length; index++) {
        let transaction = this.transactions[index];

        if (transaction.action === "purchase") {
          buys -= transaction.money;
        }
      }
      return buys;
    },
    calculateSale() {
      let sales = 0;
      for (let index = 0; index < this.transactions.length; index++) {
        let transaction = this.transactions[index];

        if (transaction.action === "sale") {
          sales += transaction.money;
        }
      }
      return sales;
    },
    calculateCash(amount, cryptoCode) {
      const code = cryptoCode.toUpperCase();
      const cryptoGetter = `get${code}Price`;
      const cryptoPrice = this[cryptoGetter];
      if (cryptoPrice) {
        const cash = parseFloat(amount * cryptoPrice.totalAsk);
        return cash;
      } else {
        console.error(`Getter ${cryptoGetter} no encontrado`);
        return 0;
      }
    },
    calculateTotalProfit() {
      let totalBuys = this.calculateBuys();
      let totalSales = this.calculateSale();
      let totalCashValue = this.totalCash;

      let totalProfit = totalBuys + totalSales + totalCashValue;
      return totalProfit;
    },
    async fetchData() {
      try {
        await this.getState(this.userId);
      } catch (error) {
        console.error("Error:", error);
      }
    },
  },
  async created() {
    try {
      this.transactions = await this.getHistory(this.userId);
      this.fetchData();
    } catch (error) {
      console.error("Error al obtener el historial:", error);
    }
  },
};
</script>

<style scoped>
.investments {
  display: flex;
  justify-content: space-between;
  width: 413px;
}
</style>
