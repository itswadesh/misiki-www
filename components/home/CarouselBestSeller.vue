<template>
  <div class="w-full px-2 mx-auto my-4">
    <div class="flex justify-center mx-4 border-b">
      <p
        class="pb-2 mt-2 text-center border-b2 text-accent-600 border-accent-600 md:ml-6 md:mt-4"
      >
        {{ title }}
      </p>
    </div>
    <carousel :perPage="6" :paginationEnabled="false">
      <slide v-for="p in products[0] && products[0].items" :key="p.id" class>
        <Product :product="p" />
      </slide>
    </carousel>
  </div>
</template>

<script>
import Vue from 'vue'
// import { Carousel, Slide } from '@jambonn/vue-concise-carousel'
// import '@jambonn/vue-concise-carousel/dist/vue-concise-carousel.css'
import Product from '~/components/ProductBestseller.vue'

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
