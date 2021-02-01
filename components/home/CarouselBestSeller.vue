<template>
  <div class="w-full my-4">
    <h2 class="m-2 text-xl">{{ title }}</h2>
    <carousel :perPage="2" :paginationEnabled="false">
      <slide v-for="p in products[0] && products[0].items" :key="p.id" class>
        <Product :p="p" />
      </slide>
    </carousel>
  </div>
</template>

<script>
import Vue from 'vue'
import { Carousel, Slide } from '@jambonn/vue-concise-carousel'
import '@jambonn/vue-concise-carousel/dist/vue-concise-carousel.css'
import Product from '~/components/ProductBestseller.vue'

export default {
  props: ['title', 'products'],
  components: {
    Carousel,
    Slide,
    Product,
  },
}
</script>

<style scoped></style>
