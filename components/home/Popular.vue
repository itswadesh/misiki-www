<template>
  <ApolloQuery
    :query="require('~/gql/product/popular.gql')"
    :variables="{ city }"
    :update="(data) => data.popular"
  >
    <template v-slot="{ result: { error, data }, isLoading }">
      <div v-if="isLoading" class="flex">
        <Product class="w-1/3" v-for="(n, ix) in 2" :key="ix" :p="{}" />
      </div>
      <ErrComponent v-else-if="error" :error="error" />
      <div v-else-if="data && data.data.length">
        <Carousel :products="data.data" title="Popular" />
      </div>
      <div v-else>No popular products</div>
    </template>
  </ApolloQuery>
</template>

<script>
// import Vue from 'vue'
import { Product } from '~/shared/components'
import Carousel from './Carousel2'
// import popular from '~/gql/product/popular.gql'

export default {
  data() {
    return { city: null }
  },
  middleware: ['geo'],
  async created() {
    this.city = (this.$cookies.get('geo') || {}).city
    //   try {
    //     this.$store.commit('clearErr')
    //     this.products = (
    //       await this.$apollo.query({
    //         query: popular
    //         // fetchPolicy: 'no-cache'
    //       })
    //     ).data.popular.data
    //   } catch (e) {
    //     this.$store.commit('setErr', e)
    //   } finally {
    //     this.$store.commit('busy', false)
    //   }
  },
  components: {
    Carousel,
    Product,
  },
}
</script>

<style scoped></style>
