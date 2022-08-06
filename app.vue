<template>
  <div class="container">
    <img
      class="logo"
      height="184"
      src="~assets/images/baktz-logo.svg"
      width="529"
    >
    <div class="delegate-address-container">
      <div class="delegate-address">
        {{ delegateAddress }}
      </div>
      <button
        @click="copyToClipboard(delegateAddress)"
        class="p-button-secondary"
      >
        Copy to clipboard
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const delegateAddress = `tz1R4PuhxUxBBZhfLJDx2nNjbr7WorAPX1oC`

const copyToClipboard = async function(text: string) {
	await navigator.clipboard.writeText(text)
}

</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  text-align: center;
  margin: 0 auto;
}

.delegate-address-container {
  background-color: #f3f3f3;
  border: 1px solid silver;
  display: block;
  margin: 10px auto;
  max-width: 15ex;
  padding: 15px;
  aspect-ratio: 1 / 1;
  .delegate-address {
    font-family: monospace;
    font-size: x-large;
    margin: 10px;
    text-align: justify;
    word-wrap: break-word;
  }
  .p-button-secondary {
    width: 100%;
  }
}

.logo {
  aspect-ratio: attr(width) / attr(height);
  margin: 60px 0px 0px 0px;
  max-width: 500px;
  width: 80%;
}
</style>
