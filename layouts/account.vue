<template>
  <div style class="bg-gray-100 antialiased">
    <div
      class="mask"
      v-if="$store.state.settings && $store.state.settings.closed"
    >
      <h1 class="text-red-500 text-xl bg-gray-900 p-8">
        {{ $store.state.settings.closedMessage }}
      </h1>
    </div>
    <Header />
    <Error />
    <div class="min-h-screen flex flex-col h-full">
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
import { Error, Header } from '~/../shared/components'
import StickyFooter from '~/components/StickyFooter'
import AccountMenu from '~/components/AccountMenu'
import { Loading, BackToTopDark } from '~/../shared/components/ui'
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
