<template>
  <TheGrid>
    <template #title>Конвертер валют</template>

    <div class="converter">
      <div class="converter__input">
        <InputField
          type="number"
          @input="setInputValue"
          :value="inputValue"
          @focus="inputValue = 0" />
        <CurrencySelect
          default="Выбрать"
          :options="filteredCurrenciesList"
          @change="setFirstInputRate" />
      </div>
      <button type="button" class="converter__btn" @click="reverseCurrency">
        &#128260;
      </button>
      <div class="converter__input">
        <InputField type="number" :model-value="convertionResult" readonly />
        <CurrencySelect
          default="Выбрать"
          :options="filteredCurrenciesList"
          @change="setSecondInputRate" />
      </div>
    </div>
  </TheGrid>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useCurrencyStore } from '@/stores/CurrencyStore';
  import TheGrid from '@/components/layout/TheGrid.vue';
  import CurrencySelect from '@/components/common/CurrencySelect.vue';
  import InputField from '@/components/common/InputField.vue';
  import useRound from '@/composables/useRound';

  const store = useCurrencyStore();
  const { filteredCurrenciesList } = storeToRefs(store);

  const reversed = ref(false);
  const reverseCurrency = (): void => {
    reversed.value = !reversed.value;
  };

  const convertionResult = ref(0);
  const inputValue = ref(0);
  const firstInputRate = ref(store.rate);
  const secondInputRate = ref(store.rate);

  const calculateSum = (): void => {
    if (firstInputRate.value === secondInputRate.value) {
      convertionResult.value = inputValue.value;
    } else if (firstInputRate.value && secondInputRate.value) {
      convertionResult.value = useRound(
        (firstInputRate.value / secondInputRate.value) * inputValue.value,
      );
    }
  };
  const setInputValue = (e: { target: { value: string } }): void => {
    inputValue.value = Number(e.target.value);
    calculateSum();
  };
  const setFirstInputRate = (option: string): void => {
    store.getCurrencyDetails(option);
    firstInputRate.value = store.rate;
    calculateSum();
  };
  const setSecondInputRate = (option: string): void => {
    store.getCurrencyDetails(option);
    secondInputRate.value = store.rate;
    calculateSum();
  };
</script>

<style lang="less" scoped>
  .converter {
    display: grid;
    gap: 20px;
    &__input {
      display: grid;
      grid-template-columns: 150px 100px;
      align-items: center;
      gap: 10px;
      margin: 0 auto;
    }
    &__btn {
      font-size: 2rem;
    }
  }
</style>
