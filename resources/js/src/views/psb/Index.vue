<template>
  <b-row>
    <b-col cols="12">
      <b-card title="SELAMAT DATANG DI PORTAL PSB PP. DARUL KAROMAH" class="text-center">
        <b-carousel id="carousel-psb" controls indicators>
          <b-carousel-slide :img-src="'/img/ppdb.png'" />
          <b-carousel-slide :img-src="'/img/ppdb.png'" />
        </b-carousel>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol, BCard, BImg, BCarousel, BCarouselSlide } from 'bootstrap-vue'
export default {
  components: {
    BRow,
    BCol,
    BCard,
    BImg,
    BCarousel, 
    BCarouselSlide,
  },
}
</script>