<template>
  <div class>
    <Heading title="My Orders" />
    <!-- <div class="flex items-center justify-start">
      <nuxt-link to="/my" class="absolute flex-1 font-bold text-left">
        <svg
          class="w-6 h-6 transition-all ease-out transition-medium"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M5.41 11H21a1 1 0 0 1 0 2H5.41l5.3 5.3a1 1 0 0 1-1.42 1.4l-7-7a1 1 0 0 1 0-1.4l7-7a1 1 0 0 1 1.42 1.4L5.4 11z"
          />
        </svg>
      </nuxt-link>
      <h1 class="flex-1 p-2 text-xl font-semibold text-center">
        Orders
      </h1>
    </div>-->
    <ApolloQuery
      :query="require('~/gql/order/myOrders.gql')"
      :variables="{ id: $route.query.id }"
    >
      <template v-slot="{ result: { error, data }, isLoading }">
        <ListCardSkeleton v-if="isLoading">Loading........</ListCardSkeleton>
        <ErrComponent v-else-if="error" :error="error" />
        <div v-else-if="data && data.myOrders">
          <nuxt-link
            class="block pb-3 mx-2 my-4 bg-white rounded shadow-lg hover:shadow-xl"
            :to="`/my/orders/${o.id}`"
            v-for="o in data.myOrders.data"
            :key="o.id"
          >
            <div class="p-3 rounded">
              <div class="flex items-center justify-between">
                <h1 class="text-sm text-primary">Order # {{ o.orderNo }}</h1>
                <span class="text-xs text-gray-800">
                  {{ o.createdAt | date }}
                </span>
              </div>
              <div class="flex items-center justify-between">
                <div class="px-2 border rounded">{{ o.items[0].status }}</div>
                <nuxt-link
                  v-if="
                    o.items[0].status != 'Delivered' &&
                    o.items[0].status != 'Payment pending' &&
                    o.items[0].status != 'NIS' &&
                    o.items[0].status != 'Cancelled'
                  "
                  class="inline-block px-2 my-2 border rounded text-secondary"
                  :to="`/my/orders/${o.id}`"
                >
                  <span class="mr-4">Track Order</span>
                  <span class="w-4 h-4 pulse green"></span>
                </nuxt-link>
              </div>
              <!-- <div>
                Total:
                
              </div>-->
            </div>
            <!-- <hr /> -->
            <div
              v-for="(i, ix) in o.items"
              :key="i._id"
              class="flex flex-wrap justify-between p-3"
              :class="{ 'border-t': ix != 0 }"
            >
              <div class="flex items-center">
                <div>
                  <img v-lazy="i.img" class="w-12 h-12 mr-2 rounded-full" alt />
                </div>
                <div>
                  <div class="text-sm text-black">{{ i.name }}</div>
                  <div class="text-xs text-gray-800">
                    {{ i.qty }} *
                    {{ i.price | currency(settings.currency_symbol) }} =
                    {{ (i.qty * i.price) | currency(settings.currency_symbol) }}
                  </div>
                </div>
              </div>
              <!-- <div class="p-2 ml-3 shadow">
          <img
            v-lazy="i.img"
            class="w-12 h-12"
            alt="cart"
          />
              </div>-->
            </div>
            <hr />
            <div class="flex justify-between mx-4 mt-4 font-bold">
              <div>Total:</div>
              <div>
                {{ o.amount.total | currency(settings.currency_symbol) }}
              </div>
            </div>
          </nuxt-link>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ListCardSkeleton } from '~/shared/components'
import { Heading } from '~/shared/components'

// import Vue from 'vue'
// import orders from '~/gql/order/orders.gql'
export default {
  components: { ListCardSkeleton, Heading },
  layout: 'account',
  middleware: ['isAuth'],
  data() {
    return {
      // orders: []
    }
  },
  computed: { ...mapGetters({ settings: 'settings' }) },
  // async created() {
  //   try {
  //     this.$store.commit('clearErr')
  //     this.$store.commit('busy', true)
  //     this.orders = (
  //       await this.$apollo.query({
  //         query: orders
  //         // fetchPolicy: 'no-cache'
  //       })
  //     ).data.orders
  //   } catch (e) {
  //     this.$store.commit('setErr', e)
  //   } finally {
  //     this.$store.commit('busy', false)
  //   }
  // }
}
</script>
<style scoped>
.pulse {
  background: black;
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
  transform: scale(1);
  animation: pulse-black 2s infinite;
}

@keyframes pulse-black {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
}

.pulse.white {
  background: white;
  box-shadow: 0 0 0 0 rgba(255, 255, 255, 1);
  animation: pulse-white 2s infinite;
}

@keyframes pulse-white {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
}

.pulse.red {
  background: rgba(255, 82, 82, 1);
  box-shadow: 0 0 0 0 rgba(255, 82, 82, 1);
  animation: pulse-red 2s infinite;
}

@keyframes pulse-red {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(255, 82, 82, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
  }
}

.pulse.orange {
  background: rgba(255, 121, 63, 1);
  box-shadow: 0 0 0 0 rgba(255, 121, 63, 1);
  animation: pulse-orange 2s infinite;
}

@keyframes pulse-orange {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 121, 63, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(255, 121, 63, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 121, 63, 0);
  }
}

.pulse.yellow {
  background: rgba(255, 177, 66, 1);
  box-shadow: 0 0 0 0 rgba(255, 177, 66, 1);
  animation: pulse-yellow 2s infinite;
}

@keyframes pulse-yellow {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 177, 66, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(255, 177, 66, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 177, 66, 0);
  }
}

.pulse.blue {
  background: rgba(52, 172, 224, 1);
  box-shadow: 0 0 0 0 rgba(52, 172, 224, 1);
  animation: pulse-blue 2s infinite;
}

@keyframes pulse-blue {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(52, 172, 224, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(52, 172, 224, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(52, 172, 224, 0);
  }
}

.pulse.green {
  background: rgba(51, 217, 178, 1);
  box-shadow: 0 0 0 0 rgba(51, 217, 178, 1);
  animation: pulse-green 2s infinite;
}

@keyframes pulse-green {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(51, 217, 178, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(51, 217, 178, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(51, 217, 178, 0);
  }
}

.pulse.purple {
  background: rgba(142, 68, 173, 1);
  box-shadow: 0 0 0 0 rgba(142, 68, 173, 1);
  animation: pulse-purple 2s infinite;
}

@keyframes pulse-purple {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(142, 68, 173, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(142, 68, 173, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(142, 68, 173, 0);
  }
}
</style>
