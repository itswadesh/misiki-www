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
    <Header />
    <Error />
    <div class="flex flex-col h-full min-h-screen">
      <!-- <Loading /> -->
      <AccountMenu class="hidden md:block" />
      <nuxt />
    </div>
    <BackToTopDark />
    <StickyFooter />
  </div>
</template>

<script>
import Vue from 'vue'
import { Error, Header } from '~/shared/components'
import StickyFooter from '~/components/StickyFooter'
import AccountMenu from '~/components/AccountMenu'
import { Loading, BackToTopDark } from '~/shared/components/ui'
export default {
  components: {
    Error,
    BackToTopDark,
    Header,
    StickyFooter,
    AccountMenu,
    Loading,
  },
  middleware: ['geo'],
}
</script>
