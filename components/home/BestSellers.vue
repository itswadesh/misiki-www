<template>
  <!-- <ApolloQuery
    :query="require('~/gql/product/bestSellers.gql')"
    :update="(data) => data.bestSellers"
    :variables="{ city }"
    fetchPolicy="no-cache"
  >
    <template v-slot="{ result: { error, data }, isLoading }">
      <div v-if="isLoading" class="flex">
        <Product class="w-1/2" v-for="(n, ix) in 2" :key="ix" :product="{}" />
      </div>
      <div v-else-if="error">
        <ErrComponent />
      </div> -->
  <div v-if="products">
    <div v-if="products.t && products.t.length > 0">
      <CarouselBestSeller
        :products="products.t"
        :title="`Best Sellers on ${products.t[0]._id.date}`"
      />
    </div>
    <div class="mt-4" v-if="products.t1 && products.t1.length > 0">
      <CarouselBestSeller
        :products="products.t1"
        :title="`Best Sellers on ${products.t1[0]._id.date}`"
      />
    </div>
    <div class="mt-4" v-if="products.t2 && products.t2.length > 0">
      <CarouselBestSeller
        :products="products.t2"
        :title="`Best Sellers on ${products.t2[0]._id.date}`"
      />
    </div>
    <div class="mt-4" v-if="products.t3 && products.t3.length > 0">
      <CarouselBestSeller
        :products="products.t3"
        :title="`Best Sellers on ${products.t3[0]._id.date}`"
      />
    </div>
    <div class="mt-4" v-if="products.t4 && products.t4.length > 0">
      <CarouselBestSeller
        :products="products.t4"
        :title="`Best Sellers on ${products.t4[0]._id.date}`"
      />
    </div>
  </div>
  <!-- </template>
  </ApolloQuery> -->
</template>

<script>
import Vue from 'vue'
import CarouselBestSeller from './CarouselBestSeller'
import BEST_SELLERS from '~/gql/product/bestSellers.gql'
import { Product } from '~/shared/components'

export default {
  data() {
    return {
      products: null,
      geo: null,
    }
  },
  middleware: ['geo'],
  async created() {
    const geo = this.$cookies.get('geo') || {}
    try {
      this.$store.commit('clearErr')
      this.products = (
        await this.$apollo.query({
          query: BEST_SELLERS,
          variables: { zip: geo.zip },
          fetchPolicy: 'no-cache',
        })
      ).data.bestSellers
    } catch (e) {
      this.$store.commit('setErr', e)
    } finally {
      this.$store.commit('busy', false)
    }
  },
  components: { CarouselBestSeller, Product },
}
</script>

<style scoped></style>
