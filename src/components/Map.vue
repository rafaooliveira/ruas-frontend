<template lang="pug">
div.col-12
  q-input(
    label="Onde é teu role cachorro ?"
    filled
		v-show="this.$route.path === '/'"
  )
    template(
      v-slot:append
    )
      q-icon(
        name="search"
      )
  div#mapid
</template>

<style>
#mapid { 
  height: 920px;
}
</style>
<script>
import leaflet from "leaflet"
export default {
  data () {
    return {
    }
  },
  mounted () {
    const myMap = leaflet.map('mapid').setView([51.505, -0.09], 13);
		leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmFmYW9vbGl2ZWlyYSIsImEiOiJja3YwYXBxMG83a3I1MnFuemdpaXV0dTUxIn0.f_wybQ1DSPkAmzsK-fi8og', {
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			maxZoom: 18,
			id: 'mapbox/streets-v11',
			tileSize: 512,
			zoomOffset: -1,
			accessToken: 'pk.eyJ1IjoicmFmYW9vbGl2ZWlyYSIsImEiOiJja3YwYXBxMG83a3I1MnFuemdpaXV0dTUxIn0.f_wybQ1DSPkAmzsK-fi8og'
		}).addTo(myMap)
  }
}
</script>
