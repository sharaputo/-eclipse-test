<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__body">
        <small class="copyright">&copy; {{ date }} Sharaputo</small>
        <ThemeButton />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  import ThemeButton from '@/components/footer/ThemeButton.vue';
  const date = new Date().getFullYear();
</script>

<style lang="less" scoped>
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: var(--footer);
    padding: 10px 0;
    &__body {
      display: grid;
      grid-template-columns: 1fr 65px;
      align-items: center;
    }
  }
  @media @md {
    .footer {
      padding: 15px 0;
      .copyright {
        font-size: 1.4rem;
      }
    }
  }
</style>
