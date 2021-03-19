<template>
  <div>
    <Heading title="Offers" />
    <div class="min-h-screen bg-gray-100">
      <div class="w-full">
        <ApolloQuery :query="require('~/gql/coupon/coupons.gql')">
          <template v-slot="{ result: { error, data }, isLoading }">
            <div v-if="isLoading">
              <!-- <content-loader
                v-for="(n, ix) in 2"
                :key="ix"
                :height="200"
                :speed="2"
                primaryColor="#f3f3f3"
                secondaryColor="#ecebeb"
              >
                <rect x="20" y="20" rx="4" ry="4" width="110" height="25" />
                <rect x="20" y="55" rx="4" ry="4" width="140" height="9" />
                <rect x="315" y="45" rx="4" ry="4" width="55" height="20" />
                <rect x="150" y="95" rx="4" ry="4" width="120" height="15" />
              </content-loader> -->
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
// import { ContentLoader } from 'vue-content-loader'
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
