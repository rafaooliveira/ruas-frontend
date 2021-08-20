<template lang="pug">
div(id="root")
  Map
</template>

<script>
import Map from '../components/Map.vue'
import { defineComponent } from 'vue';
export default defineComponent ({
  name: 'pageIndex',
  components: {Map}
})
</script>

