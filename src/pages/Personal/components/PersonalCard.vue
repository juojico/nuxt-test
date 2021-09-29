<template>
  <Card>
    <div :class="{contentArea: padding}">
      <div v-if="title" class="cardHeader">
        <span>{{title}}</span>
        <slot name="action" />
      </div>
      <div :class="{cardBody: true, noTitle: !title}">
        <slot name="content" />
      </div>
    </div>
  </Card>
</template>

<script>
  export default {
    name: 'PersonalCard',
    props: {
      title: { type: String, default: '' },
      padding: { type: Boolean, default: false },
    },
  };
</script>

<style lang="scss" scoped>
  .contentArea {
    padding: 20px 40px;
    background-color: white;

    @include rwd() {
      padding: 20px;
    }
  }

  .cardWrapper {
    margin-bottom: 30px;
    border-bottom: 1px solid $grey2;

    &:last-child {
      margin-bottom: 0;
      border-bottom: none;
    }
  }

  .cardHeader {
    @include flex(space-between);
    @include font(20, $text1, bold);
  }

  .cardBody {
    padding: 20px 0;

    &.noTitle {
      padding: 0 0 20px 0;
    }
  }
</style>