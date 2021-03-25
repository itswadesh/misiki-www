<template>
  <div class="flex flex-wrap w-full p-3 mb-2 border-t border-gray-300">
    <div class="right-0 flex flex-wrap w-3/4">
      <nuxt-link
        to="/legal/privacy-policy"
        class="mr-4 lg:mr-2 hover:text-gray-500"
        >Privacy Policy</nuxt-link
      >
      <nuxt-link to="/legal/terms" class="mr-4 lg:mr-2 hover:text-gray-500"
        >Terms</nuxt-link
      >
      <nuxt-link
        to="/legal/refund-policy"
        class="mr-4 lg:mr-2 hover:text-gray-500"
        >Refund Policy</nuxt-link
      >
      <nuxt-link to="/legal/about-us" class="mr-4 lg:mr-2 hover:text-gray-500"
        >About Us</nuxt-link
      >
    </div>
    <nuxt-link
      to="/legal/contact-us"
      class="w-1/4 text-sm font-bold text-center text-gray-700"
    >
      Need Help? Contact Us
    </nuxt-link>
    <geo-location />
  </div>
</template>

<script>
import { GeoLocation } from '~/shared/components/'
export default {
  components: { GeoLocation },
}
</script>

<style scoped></style>
