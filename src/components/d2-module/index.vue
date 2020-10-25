<template>
    <div :class="`d2-module${marginBottom? ' margin-bottom-padding' : ''}`">
        <div :class="`d2-module-container${paddingTop ? ' top-padding' : ''}${paddingBottom ? ' bottom-padding' : ''}`">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
  name: 'd2-module',
  props: {
    marginBottom: {
      type: Boolean,
      default: false
    },
    paddingTop: {
      type: Boolean,
      default: true
    },
    paddingBottom: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.d2-module {
    background-color: #EBF1F6;

    &-container {
        padding: 0 20px;
        background-color: #FFF;
    }
}
.margin-bottom-padding {
    padding-bottom: 10px;
}
.bottom-padding {
    padding-bottom: 20px;
}
.top-padding {
    padding-top: 20px;
}
</style>
