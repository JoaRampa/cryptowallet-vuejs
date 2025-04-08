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
      <button class="btnPurchase" type="submit" :disabled="amount === 0" 
        data-bs-target="#confirmPurchase" data-bs-toggle="modal">
        Comprar
      </button>
      <div class="modal" id="confirmPurchase">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Confirmar Compra</h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <p>¿Quiere confirmar la compra?</p>
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
      transactionData: null,
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

.btnPurchase:hover {
  background-color: rgb(11, 118, 45);
}

.modal {
  color: black;
}
</style>
