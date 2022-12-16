<template>
  <div class="currency">
    <button type="button" :class="classes" @click="toggleDropdown">
      {{ isSelected }}
    </button>
    <Transition>
      <ul class="currency__list" v-show="isOpened">
        <li
          class="currency__item"
          v-for="(option, i) of options"
          :key="`${option}-${i}`"
          @click="
            isSelected = option;
            toggleDropdown();
            $emit('change', option);
          ">
          {{ option }}
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';

  interface currencySwitcherProps {
    options: string[];
    default?: string | null;
  }

  const props = withDefaults(defineProps<currencySwitcherProps>(), {
    default: null,
  });

  defineEmits<{
    (e: 'change', option: string): void;
  }>();

  const isOpened = ref(false);
  const isSelected = ref<string | null>(null);

  isSelected.value = props.default
    ? props.default
    : props.options.length > 0
    ? props.options[0]
    : null;

  const classes = computed(() => {
    return isOpened.value ? 'currency__selected opened' : 'currency__selected';
  });

  const toggleDropdown = () => {
    isOpened.value = !isOpened.value;
  };
</script>

<style lang="less" scoped>
  .currency {
    --background: var(--white);
    --text: var(--mine-shaft);

    position: relative;
    &__selected {
      position: relative;
      display: inline-block;
      font-size: 1.6rem;
      font-weight: 700;
      color: var(--text);
      user-select: none;
      transition: color @transition;
      z-index: 3;
      &:after {
        content: '';
        width: 0;
        height: 0;
        position: absolute;
        top: calc(50% - 2px);
        right: -17px;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid var(--text);
        transition: color @transition, transform @transition,
          border-top-color @transition;
      }
      &.opened {
        &:after {
          transform: rotate(180deg);
        }
      }
      &:focus-visible {
        outline: var(--outline) solid 2px;
      }
    }
    &__list {
      width: 100%;
      height: 200px;
      position: absolute;
      top: 30px;
      left: -50%;
      text-align: center;
      background-color: var(--background);
      transform: translateX(50%);
      overflow: auto;
      z-index: 10;
    }
    &__item {
      font-size: 1.6rem;
      font-weight: 700;
      color: var(--text);
      padding: 5px 14px;
      user-select: none;
      cursor: pointer;
    }
  }
  .dark-theme .currency {
    --background: var(--mine-shaft);
    --text: var(--white);
  }
  .v-enter-active {
    animation: expand @transition;
  }
  .v-leave-active {
    animation: expand @transition reverse;
  }
  @keyframes expand {
    0% {
      height: 0;
    }
    100% {
      height: 200px;
    }
  }
  @media @md {
    .currency {
      &__selected {
        font-size: 1.8rem;
      }
      &__item {
        font-size: 1.8rem;
      }
    }
  }
</style>
