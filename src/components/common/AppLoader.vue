<template>
  <div class="loader"></div>
</template>

<style lang="less" scoped>
  .loader {
    position: relative;
    display: grid;
    place-items: center;
    margin-top: 30px;
    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: var(--ronchi);
      border-radius: 50%;
      opacity: 0;
      animation: loader 0.8s cubic-bezier(0.2, 0.32, 0, 0.87) infinite;
    }
    @keyframes loader {
      0%,
      80%,
      100% {
        opacity: 0;
      }
      33% {
        opacity: 1;
      }
      0%,
      100% {
        transform: translateX(-4vmin);
      }
      90% {
        transform: translateX(4vmin);
      }
    }
  }
</style>
