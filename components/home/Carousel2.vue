<template>
  <div class="w-full my-4">
    <h2 class="m-2 text-xl">{{ title }}</h2>
    <carousel :perPage="2" :paginationEnabled="false">
      <slide v-for="p in products" :key="p.id" class="flex items-stretch">
        <Product :p="p" class="w-full" />
      </slide>
    </carousel>
  </div>
</template>

<script>
import Vue from 'vue'
import { Carousel, Slide } from '@jambonn/vue-concise-carousel'
import '@jambonn/vue-concise-carousel/dist/vue-concise-carousel.css'
import { Product } from '~/../shared/components'

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
