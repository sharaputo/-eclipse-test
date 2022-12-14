<template>
  <button :type="type" :class="classes" @click="$emit('click')">
    <slot />
  </button>
</template>

<script setup lang="ts">
  interface BaseButtonProps {
    type?: 'button' | 'submit';
    classes?: 'active' | 'disabled';
  }

  withDefaults(defineProps<BaseButtonProps>(), {
    type: 'button',
  });

  defineEmits<{
    (e: 'click'): void;
  }>();
</script>

<style lang="less" scoped>
  button {
    display: block;
    font-size: 1.4rem;
    font-weight: 700;
    text-align: center;
    color: var(--text);
    background-color: var(--button-primary);
    padding: 10px;
    border-radius: 5px;
    transition: background-color @transition;
  }
  button.active {
    background-color: var(--cornflower-blue);
  }
  button.disabled {
    background-color: var(--gallery);
    pointer-events: none;
  }

  @media @md {
    button {
      font-size: 1.6rem;
    }
  }
</style>
