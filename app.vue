<template>
  <img
    class="logo"
    height="184"
    src="~assets/images/baktz-logo.svg"
    width="529"
  >
  <h1>
    Tezos baking service.
  </h1>
  <code class="delegate-address">tz1R4PuhxUxBBZhfLJDx2nNjbr7WorAPX1oC</code>
</template>

<style>
body {
  font-family: 'Alegreya Sans', sans-serif;
  text-align: center;
}

h2 {
  margin-top: 0px;
  color: #444;
}

.delegate-address {
  background-color: #f3f3f3;
  border: 1px solid silver;
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-size: x-large;
  margin: 30px;
  max-width: 80%;
  padding: 15px;
  text-align: center;
  word-wrap: break-word;
}

.logo {
  aspect-ratio: attr(width) / attr(height);
  margin: 60px 0px 0px 0px;
  max-width: 500px;
  width: 80%;
}
</style>
