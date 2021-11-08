<template>
  <div>
    <Nav />
    <CheckoutHeader selected="address" class="mt-24 sm:mt-16" />
    <div class="w-full pb-4 mx-auto lg:w-1/3">
      <div class="flex items-center justify-between p-3 shadow lg:shadow-none">
        <nuxt-link class="flex items-center w-3/5" to="/checkout/address">
          <svg class="w-8 h-6 my-auto" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M5.41 11H21a1 1 0 0 1 0 2H5.41l5.3 5.3a1 1 0 0 1-1.42 1.4l-7-7a1 1 0 0 1 0-1.4l7-7a1 1 0 0 1 1.42 1.4L5.4 11z"
            />
          </svg>
          <div class="ml-1 text-lg font-medium text-gray-700">Add address</div>
        </nuxt-link>
        <div class="text-xs text-gray-600">Step 2 of 3</div>
      </div>
    </div>
    <!-- input  -->
    <div class="container mx-auto lg:w-1/3">
      <AddressEdit go="checkout" :id="$route.query.id" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Nav from '~/components/home/Nav'

import { Textbox } from '~/shared/components/ui'
import { AddressEdit } from '~/shared/components'
const CheckoutHeader = () => import('~/components/checkout/CheckoutHeader')

export default {
  middleware: ['isAuth'],
  components: { CheckoutHeader, Textbox, AddressEdit, Nav },
  data() {
    return {
      address: null,
    }
  },
  computed: {
    ...mapGetters({ user: 'auth/user' }),
  },
  async created() {
    // const id = this.$route.query.id
    // If editing
    // if (!id) {
    //   this.$store.commit('busy', true)
    //   let geoCookie = this.$cookies.get('geo')
    //   if (geoCookie) {
    //     this.address = geoCookie || {}
    //     this.address.firstName = this.user.firstName
    //     this.address.lastName = this.user.lastName
    //     this.address.phone = this.user.phone
    //   }
    //   this.$store.commit('busy', false)
    // }
  },
  methods: {
    // go(url) {
    //   this.$router.push(url)
    // },
    // async submit(address) {
    //   try {
    //     this.$store.commit('clearErr')
    //     // address.zip = +address.zip
    //     if (address.id)
    //       await this.$apollo.mutate({
    //         mutation: updateAddress,
    //         variables: address,
    //       })
    //     else
    //       await this.$apollo.mutate({
    //         mutation: addAddress,
    //         variables: address,
    //       })
    //     this.go('/checkout/address')
    //   } catch (e) {
    //     this.$store.commit('setErr', e)
    //   } finally {
    //     this.$store.commit('busy', false)
    //   }
    // },
  },
  layout: 'none',
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
