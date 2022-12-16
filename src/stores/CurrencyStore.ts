import { defineStore } from 'pinia';
import { ref, computed, onMounted } from 'vue';
import useFetch from '@/composables/useFetch';
import useRound from '@/composables/useRound';
import type CurrencyObject from '@/@types/CurrencyObject';

export const useCurrencyStore = defineStore('currencyStore', () => {
  const isLoading = ref(false);
  const loadingError = ref('');

  const currenciesList = ref<string[]>([]);
  const currenciesDetails = ref<CurrencyObject[]>([]);
  const getCurrencies = (): void => {
    isLoading.value = true;
    const API = new useFetch('https://www.cbr-xml-daily.ru');

    API.get('/daily_json.js')
      .then((data) => {
        if (data) {
          const currencies: object = data.Valute;

          Object.entries(currencies).forEach(([key, value]) => {
            currenciesList.value.push(key);
            currenciesDetails.value.push(value);
          });
        }
      })
      .catch(() => {
        loadingError.value =
          'Что-то пошло не так, не удалось загрузить данные. Пожалуйста, обновите страницу.';
      })
      .finally(() => {
        isLoading.value = false;
        getCurrencyDetails('USD');
      });
  };

  const currencyDetails = ref<CurrencyObject>();
  const getCurrencyDetails = (option: string): void => {
    currencyDetails.value = currenciesDetails?.value.find(
      (item) => item.CharCode === option,
    );
  };

  const charcode = computed(() => {
    return currencyDetails.value?.CharCode;
  });
  const rate = computed(() => {
    return currencyDetails.value?.Value;
  });
  const reversedRate = computed(() => {
    if (currencyDetails.value?.Value) {
      return useRound(1 / currencyDetails.value.Value);
    }
  });
  const rateDifference = computed(() => {
    let difference: number = 0;

    if (currencyDetails.value?.Value && currencyDetails.value?.Previous) {
      difference = useRound(
        currencyDetails.value.Value - currencyDetails.value.Previous,
      );
    }

    return difference;
  });
  const rateDifferenceReversed = computed(() => {
    let difference: number = 0;

    if (currencyDetails.value?.Value && currencyDetails.value?.Previous) {
      difference = useRound(
        1 / currencyDetails.value.Value - 1 / currencyDetails.value.Previous,
      );
    }

    return difference;
  });

  const filteredCurrenciesList = ref(currenciesList.value);
  const filterCurrenciesList = (input: string): void => {
    let searchResult: CurrencyObject[];

    searchResult = currenciesDetails.value.filter(
      (item) =>
        item.CharCode.includes(input.trim().toUpperCase()) ||
        item.Name.toLowerCase().includes(input.trim().toLowerCase()),
    );

    filteredCurrenciesList.value = searchResult.map((item) => item.CharCode);
  };

  onMounted(() => {
    getCurrencies();
  });

  return {
    isLoading,
    loadingError,
    filteredCurrenciesList,
    currencyDetails,
    charcode,
    rate,
    reversedRate,
    rateDifference,
    rateDifferenceReversed,
    getCurrencyDetails,
    filterCurrenciesList,
  };
});
