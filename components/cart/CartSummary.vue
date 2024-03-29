<template>
  <div class="container w-full px-4 pb-6 mx-auto">
    <div class="border-t">
      <div class="px-4 my-4 lg:px-0">
        <p class="text-xl font-normal text-black lg:my-8">Price Summary</p>
        <span class="text-xs text-gray-400"
          >Includes GST and all government taxes</span
        >
        <div class="flex justify-between mt-1">
          <div class="w-1/2 text-sm text-left">Total item price</div>
          <div class="w-1/2 ml-2 text-right text-black-400">
            {{ cart.subtotal | currency(settings.currency_symbol) }}
          </div>
        </div>
        <div class="flex justify-between mt-1" v-if="cart.discount.amount > 0">
          <div class="w-1/2 text-sm text-left">Item discount</div>
          <div class="w-1/2 ml-2 text-right text-black-400">
            {{ cart.discount.amount | currency(settings.currency_symbol) }}
          </div>
        </div>
        <div class="flex justify-between mt-1" v-if="cart.shipping">
          <div class="w-1/2 text-sm text-left">Shipping fee</div>
          <div
            class="w-1/2 ml-2 text-right text-black-400"
            v-if="cart.shipping.charge > 0"
          >
            {{ cart.shipping.charge | currency(settings.currency_symbol) }}
          </div>
          <div class="w-1/2 ml-2 text-right text-black-400" v-else>FREE</div>
        </div>
        <div
          class="flex justify-between mt-1"
          v-if="cart.tax && cart.tax.cgst + cart.tax.sgst + cart.tax.igst > 0"
        >
          <div class="w-1/2 text-sm text-left">Tax (CGST + SGST)</div>
          <div class="w-1/2 ml-2 text-xs text-right text-black-400">
            {{ cart.tax.cgst | currency(settings.currency_symbol, 2) }}
            +
            {{ cart.tax.sgst | currency(settings.currency_symbol, 2) }}
          </div>
        </div>
        <div class="mt-1">
          <p class="pb-2 text-xs text-gray-400">
            Free shipping on orders of ₹999 or more. For first purchase,
            <nuxt-link to="/offers" class="underline">See Offer</nuxt-link>
          </p>
        </div>
        <div class="p-2 mb-32 text-xs text-gray-500 bg-red-100 rounded lg:my-8">
          <div class="flex items-center">
            <ShieldIcon size="5x" />
            <div class="ml-1 justify">
              Fresh & Genuine products. Same day delivery.
              <span class="text-black">100% secure payments.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="fixed bottom-0 right-0 w-full px-2 py-4 bg-white shadow lg:relative lg:px-0 lg:py-0 lg:shadow-none"
    >
      <div class="container flex justify-between w-full px-3 mx-auto md:w-2/3 lg:w-full">
        <div class="w-1/2 text-lg font-bold text-left">Total</div>
        <div class="w-1/2 ml-2 font-bold text-right text-black-400">
          {{ cart.total | currency(settings.currency_symbol) }}
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { ShieldIcon } from 'vue-feather-icons'
import { mapGetters } from 'vuex'
export default {
  components: { ShieldIcon },
  props: {
    cart: { type: Object },
  },
  computed: {
    ...mapGetters({ settings: 'settings' }),
  },
}
</script>

<style scoped>
.bill-details::after {
  content: ' ';
  background: linear-gradient(-45deg, #f7fafc 7px, transparent 0),
    linear-gradient(45deg, #f7fafc 7px, transparent 0);
  background-position: left bottom;
  background-repeat: repeat-x;
  background-size: 12px 14px;
  display: block;
  left: 0;
  width: 100%;
  height: 14px;
  bottom: 0;
}
</style>
