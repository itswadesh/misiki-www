<template>
  <div class="bg-gray-100 antialiased min-h-screen pb-20">
    <div
      class="mask"
      v-if="$store.state.settings && $store.state.settings.closed"
    >
      <h1 class="text-red-500 text-xl bg-gray-900 p-8">
        {{ $store.state.settings.closedMessage }}
      </h1>
    </div>
    <!-- <Loading /> -->
    <Search class />
    <div class="mt-16">
      <nuxt />
    </div>
    <StickyFooter />
    <BackToTopDark />
  </div>
</template>
<script>
import Vue from 'vue'
import { Loading, BackToTopDark } from '~/shared/components/ui'
import { Error, Search } from '~/shared/components'
import StickyFooter from '~/components/StickyFooter'
export default {
  components: { Error, Search, StickyFooter, BackToTopDark, Loading },
  middleware: ['geo'],
  // created() {
  //   this.a = this.$cookies.get('geo')
  //   if (!this.a) {
  //     this.$router.push('/change-location')
  //     return
  //   }
  // }
}
</script>
