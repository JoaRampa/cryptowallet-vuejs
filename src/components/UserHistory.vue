<template>
  <div class="history-page">
    <b>{{ userId }}</b>

    <div class="cards-container d-flex flex-wrap gap-3 my-3">
      <div v-for="(transaction, index) in transactions" :key="transaction._id" 
        class="transaction-card" style="width: 9rem; padding: 3px;">
        <div class="coin">
          <p>#{{transactions.length - index}} {{ transaction.crypto_code.toUpperCase() }}</p>
          <button @click="openModal(transaction)">i</button>
        </div>
      </div>
    </div>
    
    <div class="modal fade" id="transactionModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content" v-if="selectedTransaction">
          <div class="modal-header">
            <h5 class="modal-title">Details</h5>
          </div>
          <div class="modal-body">
            <p><strong>Action:</strong> {{ selectedTransaction.action }}</p>
            <p><strong>Quantity:</strong> {{ selectedTransaction.crypto_amount }}</p>
            <p><strong>Total:</strong> ${{ selectedTransaction.money }}</p>
            <p><strong>ID:</strong> {{ selectedTransaction._id }}</p>
            <p><strong>Date:</strong> {{ selectedTransaction.datetime }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "HistoryPage",
  data() {
    return {
      transactions: [],
      selectedTransaction: null,
    };
  },
  computed: {
    ...mapGetters(["userId"]),
  },
  async created() {
    try {
      this.transactions = await this.getHistory(this.userId);
      this.transactions.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
    } catch (error) {
      console.error("Error al obtener el historial:", error);
    }
  },
  methods: {
    ...mapActions("transactions", ["getHistory"]),
    openModal(transaction) {
      this.selectedTransaction = transaction;
      
      const modalEl = document.getElementById("transactionModal");
      const modal = new window.bootstrap.Modal(modalEl); 
      modal.show();
    },
    closeModal() {
      const modalEl = document.getElementById("transactionModal");
      const modalInstance = window.bootstrap.Modal.getInstance(modalEl);
      modalInstance.hide();
      this.selectedTransaction = null;
    },
  },
};
</script>

<style scoped>
.coin {
  justify-content: space-between;
  margin: 0;
}
.coin button {
  width: 2rem;
  border-radius: 100%;
  background-color: rgb(12, 22, 62);
}
.cards-container {
  justify-content: center;
}
.transaction-card {
  border-radius: 5px;
  border: 1px solid rgba(171, 177, 196, 0.137);
}
</style>