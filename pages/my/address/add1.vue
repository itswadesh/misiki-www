<template>
  <div>
    <!-- <CheckoutHeader /> -->
    <div class="w-full pb-4 m-auto lg:w-1/3">
      <div>
        <div
          class="flex items-center justify-between p-3 shadow lg:shadow-none"
        >
          <nuxt-link class="flex items-center" to="/my/address">
            <svg class="mb-1" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M5.41 11H21a1 1 0 0 1 0 2H5.41l5.3 5.3a1 1 0 0 1-1.42 1.4l-7-7a1 1 0 0 1 0-1.4l7-7a1 1 0 0 1 1.42 1.4L5.4 11z"
              />
            </svg>
            <div class="ml-3 text-xl font-bold text-gray-700">Add address</div>
          </nuxt-link>
          <div class="text-xs text-gray-600">Step 2 of 3</div>
        </div>
      </div>
      <form
        class="w-full mb-1 lg:mx-15 form"
        novalidate
        autocomplete="off"
        @submit.stop.prevent="submit(a)"
      >
        <div class="p-2">
          <Textbox
            label="First Name"
            class="w-full mb-4"
            name="firstName"
            v-model="a.firstName"
          />
          <Textbox
            label="Last Name"
            class="w-full mb-4"
            name="lastName"
            v-model="a.lastName"
          />
          <Textbox
            type="tel"
            label="Pin Code"
            class="w-full mb-4"
            name="name"
            v-model="a.zip"
          />
          <Textbox
            label="Address"
            class="w-full mb-4"
            name="name"
            v-model="a.address"
          />
          <Textbox
            label="Landmark"
            class="w-full mb-4"
            name="name"
            v-model="a.landmark"
          />

          <div class="flex justify-between w-full mb-4">
            <Textbox
              label="City"
              class="w-1/2 mr-1"
              name="name"
              v-model="a.city"
            />
            <Textbox
              label="State"
              class="w-1/2 ml-1"
              name="name"
              v-model="a.state"
            />
          </div>
          <Textbox
            type="tel"
            label="Phone"
            class="w-full mb-4"
            name="name"
            v-model="a.phone"
          />
        </div>
        <div
          class="fixed bottom-0 flex justify-between w-full shadow lg:shadow-none lg:w-1/3"
        >
          <button
            type="button"
            @click="$router.push('/checkout/address')"
            class="w-1/2 p-3 text-sm font-semibold tracking-widest text-black bg-white"
          >
            CANCEL
          </button>
          <button
            type="submit"
            class="w-1/2 p-3 text-sm font-semibold tracking-widest primary"
          >
            CONTINUE
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Textbox } from '~/shared/components/ui'
const CheckoutHeader = () => import('~/components/checkout/CheckoutHeader')
import address from '~/gql/user/address.gql'
export default {
  middleware: ['isAuth'],
  data() {
    return {
      a: {},
    }
  },
  components: {
    CheckoutHeader,
    Textbox,
  },
  async created() {
    try {
      this.$store.commit('clearErr')
      this.address = (
        await this.$apollo.query({
          query: address,
          // fetchPolicy: 'no-cache'
        })
      ).data.address
    } catch (e) {
      this.$store.commit('setErr', e)
    } finally {
      this.$store.commit('busy', false)
    }
  },
  methods: {
    go(url) {
      this.$router.push(url)
    },
    async submit(address) {
      this.$store.commit('busy', true)
      try {
        if (address._id)
          await this.$axios.$put('api/addresses/' + address._id, address)
        else await this.$axios.$post('api/addresses', address)
        this.$store.commit('busy', false)
        this.go('/checkout/address')
      } catch (e) {
        this.$store.commit('busy', false)
      }
    },
  },
}
</script>

<style scoped>
/* form */
form {
  display: inline-block;
}
.field {
  padding-top: 10px;
  display: flex;
  flex-direction: column;
}
label {
  order: -1;
  padding-left: 5px;
  font-size: 14px;
  transition: all 0.3s ease-in;
  transform: translateY(30px);
  pointer-events: none;
}
input:focus + label,
textarea:focus + label {
  transform: translateY(16px);
}
/* form ends */
</style>
