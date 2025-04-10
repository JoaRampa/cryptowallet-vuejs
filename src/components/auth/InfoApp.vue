<template>
  <section class="crypto-wallet">
    <b class="title">Crypto Wallet</b>
    <div class="info-item">
      <i class="fas fa-chart-line icon"></i>
      <h2 class="info-text">Transaction Statistics</h2>
    </div>
    <div class="info-item">
      <i class="fas fa-history icon"></i>
      <h2 class="info-text">Movement History</h2>
    </div>
    <div class="info-item">
      <i class="fas fa-shield-alt icon"></i>
      <h2 class="info-text">Investment Suggestions</h2>
    </div>
  </section>
</template>

<style>
.crypto-wallet {
  display: flex;
  flex-direction: column;
  transform: translate(20%);
  width: 100%;
  gap: .45rem;
}

@media (max-width: 768px) {
  .crypto-wallet {
    display: none;
  }
}

.title {
  font-size: 2rem;
  font-weight: bold;
}

.info-item {
  display: flex;
  align-items: center;
  gap: .5rem;
}

.icon {
  width: 2.5rem;
  height: 2.5rem;
  font-size: 2rem;
}

.info-text {
  font-size: 1.125rem;
}
</style>
  