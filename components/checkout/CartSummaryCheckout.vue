<template>
  <div class="w-full mt-4 mb-24">
    <div class="p-2 leading-relaxed bg-yellow-100">
      <h3 class="text-lg font-semibold text-black">Price Details</h3>
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
          {{ cart.tax.cgst | currency(settings.currency_symbol, 2) }} +
          {{ cart.tax.sgst | currency(settings.currency_symbol, 2) }}
        </div>
      </div>
    </div>
    <div
      class="fixed bottom-0 left-0 w-full pb-2 bg-white lg:relative "
    >
      <div class="flex justify-between px-2 my-2 lg:px-0">
        <div class="text-lg font-bold text-left">Grand Total</div>
        <div class="text-lg font-bold text-right text-black">
          {{ cart.total | currency(settings.currency_symbol) }}
        </div>
      </div>
      <Button @click="proceed" color="primary">CONTINUE</Button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Button } from '~/shared/components/ui'
export default {
  props: {
    selectedAddress: { type: String },
  },
  computed: {
    ...mapGetters({ cart: 'cart/cart', settings: 'settings' }),
  },
  components: {
    Button,
  },
  methods: {
    proceed() {
      if (!this.selectedAddress) {
        this.$router.push(`/checkout/add`)
        return
      }
      this.$router.push(
        `/checkout/payment-mobile?address=${this.selectedAddress}`
      )
    },
  },
}
</script>

<style scoped></style>
