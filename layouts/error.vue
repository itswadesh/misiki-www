<template>
  <div
    class="flex flex-col justify-center items-center text-lg antialiased min-h-screen pb-20"
  >
    <div
      class="mask"
      v-if="$store.state.settings && $store.state.settings.closed"
    >
      <h1 class="text-red-500 text-xl bg-gray-900 p-8">
        {{ $store.state.settings.closedMessage }}
      </h1>
    </div>
    <!-- <Loading /> -->
    <Error />
    <h1 v-if="error.statusCode === 404">Not found</h1>
    <pre v-else>{{ error }}</pre>
    &nbsp;
    <nuxt-link to="/" class="primary text-2xl px-4 rounded"
      >Home page</nuxt-link
    >
  </div>
</template>

<script>
import Vue from 'vue'
import { Loading } from '~/shared/components/ui'
import { Error } from '~/shared/components'
export default {
  props: ['error'],
  components: { Error, Loading },
}
</script>
