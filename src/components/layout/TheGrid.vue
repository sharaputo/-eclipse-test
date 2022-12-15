<template>
  <section class="content">
    <h1 class="content__title">
      <slot name="title" />
    </h1>

    <div class="content__body">
      <slot />
    </div>
  </section>
</template>

<style lang="less" scoped>
  .content {
    &__title {
      font-size: 2.2rem;
      text-align: center;
      text-transform: uppercase;
      color: var(--title);
      transition: color @transition;
    }
    &__body {
      margin-top: 30px;
    }
  }

  @media @sm {
    .content {
      &__title {
        font-size: 2.6rem;
      }
    }
  }
</style>
