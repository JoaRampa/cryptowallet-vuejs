<template>
  <ComponentWallet />
  <InvestmentsCrypto />
</template>
<script>
import ComponentWallet from "@/components/ComponentWallet.vue";
import InvestmentsCrypto from "@/components/InvestmentsCrypto.vue";
export default {
  name: "WalletView",
  components: {
    ComponentWallet,
    InvestmentsCrypto
  },
};
</script>