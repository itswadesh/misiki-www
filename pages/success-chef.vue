<template>
  <div>
    <Heading title="Success" />
    <h1 class="px-4 py-2 text-center text-red-500 bg-yellow-200">
      Thank you for joining as chef
    </h1>
    <div class="p-8 text-center text-secondary">
      We will get back to you within 24hrs
    </div>
    <div class="flex justify-center">
      <nuxt-link to="/search/" class="px-4 py-2 text-center rounded primary">
        <SearchIcon class="mr-1" />Continue Exploring
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Heading } from '~/shared/components'
import { SearchIcon } from 'vue-feather-icons'
export default {
  components: { Heading, SearchIcon },
}
</script>

<style scoped></style>
