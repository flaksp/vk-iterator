<template>
  <div :class="'alert alert-' + type">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AlertType } from 'src/Enum/AlertType';

@Component
export default class AlertBox extends Vue {
        @Prop() private type!: AlertType;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  .alert
    padding 1rem
    border-width 1px
    border-style solid
    margin-bottom 1rem

    &-warning
      border-color #FFB74D

    &-info
      border-color #81D4FA
</style>
