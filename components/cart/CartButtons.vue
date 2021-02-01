<template>
  <div>
    <ApolloQuery :query="require('~/gql/settings/shutter.gql')">
      <template v-slot="{ result: { error, data }, isLoading }">
        <div v-if="isLoading">Loading........</div>
        <div v-else-if="error" class="mask">
          <span class="text-red-500">
            {{
              error.graphQLErrors &&
              error.graphQLErrors[0] &&
              error.graphQLErrors[0].message
            }}
          </span>
        </div>
        <div class="flex" v-else-if="product">
          <div v-if="product.stock < 1" class="flex items-center text-red-500">
            Out of stock
          </div>
          <div v-else-if="!checkCart({ pid: product.pid || product.id })">
            <button
              class="w-8 h-8 rounded-full primary"
              :disabled="product.stock < 1 || loading"
              @click="addToBag({ pid: product.pid || product.id, qty: 1 })"
            >
              <svg
                class="m-auto transition-all ease-out align-middl transition-medium"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  class="heroicon-ui"
                  d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"
                />
              </svg>
            </button>
          </div>
          <div v-else>
            <div class="flex flex-wrap">
              <button
                class="w-8 h-8 rounded-full muted"
                @click="addToBag({ pid: product.pid || product.id, qty: -1 })"
              >
                <svg
                  class="m-auto align-middle transition-all ease-out transition-medium"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17 11a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2h10z" />
                </svg>
              </button>
              <div class="flex items-center px-2 text-center">
                <div v-if="!loading">
                  {{ getItemQty({ pid: product.pid || product.id }) }}
                </div>
                <img
                  alt="..."
                  class="w-3 h-4 align-middle"
                  v-lazy="`/loading.svg`"
                  v-else
                />
              </div>
              <button
                class="w-8 h-8 rounded-full primary"
                :disabled="product.stock < 1 || loading"
                @click="addToBag({ pid: product.pid || product.id, qty: 1 })"
              >
                <svg
                  class="m-auto transition-all ease-out align-middl transition-medium"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    class="heroicon-ui"
                    d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  props: { product: Object, variant: Object, notify: Boolean },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    ...mapActions({ addToCart: 'cart/addToCart' }),
    async addToBag(obj) {
      try {
        await this.addToCart(obj)
        // if (!!this.notify && obj.qty > 0) this.toast()
      } catch (e) {}
    },
    toast() {
      this.$toast
        .show(
          `
      <div class="flex w-full">
        <img class="object-cover w-12 h-12" src="${
          this.product && this.product.img
        }" alt="" />
        <div class="items-center toasted-text">
          <div>${
            this.product.name && this.product.name.substr(0, 40) + '...'
          }</div>
          <div class="text-xs text-gray-600">Added to your cart</div>
        </div>
      </div>
      `,
          {
            containerClass: 'sw-toast-container',
            theme: 'outline',
            position: 'top-right',
            singleton: false,
            action: {
              text: 'View Cart',
              onClick: (e, toastObject) => {
                this.$router.push('/cart')
                toastObject.goAway(0)
              },
            },
          }
        )
        .goAway(5000)
    },
    setErr(e) {
      this.$store.commit('setErr', e)
    },
  },
  computed: {
    ...mapGetters({
      cart: 'cart/cart',
      checkCart: 'cart/checkCart',
      getItemQty: 'cart/getItemQty',
    }),
  },
}
</script>
<style scoped>
/* .cart-button {
  border: 1px solid transparent;
  color: #32325d;
  cursor: pointer;
  justify-content: center;
  text-align: center;
  white-space: nowrap;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.23);
}  */

/** Hover Tooltip Css ***/
/* .tooltip {
  position: relative;
  display: inline-block;
}
.tooltip .tooltiptext {
  visibility: hidden;
  width: 82px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 3px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  margin-bottom: 7px;
  margin-left: -38px;
}
.tooltip:hover .tooltiptext {
  visibility: visible;
}
.tooltip .tooltiptext {
  opacity: 0;
  transition: opacity 0.5s;
}
.tooltip:hover .tooltiptext {
  opacity: 1;
}
.tooltip .tooltiptext::after {
  content: ' ';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
} */
/** End Hover Tooltip Css ***/
</style>
