<template>
  <div class="text-center">
    <Heading title="Failure" />
    <div class="my-auto">
      <div class="flex justify-center py-6">
        <img v-lazy="`seattle.jpg`" class="w-40 h-40 rounded-full" />
      </div>
      <div class="py-4 text-2xl">Payment failed</div>
      <div class="flex px-6 text-base text-gray-500 align-middle">
        Please go back to cart and place order again
      </div>
      <nuxt-link
        to="/cart/"
        class="inline-block px-6 py-2 my-3 rounded-full primary"
        >Go to cart</nuxt-link
      >
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Heading } from '~/../shared/components'
export default {
  components: { Heading },
}
</script>
