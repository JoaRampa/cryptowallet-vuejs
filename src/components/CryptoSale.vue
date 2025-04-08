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
      <div class="sale">
        <button class="btn btn-outline-light" type="submit" :disabled="amount === 0 || saleAmount < amount"
          data-bs-target="#confirmSale" data-bs-toggle="modal">
          Vender
        </button>
        </div>
        <div class="modal" id="confirmSale">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Confirmar Venta</h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <p>¿Seguro que quiere vender las criptomonedas?</p>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cerrar
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-dismiss="modal"
                    @click="newTransaction(transactionData)"
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { validateInput, formatNumber } from '../utils/index.js';

export default {
  data() {
    return {
      selectedCrypto: "btc",
      money: 0,
      amount: 0,
      userWallet: {},
      saleAmount: 0,
      transactionData: null,
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
.sale button {
  background-color: #af1b1b;
  transition: background-color 0.3s;
  border: none;
}

.sale button:hover {
  background-color: rgb(103, 15, 15);
}
</style>