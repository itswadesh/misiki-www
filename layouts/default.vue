<template>
  <div style class="antialiased bg-gray-100">
    <div
      class="mask"
      v-if="$store.state.settings && $store.state.settings.closed"
    >
      <h1 class="p-8 text-xl text-red-500 bg-gray-900">
        {{ $store.state.settings.closedMessage }}
      </h1>
    </div>
    <!-- <Loading /> -->
    <!-- <ErrComponent/> -->
    <div class="flex flex-col h-full min-h-screen">
      <nuxt />
    </div>
    <BackToTopDark />
  </div>
</template>
<script>
import Vue from 'vue'
import { Loading, BackToTopDark } from '~/shared/components/ui'
import { Header } from '~/shared/components'

export default {
  middleware: ['geo'],
  components: { Header, BackToTopDark, Loading },
}
</script>
