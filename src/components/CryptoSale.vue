<template>
  <div class="purchase">
    <form @submit.prevent="saveTransactionData">
      <select id="crypto" v-model="selectedCrypto" required>
        <option v-for="crypto in cryptoList" :key="crypto.code" :value="crypto.code">
          {{ crypto.name }}
        </option>
      </select>
      <label for="amount">Disponible: {{ getWallet[selectedCrypto] }}</label>
      <input type="text" id="amount" class="inputs" v-model="amount"
        @input="amount = validateInput(amount); totalMoney();" required />
      <label id="money">Total ${{ formatNumber(money) }}</label>
      <button class="saleBtn" type="submit" :disabled="amount === 0 || saleAmount < amount"
        data-bs-target="#confirmSaleModal" data-bs-toggle="modal">
        Vender
      </button>
    </form>
    <ConfirmModal
      modal-id="confirmSaleModal"
      modal-title="Confirmar Venta"
      message="¿Seguro que quiere vender las criptomonedas?"
      confirm-button-label="Confirmar"
      cancel-button-label="Cerrar"
      :transaction-data="transactionData"
      @confirmed="newTransaction"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { validateInput, formatNumber } from '../utils/index.js';
import ConfirmModal from './Modal';

export default {
  components: {ConfirmModal},
  data() {
    return {
      selectedCrypto: "btc",
      money: 0,
      amount: 0,
      userWallet: {},
      saleAmount: 0,
      transactionData: {},
    };
  },
  computed: {
    ...mapGetters(["userId", "getBTCPrice", "getETHPrice", "getUSDTPrice"]),
    ...mapGetters("transactions", ["getWallet"]),
    cryptoList() {
      return [
        { code: "btc", name: "BTC", price: this.getBTCPrice },
        { code: "eth", name: "ETH", price: this.getETHPrice },
        { code: "usdt", name: "USDT", price: this.getUSDTPrice },
      ];
    },
    selectedCryptoPrice() {
      const crypto = this.cryptoList.find(
        (crypto) => crypto.code === this.selectedCrypto
      );
      return crypto ? `Venta: $${crypto.price.totalBid}` : "";
    },
  },
  methods: {
    ...mapActions("transactions", ["createTransaction", "getState"]),
    validateInput,
    formatNumber,

    saveTransactionData() {
      if (this.amount > 0) {
        if (this.saleAmount >= this.amount) {
          this.transactionData = {
            user_id: this.userId,
            action: "sale",
            crypto_code: this.selectedCrypto,
            crypto_amount: this.amount,
            money: this.money,
            datetime: new Date(),
          };
        } else {
          alert("Insuficiente");
        }
      }
    },
    async newTransaction(transactionData) {
      try {
        await this.createTransaction(transactionData);
        this.getState();
        this.money = 0;
        this.amount = 0;
        alert("Realizado");
      } catch (error) {
        console.error("Error al realizar la nueva transacción:", error);
      }
    },
    getSaleAmount(selectedCrypto) {
      if (!this.getWallet) this.getState();

      const wallet = this.getWallet || {};
      const cryptoCode = selectedCrypto.toLowerCase();
      this.saleAmount = wallet[cryptoCode] || 0;
    },
    totalMoney() {
      const crypto = this.cryptoList.find(
        (crypto) => crypto.code === this.selectedCrypto
      );
      if (this.amount < 0) this.amount = 0;
      
      this.getSaleAmount(this.selectedCrypto);
      this.money = parseFloat((this.amount * crypto.price.totalBid).toFixed(2));
    },
  },
};
</script>

<style scoped>
.saleBtn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
.saleBtn {
  background-color: #af1b1b;
  transition: background-color 0.3s;
  border: none;
}
</style>