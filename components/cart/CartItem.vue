<template>
  <div
    class="relative flex justify-between w-full py-5 mx-1 border-b border-gray-300 lg:mx-4"
  >
    <nuxt-link class :to="`/${item.slug}`">
      <img
        class="object-cover w-32 h-24 rounded-lg shadow"
        v-lazy="item.img"
        alt
      />
    </nuxt-link>
    <div
      class="absolute top-0 right-0 flex flex-wrap justify-between text-xs text-right"
    >
      <!-- <button
        class="p-1 mr-1 rounded focus:outline-none text-primary"
        @click="saveForLater(item)"
      >MOVE TO WISHLIST</button>-->
      <button
        class="pt-3 pr-1 text-gray-600 rounded"
        @click="checkAndAddToCart({ pid: item.pid, qty: -10000 })"
        :disabled="loading"
      >
        <img
          v-lazy="`/loading.svg`"
          class="w-3 h-3 rotateOutDownLeft"
          v-if="loading"
          alt
        />
        <svg
          class="transition-all ease-out transition-medium"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
          />
        </svg>
      </button>
    </div>
    <div class="relative w-full pl-4 lg:w-4/5">
      <nuxt-link class="mb-2 text-black" :to="`/${item.slug}`">
        {{ item.name }}
      </nuxt-link>
      <div class="flex" v-if="item.stock < 5">{{ item.stock }} left</div>
      <div class="absolute bottom-0 flex items-center justify-between w-full pr-5">
        <div class="text-2xl font-black">
          {{ item.price | currency(settings.currency_symbol) }}
        </div>
        <CartButtons :product="item" :notify="false" />
        <!-- <div
            class="ml-2 text-xs text-gray-400 line-through lg:text-sm"
            v-if="calculateOffPercent(item.mrp, item.price)>0"
          >{{item.mrp | currency(settings.currency_symbol)}}</div>
          <div
            class="ml-2 text-xs text-green-400 lg:text-sm"
            v-if="calculateOffPercent(item.mrp, item.price)>0"
        >{{calculateOffPercent(item.mrp, item.price)}}% off</div>-->
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
const CartButtons = () => import('./CartButtons')

export default {
  props: {
    item: { type: Object },
  },
  data() {
    return {
      loading: false,
    }
  },
  components: { CartButtons },
  computed: { ...mapGetters({ settings: 'settings' }) },
  methods: {
    ...mapActions({
      addToCart: 'cart/addToCart',
    }),
    async saveForLater(item) {
      this.checkAndAddToCart({
        pid: item._id,
        qty: -100000,
      })
      if (!(this.$store.state.auth || {}).user) {
        this.$router.push('/login?return=checkout')
        return
      } else {
        this.saveToWishlist(item)
      }
    },
    async saveToWishlist(item) {
      try {
        this.$store.commit('clearErr')
        this.loading = true
        let data = (
          await this.$apollo.mutate({
            mutation: addToWishlist,
            variables: item,
          })
        ).data.addToWishlist
        this.$store.commit('success', 'Added to your wishlist')
      } catch (err) {
        this.$store.commit('setErr', err)
      } finally {
        this.loading = false
      }
    },
    async checkAndAddToCart(item) {
      try {
        await this.addToCart(item)
      } catch (e) {}
    },
    calculateOffPercent(mrp, price) {
      let percent = ((mrp - price) * 100) / mrp
      return Math.round(percent)
    },
  },
}
</script>

<style scoped></style>
