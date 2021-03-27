<template>
  <div class="w-full px-1 my-4 sm:px-4">
    <h2 class="m-2 my-3 text-xl">{{ title }}</h2>
    <!-- <carousel :perPage="5" :paginationEnabled="false"> -->
    <div
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
    >
      <div v-for="p in products" :key="p.id" class="col-span-1">
        <Product :product="p" class="" />
      </div>
    </div>
    <!-- </carousel> -->
  </div>
</template>

<script>
import Vue from 'vue'
// import { Carousel, Slide } from '@jambonn/vue-concise-carousel'
// import '@jambonn/vue-concise-carousel/dist/vue-concise-carousel.css'
import { Product } from '~/shared/components'

export default {
  props: ['title', 'products'],
  components: {
    // Carousel,
    // Slide,
    Product,
  },
}
</script>

<style scoped></style>
