<template>
  <!-- <ApolloQuery
    :query="require('~/gql/product/popular.gql')"
    :variables="{ city }"
    :update="(data) => data.popular"
  >
    <template v-slot="{ result: { error, data }, isLoading }">
      <div v-if="isLoading" class="flex">
        <Product class="w-1/2" v-for="(n, ix) in 2" :key="ix" :product="{}" />
      </div>
      <ErrComponent v-else-if="error" :error="error" /> -->
  <div v-if="products && products.length" class="">
    <div class="w-full px-1 my-4 sm:px-4">
      <h2 class="m-2 mt-3 text-xl">Today's Menu</h2>
      <div
        class="
          grid grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
        "
      >
        <div v-for="p in products" :key="p.id" class="col-span-1">
          <Product :product="p" class="" />
        </div>
      </div>
    </div>
  </div>
  <div
    v-else-if="!loading"
    class="flex flex-col items-center justify-center w-full text-center h-72"
  >
    <h3 class="text-3xl font-bold">No food available now</h3>
    <div>We are open from 10:00PM to 6:00PM</div>
  </div>
  <!-- </template>
  </ApolloQuery> -->
</template>

<script>
// import Vue from 'vue'
import { Product } from '~/shared/components'
// import Carousel from './Carousel2'
import POPULAR from '~/gql/product/popular.gql'

export default {
  data() {
    return {
      products: null,
      geo: null,
      loading: false,
    }
  },
  middleware: ['geo'],
  async created() {
    this.geo = this.$cookies.get('geo') || {}
    try {
      this.loading = true
      this.$store.commit('clearErr')
      this.products = (
        await this.$get('product/popular', { zip: this.geo.zip })
      ).data
    } catch (e) {
      this.$store.commit('setErr', e)
    } finally {
      this.loading = false
      this.$store.commit('busy', false)
    }
  },
  components: {
    // Carousel,
    Product,
  },
}
</script>

<style scoped></style>
