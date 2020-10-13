<template>
  <div 
    class="mt-2" 
    :style="{'direction': $vs.rtl ? 'rtl' : 'ltr'}">
    <feather-icon 
      icon="EyeIcon" 
      svg-classes="h-5 w-5 mr-4 cursor-pointer" 
      @click="viewRecord" />
    <feather-icon 
      icon="Edit3Icon" 
      svg-classes="h-5 w-5 mr-4 text-primary cursor-pointer" 
      @click="editRecord" />
      <!--<feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 text-danger cursor-pointer" @click="confirmDeleteRecord" /> -->
  </div>
</template>

<script>
export default {
  name: 'CellRendererActions',
  methods: {
    viewRecord () {
      this.$router.push(`/test-taker/${this.params.data.id}`).catch(() => {})
    },    
    editRecord () {
      this.$router.push(`/editTestTaker/${this.params.data.id}`).catch(() => {})
    },
  }
}
</script>
