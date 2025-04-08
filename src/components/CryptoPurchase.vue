<template>
  <div class="purchase">
    <form id="dataP" @submit.prevent="saveTransactionData">
      <select id="crypto" class="inputs" v-model="selectedCrypto" required>
        <option v-for="crypto in cryptoList" :key="crypto.code" :value="crypto.code">
          {{ crypto.name }}
        </option>
      </select>
      <label for="amount">{{ selectedCrypto.toUpperCase() }} Amount</label>
      <input type="text" id="amount" class="inputs" v-model="amount"
        @input="amount = validateInput(amount);totalMoney();" required/>
      <label id="money">Total ${{ formatNumber(money) }}</label>
      <button class="btnPurchase" type="submit" :disabled="amount <= 0" 
        data-bs-target="#confirmPurchaseModal" data-bs-toggle="modal">
        Comprar
      </button>
    </form>
    <ConfirmModal
      modal-id="confirmPurchaseModal"
      modal-title="Confirmar Compra"
      message="¿Seguro que quiere comprar las criptomonedas?"
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
import ConfirmModal from './Modal'

export default {
  components: {ConfirmModal},
  data() {
    return {
      transactionData: {},
      selectedCrypto: "btc",
      saveData: false,
      money: 0,
      amount: 0,
    };
  },
  computed: {
    ...mapGetters(["userId", "getBTCPrice", "getETHPrice", "getUSDTPrice"]),
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
      return crypto ? `Compra: $${crypto.price.totalAsk}` : "";
    },
  },
  methods: {
    ...mapActions("transactions", ["createTransaction"]),
    validateInput,
    formatNumber,
    
    saveTransactionData() {
      if (this.money > 0 && this.amount > 0) {
        this.transactionData = {
          user_id: this.userId,
          action: "purchase",
          crypto_code: this.selectedCrypto,
          crypto_amount: this.amount,
          money: this.money,
          datetime: new Date(),
        };
        this.saveData = true;
      }
    },
    async newTransaction(transactionData) {
      try {
        await this.createTransaction(transactionData);
        this.money = 0;
        this.amount = 0;
        alert("Realizado");
      } catch (error) {
        console.error("Error al realizar la nueva transacción:", error);
      }
    },
    totalMoney() {
      const crypto = this.cryptoList.find((crypto) => crypto.code === this.selectedCrypto);
      if (this.amount < 0) this.amount = 0;

      this.money = parseFloat((this.amount * crypto.price.totalAsk).toFixed(0));
    },
  },
};
</script>

<style>
.purchase {
  width: 413px;
}

.btnPurchase {
  background-color: #10ac4c !important;
  transition: background-color 0.3s;
  border: none;
}

.btnPurchase:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
.modal {
  color: black;
}
</style>