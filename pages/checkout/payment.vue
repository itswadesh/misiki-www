<template>
  <div>
    <Nav />
    <CheckoutHeader class="mt-24 sm:mt-16" />
    <div class="flex flex-wrap justify-between">
      <div class="lg:w-16 xs:w-0"></div>
      <div class="px-2 mt-10 xs:w-full lg:w-2/4">
        <!-- <Offers /> -->
        <div
          class="flex flex-wrap w-full p-3 mt-3 text-lg font-bold text-gray-700 bg-white"
        >
          <div class="w-1/2 text-left">
            My Shopping Bag ({{ cart.qty }} Items)
          </div>
          <div class="w-1/2 text-right">
            Total {{ cart.total | currency(settings.currency_symbol) }}
          </div>
        </div>
        <CartItem v-for="item in cart.items" :key="item._id" :item="item" />
        <div class="hidden lg:block">
          <nuxt-link
            to="wishlist"
            class="flex flex-wrap w-full p-4 mt-6 mb-6 shadow"
          >
            <ArrowRightIcon class="mt-1 mr-2" aria-hidden="true" />
            Add More From Wishlist
            <HeartIcon class="mt-1 ml-2" aria-hidden="true" />
          </nuxt-link>
        </div>
      </div>
      <div class="border-r border-gray-300"></div>
      <CartSummary :cart="cart">
        <button
          @click="placeOrder()"
          class="w-full p-3 mt-3 text-sm font-semibold tracking-widest text-white bg-red-600 rounded"
        >
          CONFIRM ORDER
        </button>
      </CartSummary>

      <div class="w-8"></div>
    </div>
    <CheckoutFooter />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import Nav from '~/components/home/Nav'

const CartItem = () => import('~/components/cart/CartItem')
const Offers = () => import('~/components/cart/Offers')
const CartSummary = () => import('~/components/cart/CartSummary')
const CheckoutHeader = () => import('~/components/checkout/CheckoutHeader')
const CheckoutFooter = () => import('~/components/checkout/CheckoutFooter')
import { ArrowRightIcon, HeartIcon } from 'vue-feather-icons'

export default {
  components: {
    CartItem,
    Nav,
    Offers,
    CartSummary,
    CheckoutHeader,
    CheckoutFooter,
    ArrowRightIcon,
    HeartIcon,
  },
  computed: {
    ...mapGetters({
      settings: 'settings',
      user: 'auth/user',
      cart: 'cart/cart',
      checkCart: 'cart/checkCart',
      showCart: 'cart/showCart',
    }),
  },
  methods: {
    placeOrder() {},
  },
}
</script>

<style scoped>
.hr-line {
  border-bottom: 1px solid lightgray;
}
.fa-truck {
  transform: scaleX(-1);
}
.bb {
  border-bottom: 1px dashed lightgray;
}
.fa-truck,
.fa-undo,
.fa-shield {
  font-size: 1.5rem;
}
</style>
