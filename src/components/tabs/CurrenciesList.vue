<template>
  <TheGrid>
    <template #title>Список валют</template>

    <div class="currency-search">
      <label for="currency">Поиск валюты</label>
      <InputField
        type="search"
        id="currency"
        placeholder="Найти валюту"
        @input="searchCurrency" />
    </div>

    <div class="currency-details" v-if="currencyDetails">
      <div class="details">
        <div class="details__rate" v-if="!reversed">
          <span>1 {{ charcode }} – {{ rate }} RUB</span>
          <span
            class="details__difference details__difference--growing"
            v-if="rateDifference >= 0">
            &#8593; {{ rateDifference }}
          </span>
          <span class="details__difference details__difference--falling" v-else>
            &#8595; {{ rateDifference }}
          </span>
        </div>
        <div class="details__rate" v-else>
          <span>1 RUB – {{ reversedRate }} {{ charcode }}</span>
          <span
            class="details__difference details__difference--growing"
            v-if="rateDifferenceReversed >= 0">
            &#8593; {{ rateDifferenceReversed }}
          </span>
          <span class="details__difference details__difference--falling" v-else>
            &#8595; {{ rateDifferenceReversed }}
          </span>
        </div>
      </div>
      <button type="button" class="reverse" @click="reverseRate">
        &#128260;
      </button>
    </div>

    <AppLoader v-if="isLoading" />

    <p class="currency-error" v-else-if="!isLoading && loadingError">
      {{ loadingError }}
    </p>

    <ul class="currency-list" v-else>
      <li
        class="currency-list__item"
        v-for="(currency, i) in sortedList"
        :key="`currency-${i}`">
        <input
          type="radio"
          :value="currency"
          :id="currency"
          name="currencies"
          @change="showDetails(currency)" />
        <label :for="currency">{{ currency }}</label>
      </li>
    </ul>
  </TheGrid>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import TheGrid from '@/components/layout/TheGrid.vue';
  import AppLoader from '@/components/common/AppLoader.vue';
  import InputField from '@/components/common/InputField.vue';
  import { useCurrencyStore } from '@/stores/CurrencyStore';

  const store = useCurrencyStore();
  const {
    isLoading,
    loadingError,
    filteredCurrenciesList,
    currencyDetails,
    charcode,
    rate,
    reversedRate,
    rateDifference,
    rateDifferenceReversed,
  } = storeToRefs(store);

  const searchCurrency = (e: { target: { value: string } }) => {
    store.filterCurrenciesList(e.target.value);
  };

  const reversed = ref(false);
  const reverseRate = (): void => {
    reversed.value = !reversed.value;
  };

  const showDetails = (option: string): void => {
    store.getCurrencyDetails(option);
  };

  const sortedList = computed(() => {
    let list = filteredCurrenciesList.value;
    return list.sort();
  });
</script>

<style lang="less" scoped>
  .currency-search {
    max-width: 414px;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 10px;

    label {
      color: var(--content-text);
    }
  }
  .currency-details {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    .details {
      color: var(--content-text);
      transition: color @transition;
      &__difference {
        padding: 0 4px;
        border-radius: 5px;
        margin-left: 10px;
      }
      &__difference--growing {
        background-color: var(--pastel-green);
      }
      &__difference--falling {
        background-color: var(--burnt-sienna);
      }
    }
    .reverse {
      font-size: 2rem;
      margin-left: 10px;
    }
  }
  .currency-error {
    margin-top: 30px;
  }
  .currency-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin-top: 30px;
    &__item {
      position: relative;
    }
    label {
      display: block;
      font-size: 1.4rem;
      font-weight: 700;
      text-align: center;
      color: var(--mine-shaft);
      background-color: var(--ronchi);
      padding: 10px;
      border-radius: 5px;
      transition: color @transition, background-color @transition;
      user-select: none;
    }
    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      opacity: 0;
    }
    input:checked + label {
      color: var(--white);
      background-color: var(--cornflower-blue);
    }
  }
</style>
