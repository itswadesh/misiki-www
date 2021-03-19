<template>
  <div>
    <Heading title="Offers" />
    <div class="min-h-screen bg-gray-100">
      <div class="w-full">
        <ApolloQuery :query="require('~/gql/coupon/coupons.gql')">
          <template v-slot="{ result: { error, data }, isLoading }">
            <div v-if="isLoading">
              Loading.....
            </div>
            <ErrComponent v-else-if="error" :error="error" />
            <div
              class="mx-2"
              v-else-if="data && data.coupons && data.coupons.data.length > 0"
            >
              <Coupon
                v-for="c in data.coupons.data"
                :key="c._id"
                :color="c.color"
                :code="c.code"
                :text="c.text"
                :terms="c.terms"
              />
            </div>
            <div v-else class="mt-64 text-center">
              There are no coupons. Check later
            </div>
          </template>
        </ApolloQuery>
      </div>
    </div>
    <StickyFooter />
  </div>
</template>

<script>
import Vue from 'vue'
import { Heading } from '~/shared/components'
import { ListSkeleton } from '~/shared/components/ui'
import Coupon from '~/components/Coupon'
import StickyFooter from '~/components/StickyFooter'
// import coupons from '~/gql/cart/coupons.gql'

export default {
  components: { Heading, Coupon, StickyFooter, ListSkeleton },
  data() {
    return {
      // coupons: []
    }
  },
  async created() {
    // try {
    //   this.$store.commit('busy', true)
    //   this.$store.commit('clearErr')
    //   this.coupons = (
    //     await this.$apollo.query({
    //       query: coupons,
    //       fetchPolicy: 'no-cache'
    //     })
    //   ).data.coupons
    // } catch (e) {
    //   this.$store.commit('setErr', e)
    // } finally {
    //   this.$store.commit('busy', false)
    // }
  },
}
</script>

<style scoped></style>
