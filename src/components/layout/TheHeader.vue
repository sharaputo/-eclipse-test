<template>
  <header class="header">
    <div class="container">
      <div class="header__body">
        <a
          href="https://eclipse-studio.ru/"
          class="header__logo"
          aria-label="Eclipse website"
          target="_blank">
          <img src="@/assets/images/logo.svg" alt="Eclipse logo" />
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
  .header {
    background-color: var(--header);
    z-index: 100;
    &__body {
      display: grid;
      grid-template-columns: 80px;
      padding: 10px 0;
    }
  }
</style>
