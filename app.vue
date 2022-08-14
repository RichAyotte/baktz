<template>
  <img
    class="logo"
    width="142.333"
    height="50"
    src="assets/images/baktz-logo.svg"
  >
  <div class="flex-container">
    <img
      width="800"
      height="800"
      class="tezzomboiz"
      src="assets/images/batkz-tezzomboiz-transparent-800x800.webp"
    >
    <div class="introduction">
      <h1>
        Reliable Tezos Delegation Service
      </h1>
      <p>
        <img
          class="text-logo"
          src="assets/images/baktz-logo.svg"
        >
        is a professional, secure and reliable Tezos staking service that
        offers a low commission fee of <em><strong>10%</strong></em>.
      </p>
      <p>
        Delegate your stake and receive staking rewards from one of the most
        community involved staking services available.
      </p>
    </div>

    <!--     <div class="delegate-address-container">
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
 -->
  </div>
</template>

<!-- <script setup lang="ts">
const delegateAddress = `tz1R4PuhxUxBBZhfLJDx2nNjbr7WorAPX1oC`

const copyToClipboard = async function(text: string) {
	await navigator.clipboard.writeText(text)
}
</script>
 -->
<style lang="scss" scoped>
@import 'include-media';

.flex-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  @include media(">tablet") {
    padding-top: 10%;
  }

  .tezzomboiz {
    object-fit: cover;
    width: 100%;
    height: 100%;
    @include media(">tablet") {
      max-width: 600px;
    }

  }
  .introduction {
    padding: 10px;
    text-align: center;
    font-size: larger;
    max-width: 30em;
    .text-logo {
      height: 20px;
      vertical-align: middle;
    }

  }
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
    font-family: 'JetBrains Mono', monospace;
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
  margin: 3%;
}
</style>
