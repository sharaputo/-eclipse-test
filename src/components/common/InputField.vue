<template>
  <input class="input" :type="type" :id="id" :placeholder="placeholder" />
</template>

<script setup lang="ts">
  type InputType = 'email' | 'password' | 'search' | 'tel' | 'text';

  interface inputProps {
    type: InputType;
    id?: string;
    placeholder?: string;
  }

  withDefaults(defineProps<inputProps>(), {
    type: 'text',
  });
</script>

<style lang="less" scoped>
  .input {
    --border: var(--mine-shaft);
    --placeholder: var(--mine-shaft-hover);
    --text: var(--mine-shaft);

    display: block;
    width: 100%;
    font-size: 1.6rem;
    color: var(--text);
    padding: 5px 15px;
    border: 1px solid var(--border);
    border-radius: 5px;
    &::placeholder {
      color: var(--placeholder);
    }
  }
  .dark-theme .input {
    --border: var(--white);
    --placeholder: var(--gallery);
    --text: var(--white);
  }
</style>
