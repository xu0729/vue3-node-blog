<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import barView from '@/components/barView.vue'
import notelist from '@/views/list/components/NoteList.vue'
import FooterView from '@/components/FooterView.vue'
const route = useRoute()
const keywords = ref(route.params.keywords)
</script>
<template>
  <barView />
  <notelist :keywords="keywords" />
  <div class="foot">
    <FooterView />
  </div>
</template>

<style scoped>
.foot {
  margin-top: 80px;
}
</style>
