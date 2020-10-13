<template>
  <div 
    class="mt-2" 
    :style="{'direction': $vs.rtl ? 'rtl' : 'ltr'}">
    <feather-icon 
      icon="EyeIcon" 
      svg-classes="h-5 w-5 mr-4 cursor-pointer" 
      @click="viewRecord" />
  </div>
</template>

<script>
export default {
  name: 'CellRendererActions',
  methods: {
    viewRecord () {
      this.$router.push(`/resident/${this.params.data.id}`).catch(() => {})
    }
  }
}
</script>
