<template>
  <div class="mt-24 bg-white lg:mt-16">
    <!-- <BackButton /> -->
    <EmptyCart v-if="!cart || !cart.qty || cart.qty == 0" />

    <div
      class="flex flex-col px-1 mx-auto mt-24 bg-white sm:mt-16 lg:px-4 lg:flex-row"
      v-else
    >
      <div class="lg:pr-6 lg:w-1/2">
        <div class="flex justify-between w-full pb-2 hr-line">
          <!-- <Offers /> -->
          <div
            class="hidden w-full mt-10 ml-4 -mr-6 text-lg font-bold lg:block"
          >
            <div class="flex flex-row flex-wrap justify-between">
              <div>
                Cart ({{ cart.qty }} Item <span v-if="cart.qty > 1">s</span>)
              </div>
              <div>
                Total
                {{
                  tweenedNumber.toFixed(0) | currency(settings.currency_symbol)
                }}
              </div>
            </div>
          </div>

          <div class="flex flex-wrap w-full p-3 bg-white lg:hidden">
            <div
              class="w-20 text-3xl font-bold text-left border-r border-gray-200 headings"
            >
              Cart
            </div>
            <span class="mx-4 text-sm text-gray-500">
              {{ cart.qty }}
              <span v-if="cart.qty > 1">items</span>
              <span v-else>item</span>
              <br />
              Total
              {{
                tweenedNumber.toFixed(0) | currency(settings.currency_symbol)
              }}
            </span>
          </div>
          <button
            @click="$router.push('/search')"
            class="flex-1 mr-2 font-bold text-left"
          >
            <svg
              class="mr-1 text-gray-600"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M5.41 11H21a1 1 0 0 1 0 2H5.41l5.3 5.3a1 1 0 0 1-1.42 1.4l-7-7a1 1 0 0 1 0-1.4l7-7a1 1 0 0 1 1.42 1.4L5.4 11z"
              />
            </svg>
          </button>
        </div>
        <CartItem v-for="(item, ix) in cart.items" :key="ix" :item="item" />
        <!-- <CartItemSkeleton /> -->
        <!-- <div class="hidden lg:block">
          <nuxt-link
            to="wishlist"
            class="flex flex-wrap justify-between w-full p-4 mt-6 mb-6 shadow"
          >
            <div>
              <fa icon="bookmark-o" class="mt-1 mr-2 " aria-hidden="true"/> Add
              More From Wishlist
            </div>
            <ChevronRightIcon class="mt-1 ml-2 " aria-hidden="true"/>
          </nuxt-link>
      </div>-->
        <!-- <CartBanners /> -->
        <div
          class="flex items-center justify-between w-full p-2 px-3 my-4 bg-gray-100 lg:mx-4"
          v-if="cart.discount"
        >
          Promo Code
          {{ cart.discount.code }}
          <button
            v-if="cart.discount.code"
            @click="removeCoupon"
            class="text-sm text-gray-500 cursor-pointer focus:outline-none hover:text-gray-600"
          >
            REMOVE
          </button>
          <nuxt-link
            to="/offers"
            v-else
            class="block text-sm text-gray-500 cursor-pointer focus:outline-none hover:text-gray-600"
            >APPLY</nuxt-link
          >
        </div>
      </div>
      <CartSummary :cart="cart" class="w-2/3 lg:w-1/2">
        <Button @click="$router.push('/checkout/address')" color="primary">
          <span v-if="!user">LOGIN TO CONTINUE</span>
          <span v-else>SELECT ADDRESS</span>
        </Button>
      </CartSummary>
      <!-- <StickyFooter /> -->
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Nav from '~/components/home/Nav'

import StickyFooter from '~/components/StickyFooter'
import EmptyCart from '~/components/cart/EmptyCart'
import CartSummary from '~/components/cart/CartSummary'
import CartBanners from '~/components/cart/CartBanners'
import CartItemSkeleton from '~/components/cart/CartItemSkeleton'
import CartItem from '~/components/cart/CartItem'
import { Button, BackButton } from '~/shared/components/ui'
import { mapGetters, mapActions } from 'vuex'
import gsap from 'gsap'

export default {
  data() {
    return {
      tweenedNumber: 0,
    }
  },
  mounted() {
    this.fetchCart()
  },
  watch: {
    'cart.total': {
      immediate: true,
      handler(val) {
        gsap.to(this.$data, {
          duration: 1,
          ease: 'circ.out',
          tweenedNumber: val,
        })
      },
      deep: true,
    },
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
    ...mapActions({
      fetchCart: 'cart/fetch',
      applyCoupon: 'cart/applyCoupon',
      removeCoupon: 'cart/removeCoupon',
    }),
    go(url) {
      this.$router.go(-1)
    },
  },
  components: {
    Nav,
    EmptyCart,
    CartSummary,
    CartBanners,
    CartItem,
    Button,
    StickyFooter,
    BackButton,
  },
}
</script>
