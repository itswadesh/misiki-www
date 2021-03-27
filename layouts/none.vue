<template>
  <div class="min-h-screen antialiased">
    <div
      class="mask"
      v-if="$store.state.settings && $store.state.settings.closed"
    >
      <h1 class="p-8 text-xl text-red-500 bg-gray-900">
        {{ $store.state.settings.closedMessage }}
      </h1>
    </div>
    <!-- <Loading /> -->
    <!-- <ErrComponent /> -->
    <nuxt />
  </div>
</template>

<script>
import Vue from 'vue'
import { Loading } from '~/shared/components/ui'
// import { ErrComponent } from '~/shared/components/ui'

export default {
  components: { Loading },
  head() {
    return this.$nuxtI18nHead()
  },
}
</script>
