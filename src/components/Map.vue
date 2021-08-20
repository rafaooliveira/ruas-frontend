<template lang="pug">
div(
    style="height: 1050px; width: 100%"
  )
    q-input.col-12(
      label="Onde é teu role cachorro ?"
      filled
      v-if="this.user === true"
    )
      template(v-slot:append)
        q-icon(
          name="search"
        )
    l-map(
      style="height: 80%; width: 100%"
      :zoom="zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
    )
      l-tile-layer(
        :url="url"
        :attribution="attribution"
      )
      l-marker(
      :lat-lng="marker"
      )
        l-tooltip É UM ROLE ESTÁTICO MAS FUNCIONA!
</template>

<script>
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer, LMarker, LTooltip, LIcon } from "@vue-leaflet/vue-leaflet";
export default {
  data () {
    return {
      user: true,
      geojsonOptions: {
        // Options that don't rely on Leaflet methods.
      },
    }
  },
  methods: {
    zoomUpdated (zoom) {
      this.zoom = zoom
    },
    centerUpdated (center) {
      this.center = center
    },
    boundsUpdated (bounds) {
      this.bounds = bounds
    },
    innerClick () {
      alert('Click!')
    }
  },
  computed: {
    dynamicSize () {
      return [this.iconSize, this.iconSize * 1.15]
    },
    dynamicAnchor () {
      return [this.iconSize / 2, this.iconSize * 1.15]
    }
  },
  async beforeMount () {
    const { LMap, LTileLayer, LMarker } = await import('leaflet/dist/leaflet-src.esm');

    this.geojsonOptions.pointToLayer = (feature, latLng) =>
      LMap({zoom: 13 , center: [-23.5677666, -46.6487763], bounds: null})
      LMarker(latLng, (-23.5677666, -46.6487763))
      LTileLayer({attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'})
    this.mapIsReady = true
  }
}
</script>
