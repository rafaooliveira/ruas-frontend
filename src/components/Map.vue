<template lang="pug">
div.col-12
  q-input(
    label="Encontre teu role meu chegado"
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
  name: 'PageMaps',
  data () {
    return {
      latitude: '',
      longitude: '',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 20,
      center: [],
      markerLatLng: [],
      picoleLatLng: [],
      ready: false,
      icon: leaflet.icon({
        iconUrl: 'picole3.png',
        iconSize: [50, 50],
        iconAnchor: [16, 37]
      })
    }
  },
	methods: {
		getGeolocation () {
      if (navigator.geolocation) {
        this.$q.loading.show()
				navigator.geolocation.getCurrentPosition(this.setPosition, this.errorPosition)
      } else {
        this.errorPosition()
      }
    },
    setPosition (position) {
      const coords = position.coords
      this.center = [coords.latitude, coords.longitude]
      this.markerLatLng = [coords.latitude, coords.longitude]
			const myMap = leaflet.map('mapid').setView([this.markerLatLng[0], this.markerLatLng[1]], 17);
			leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmFmYW9vbGl2ZWlyYSIsImEiOiJja3YwYXBxMG83a3I1MnFuemdpaXV0dTUxIn0.f_wybQ1DSPkAmzsK-fi8og', {
				attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
				maxZoom: 18,
				id: 'mapbox/streets-v11',
				tileSize: 512,
				zoomOffset: -1,
				accessToken: 'pk.eyJ1IjoicmFmYW9vbGl2ZWlyYSIsImEiOiJja3YwYXBxMG83a3I1MnFuemdpaXV0dTUxIn0.f_wybQ1DSPkAmzsK-fi8og'
			}).addTo(myMap)
			console.log(this.markerLatLng)
      this.picoleLatLng = [
        {
          lat: (coords.latitude + 0.0005),
          log: (coords.longitude + 0.0005),
          info: 'Kibom'
        },
        {
          lat: (coords.latitude + 0.0008),
          log: (coords.longitude + 0.0008),
          info: 'Nestle'
        },
        {
          lat: (coords.latitude + -0.0005),
          log: (coords.longitude + -0.0005),
          info: 'Magnum'
        },
        {
          lat: (coords.latitude + 0.0010),
          log: (coords.longitude + -0.0013),
          info: 'Limão'
        }
      ]
      this.$q.loading.hide()
      this.successNotify()
      this.ready = true
    },
    errorPosition () {
      this.$q.notify({
        position: 'bottom',
        timeout: 3000,
        color: 'negative',
        textColor: 'white',
        actions: [{ icon: 'close', color: 'white' }],
        message: 'Não foi possível recupera sua posição!'
      })
      this.$q.loading.hide()
    },
    successNotify () {
      this.$q.notify({
        position: 'bottom',
        timeout: 3000,
        color: 'positive',
        textColor: 'white',
        actions: [{ icon: 'check', color: 'white' }],
        message: 'Posição recuperada com sucesso!'
      })
    }
	},
  mounted () {
    this.getGeolocation()
  }
}
</script>
