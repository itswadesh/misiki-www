<template>
  <div class="h-full text-center">
    <img class="object-cover w-full h-84" v-lazy="'/onboarding.png'" alt />
    <h1 class="mx-6 mt-6 text-2xl font-bold leading-tight">
      Order from cloud kitchens near you
    </h1>
    <div class="text-gray-600">Ready to see top chefs to order?</div>
    <nuxt-link
      to="/change-location"
      class="inline-block px-6 py-3 mt-4 uppercase rounded shadow-lg primary"
      >SETUP YOUR LOCATION</nuxt-link
    >
  </div>
</template>

<script scoped>
export default {
  layout: 'none',
}
</script>

<style scoped>
.h-50 {
  height: 50%;
}
</style>
