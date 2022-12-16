<template>
  <button
    class="button"
    :type="type"
    :class="activeClass"
    @click="$emit('click')">
    <slot />
  </button>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  interface BaseButtonProps {
    type?: 'button' | 'submit';
    active?: boolean;
  }

  const props = withDefaults(defineProps<BaseButtonProps>(), {
    type: 'button',
  });

  defineEmits<{
    (e: 'click'): void;
  }>();

  const activeClass = computed(() => {
    return props.active ? 'active' : '';
  });
</script>

<style lang="less" scoped>
  .button {
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
    &.active {
      color: var(--white);
      background-color: var(--cornflower-blue);
    }
  }

  @media @md {
    button {
      font-size: 1.6rem;
    }
  }
</style>
