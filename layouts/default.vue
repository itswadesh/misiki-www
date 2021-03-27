<template>
  <div style class="antialiased bg-gray-100">
    <Nav />
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
    <div class="h-full min-h-screen mx-auto">
      <nuxt class="mt-24 lg:mt-12"/>
    </div>
    <BackToTopDark />
    <CheckoutFooter />
  </div>
</template>
<script>
import { Loading, BackToTopDark } from '~/shared/components/ui'
import { Header } from '~/shared/components'
import Nav from '~/components/home/Nav'

export default {
  middleware: ['geo'],
  components: { Nav, Header, BackToTopDark, Loading },
  head() {
    return this.$nuxtI18nHead()
  },
}
</script>

<style scoped>
.closeSideBar {
  left: -100%;
  transition: 0.3s all;
}
.openSideBar {
  left: 0;
  transition: 0.3s all;
}
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}

.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.5s;
}
.layout-enter,
.layout-leave-to {
  opacity: 0;
}

.slide-bottom-enter-active,
.slide-bottom-leave-active {
  transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
}
.slide-bottom-enter,
.slide-bottom-leave-to {
  opacity: 0;
  transform: translate3d(0, 15px, 0);
}
.bounce-enter-active {
  transform-origin: top;
  animation: bounce-in 0.8s;
}
.bounce-leave-active {
  transform-origin: top;
  animation: bounce-out 0.5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(0);
  }
}
</style>
