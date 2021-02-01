<template>
  <div class="w-full my-4">
    <h2 class="m-2 text-xl">{{ title }}</h2>
    <carousel :perPage="2" :paginationEnabled="false">
      <slide v-for="p in products" :key="p._id" class="px-2">
        <img class="object-cover w-full h-32" v-lazy="p.img" alt />
        <div class="text-center truncate">{{ p.name }}</div>
      </slide>
    </carousel>
  </div>
</template>

<script>
import Vue from 'vue'
import { Carousel, Slide } from '@jambonn/vue-concise-carousel'
import '@jambonn/vue-concise-carousel/dist/vue-concise-carousel.css'

export default {
  props: ['title', 'products'],
  components: {
    Carousel,
    Slide,
  },
}
</script>

<style scoped></style>
