<template>
  <div class="modal fade" :id="modalId" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ modalTitle }}</h5>
        </div>
        <div class="modal-body">
          <p>{{ message }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ cancelButtonLabel }}
          </button>
          <button type="button" class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="confirmAction">
            {{ confirmButtonLabel }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmModal",
  props: {
    modalId: {
      type: String,
      required: true,
    },
    modalTitle: {
      type: String,
      default: "Confirmación",
    },
    message: {
      type: String,
      default: "¿Está seguro de continuar?",
    },
    confirmButtonLabel: {
      type: String,
      default: "Confirmar",
    },
    cancelButtonLabel: {
      type: String,
      default: "Cancelar",
    },
    transactionData: {
      type: Object,
      required: true
    },
  },
  methods: {
    confirmAction() {
      this.$emit("confirmed", this.transactionData);
    }
  }
};
</script>
