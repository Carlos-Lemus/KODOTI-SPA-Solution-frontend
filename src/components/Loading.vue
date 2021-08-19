<template>
  <img src="../assets/loading.svg" alt="Logo" />
</template>

<script>
export default {};
</script>

<style scoped>
@keyframes rotationAnimation {
  0% {
    transform: rotate(0deg);
    display: none;
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
    display: block;
  }
}

div {
  width: 100%;
  width: auto;
}

img {
  display: block;
  animation: rotationAnimation 3s linear 0s infinite normal;
  max-height: 10vw;
  max-width: 10vh;
  margin: auto auto;
}
</style>