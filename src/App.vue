<template>
  <TheHeader />
  <main class="main">
    <div class="tabs">
      <div class="container tabs__container">
        <div class="tabs__buttons">
          <BaseButton
            :active="tab === 'currencies'"
            @click="setTab('currencies')">
            Список валют
          </BaseButton>
          <BaseButton
            :active="tab === 'converter'"
            @click="setTab('converter')">
            Конвертер
          </BaseButton>
        </div>

        <div class="tabs__content">
          <Transition name="content">
            <CurrenciesList v-show="tab === 'currencies'" />
          </Transition>

          <Transition name="content">
            <CurrenciesConverter v-show="tab === 'converter'" />
          </Transition>
        </div>
      </div>
    </div>
  </main>
  <TheFooter />
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import TheHeader from '@/components/layout/TheHeader.vue';
  import TheFooter from '@/components/layout/TheFooter.vue';
  import BaseButton from '@/components/common/BaseButton.vue';
  import CurrenciesList from '@/components/tabs/CurrenciesList.vue';
  import CurrenciesConverter from '@/components/tabs/CurrenciesConverter.vue';

  let tab = ref('currencies');

  const setTab = (cmp: string): void => {
    tab.value = cmp;
  };
</script>

<style lang="less">
  :root {
    font-size: 10px;
  }

  body {
    min-width: 320px;
    font-family: @font-primary;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.2;
    overflow-wrap: break-word;
    color: var(--text);
    background-color: var(--background);
    text-rendering: optimizeLegibility;
    transition: background-color @transition;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .main {
    flex-grow: 1;
    flex-shrink: 1;
    padding: 30px 0 80px;
  }

  .container {
    max-width: 1260px;
    width: 100%;
    padding: 0 15px;
    margin: 0 auto;
  }

  .tabs {
    &__container {
      max-width: 600px;
    }
    &__buttons {
      max-width: 414px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin: 0 auto;
    }
    &__content {
      text-align: center;
      margin-top: 30px;
    }
  }

  .content-enter-active {
    animation: scale @transition;
  }
  @keyframes scale {
    0% {
      opacity: 0;
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media @md {
    .container {
      padding: 0 20px;
    }
  }
  @media @lg {
    .container {
      padding: 0 30px;
    }
  }
</style>
