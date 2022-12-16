<template>
  <input
    class="input"
    :type="type"
    :id="id"
    :placeholder="placeholder"
    :value="modelValue"
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)
    " />
</template>

<script setup lang="ts">
  type InputType = 'email' | 'number' | 'password' | 'search' | 'tel' | 'text';

  interface inputProps {
    type: InputType;
    modelValue?: string | number;
    id?: string;
    placeholder?: string;
  }

  withDefaults(defineProps<inputProps>(), {
    type: 'text',
  });
  defineEmits(['update:modelValue']);
</script>

<style lang="less" scoped>
  .input {
    --background: var(--gallery);
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
    &[readonly] {
      background-color: var(--background);
      pointer-events: none;
    }
  }
  .dark-theme .input {
    --background: var(--mine-shaft-hover);
    --border: var(--white);
    --placeholder: var(--gallery);
    --text: var(--white);
  }
</style>
