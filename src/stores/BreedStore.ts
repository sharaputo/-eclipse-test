import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';

export const useBreedStore = defineStore('breedStore', () => {
  // Genaral state for loading images
  const isLoading = ref(false);
  const startLoading = (): void => {
    isLoading.value = true;
  };
  const stopLoading = (): void => {
    isLoading.value = false;
  };

  // General state for errors
  const error = ref('');
  const setError = (message: string): void => {
    error.value = message;
  };

  // Logic to handle favourite images
  const favouriteImages = ref<string[]>([]);
  const saveFavouriteImages = (): void => {
    localStorage.setItem('favourites', JSON.stringify(favouriteImages.value));
  };
  const loadFavouriteImages = (): void => {
    const favouriteDogs: string[] = JSON.parse(
      localStorage.getItem('favourites') || '[]',
    );
    favouriteImages.value = favouriteDogs;
  };

  onMounted(() => {
    loadFavouriteImages();
  });

  return {
    isLoading,
    error,
    favouriteImages,
    startLoading,
    stopLoading,
    setError,
    saveFavouriteImages,
  };
});
