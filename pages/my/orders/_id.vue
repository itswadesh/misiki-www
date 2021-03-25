<template>
  <div class="text-center bg-gray-100">
    <Nav />
    <!-- <Heading title="Order Details" /> -->
    <!-- <div class="flex items-center justify-start mx-2">
      <nuxt-link to="/my/orders" class="absolute flex-1 font-bold text-left">
        <svg class="mr-1 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M5.41 11H21a1 1 0 0 1 0 2H5.41l5.3 5.3a1 1 0 0 1-1.42 1.4l-7-7a1 1 0 0 1 0-1.4l7-7a1 1 0 0 1 1.42 1.4L5.4 11z"
          />
        </svg>
      </nuxt-link>
      <h1 class="flex-1 p-2 text-xl font-semibold text-center bg-white">
        Order
      </h1>
    </div>-->
    <ApolloQuery
      :query="require('~/gql/order/order.gql')"
      :variables="{ id: $route.params.id }"
      :update="(data) => data.order"
      fetchPolicy="no-cache"
    >
      <template v-slot="{ result: { error, data }, isLoading }">
        <div v-if="isLoading">Loading........</div>
        <ErrComponent v-else-if="error" :error="error" />
        <div class="flex flex-col pt-2 text-center" v-else-if="data">
          <div
            class="w-full py-5 text-sm tracking-widest text-center text-black bg-white"
          >
            <p class="font-semibold">Order {{ data.orderNo }}</p>
            <Span class="flex flex-wrap justify-center text-xs text-gray-600">
              Placed on {{ data.createdAt | date }}
              <li class="ml-2 list-disc">
                {{ data.amount.total | currency(settings.currency_symbol) }} for
                1 item
              </li>
            </Span>
          </div>
          <!-- <p
        v-if="data.payment.method == 'COD'"
        class="p-1 text-center text-white bg-green-500 rounded"
      >
          </p>-->
          <div
            class="mx-2 my-4 text-sm font-semibold text-gray-700 bg-white border border-green-500 rounded shadow-lg text-black-400"
          >
            <div class="flex flex-col justify-between mt-1 text-xs">
              <div class="flex items-center justify-between px-4">
                <span class="text-xs text-semibold">PAYMENT MODE</span>
                <span class="text-2xl">{{
                  data.payment.method || 'online'
                }}</span>
              </div>
              <div class="flex items-center justify-between px-4">
                Status:
                <span
                  v-if="data.payment.status == 'captured'"
                  class="text-green-500"
                  >Success :)</span
                >
                <span v-else class="text-red-500">Failed!!!</span>
              </div>
              <div class="flex items-center justify-between px-4">
                Amount:
                <span class="text-2xl">
                  {{ data.amount.total | currency(settings.currency_symbol) }}
                </span>
              </div>
            </div>
          </div>
          <div class="py-4 mx-2 leading-tight text-center text-white rounded">
            <div
              v-if="data.payment.method == 'COD'"
              class="px-4 bg-blue-500 rounded shadow-lg"
            >
              Payment method selected was COD during the order. Please pay
              <span class="text-2xl">
                {{ data.amount.total | currency(settings.currency_symbol) }}
              </span>
              to the delivery agent
            </div>
            <div
              v-else-if="data.payment.amount_due > 0"
              class="px-4 rounded shadow-lg primary"
            >
              Online payment was failed. Please pay
              <span class="text-2xl">
                {{
                  (data.payment.amount_due / 100)
                    | currency(settings.currency_symbol)
                }}
              </span>
              to the delivery agent.
            </div>
            <div v-else class="px-4 bg-red-500 rounded shadow-lg">
              Online payment was failed. Please pay
              <span class="text-2xl">
                {{ data.amount.total | currency(settings.currency_symbol) }}
              </span>
              to the delivery agent
            </div>
          </div>
          <div class="m-3 border rounded shadow">
            <div class="px-3 py-2 bg-white">
              <div class="font-bold text-left">
                {{ data.address.firstName }} {{ data.address.lastName }}
              </div>
              <div class="flex">
                <img v-lazy="`img/contact-us.svg`" class="w-4 h-4 my-1 mr-1" />
                <div class="text-sm font-medium text-left text-gray-500">
                  {{ data.address.address }}, {{ data.address.city }},
                  {{ data.address.state }} -
                  {{ data.address.zip }}
                </div>
                <!-- <div
              class="px-4 py-1 mx-3 text-xs font-semibold text-center text-white bg-orange-600 rounded-full"
            >
              free Delivery
                </div>-->
              </div>
            </div>
            <hr />
            <nuxt-link
              :to="'/' + i.slug"
              class="flex py-2 bg-white border-b"
              v-for="i in data.items"
              :key="i._id"
            >
              <img v-lazy="i.img" class="w-12 h-12 m-2" />
              <div class="flex flex-col p-2 text-left">
                <div class="font-bold">{{ i.name }}</div>
                <div class="flex justify-between">
                  <nuxt-link
                    :to="`/restaurant/${i.vendor_id}`"
                    class="mr-2 text-sm text-gray-500"
                    >{{ i.vendor_name }}</nuxt-link
                  >
                  <div class="text-sm font-semibold text-gray-800">
                    {{ i.price | currency(settings.currency_symbol) }} *
                    {{ i.qty }}
                  </div>
                </div>
              </div>
            </nuxt-link>
            <nuxt-link
              to="/search/"
              class="block p-2 text-sm font-semibold text-left text-red-600 bg-white border-b rounded"
              >Add more items +</nuxt-link
            >
          </div>
          <div class="p-3 text-base bg-white">
            <div class="price-breakup">
              <div>Subtotal</div>
              <div>
                {{ data.amount.subtotal | currency(settings.currency_symbol) }}
              </div>
            </div>
            <div class="price-breakup">
              <div>Tax & fees</div>
              <div>
                {{ data.amount.tax.cgst | currency(settings.currency_symbol) }}
                +
                {{ data.amount.tax.sgst | currency(settings.currency_symbol) }}
              </div>
            </div>
            <div class="price-breakup" v-if="data.amount.discount">
              <div>Discount</div>
              <div>
                {{ data.amount.discount | currency(settings.currency_symbol) }}
              </div>
            </div>
            <div class="price-breakup">
              <div>Delivery</div>
              <div>
                {{ data.amount.shipping | currency(settings.currency_symbol) }}
              </div>
            </div>
            <hr />
            <div class="flex items-center justify-between text-lg font-bold">
              <div>Total</div>
              <div>
                {{ data.amount.total | currency(settings.currency_symbol) }}
              </div>
            </div>
          </div>

          <div>
            <!-- <HereMap ref="map" lat="18.732447" lng="82.829516" width="100" height="300px" /> -->
          </div>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Nav from '~/components/home/Nav'

import Vue from 'vue'
import { HereMap } from '~/shared/components'
// import order from '~/gql/order/order.gql'
import { Heading } from '~/shared/components'

export default {
  middleware: ['isAuth'],
  computed: { ...mapGetters({ settings: 'settings' }) },
  data() {
    return {
      order: null,
    }
  },
  // async created() {
  // try {
  //   const id = this.$route.params.id
  //   this.$store.commit('clearErr')
  //   this.order = (
  //     await this.$apollo.query({
  //       query: order,
  //       variables: { id }
  //       // fetchPolicy: 'no-cache'
  //     })
  //   ).data.order
  // } catch (e) {
  //   this.$store.commit('setErr', e)
  // } finally {
  //   this.$store.commit('busy', false)
  // }
  // },
  mounted() {
    // this.$refs.map.route('18.732447,82.829516', '18.708187,82.852198')
  },
  components: {
    HereMap,
    Heading,
    Nav
  },
}
</script>
