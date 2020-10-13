<template>
  <div>
    <span v-if="params.value == null || params.value == ''"><i>N/A</i></span>
    <span v-else> {{ params.value }} </span>
  </div>
</template>

<script>
export default {
  name: 'CellRendererValue',
  computed: {}
}
</script>

<style scoped>
.txt-gray {
  color:rgb(107, 12, 12);
}
</style>