<script setup>
import barView from '@/components/barView.vue'
import contentNote from '@/views/content/components/contentNote.vue'
import FooterView from '@/components/FooterView.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const parms = route.query.id
</script>
<template>
  <barView />
  <div class="content"><contentNote :parms="parms" /></div>
  <div class="foot">
    <FooterView />
  </div>
</template>

<style scoped>
.content {
  width: 1000px;
  margin: 0 auto;
  margin-bottom: 20px;
  min-height: 400px;
}
</style>
