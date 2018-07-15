<template>
  <div id="app">
    <AlertBox type="AlertBox.Info">
      Нажмите "Помощь" над окном приложения, чтобы прочесть инструкцию по использованию.
    </AlertBox>

    <AlertBox type="AlertBox.Warning">
      Не запускайте приложение в нескольких вкладках. Это не ускорит перебор документов. Более того, это может вызвать проблемы в работе приложения.
    </AlertBox>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AlertBox from './components/AlertBox.vue';

@Component({
  components: {
  AlertBox,
  },
  })
export default class App extends Vue {}
</script>

<style lang="stylus">
#app
  font-family 'Roboto', sans-serif
  padding 1rem
</style>
