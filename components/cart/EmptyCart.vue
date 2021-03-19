<template>
  <div class="text-center">
    <Heading title="Cart" />
    <!-- <div class="flex items-center justify-start mx-2">
      <nuxt-link to="/" class="absolute flex-1 font-bold text-left"
        ><ChevronLeftIcon  class="mr-1 text-gray-600 "
      /></nuxt-link>
      <h1 class="flex-1 p-2 text-xl font-semibold text-center bg-white">
        Cart
      </h1>
    </div>-->
    <div class="mx-auto my-auto">
      <div class="flex justify-center py-6">
        <img v-lazy="`empty-cart.gif`" class="w-48 h-48 rounded-full" />
      </div>
      <div class="py-4 text-2xl">Your cart is empty</div>
      <p class="flex justify-center px-6 text-base text-center text-gray-500">
        Good food is always cooking! Go ahead, order some yummy items from the
        menu.
      </p>

      <nuxt-link
        to="/search/"
        class="inline-block px-6 py-2 my-3 rounded-full primary"
        >Go</nuxt-link
      >
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Heading } from '~/shared/components'
export default {
  components: { Heading },
}
</script>
