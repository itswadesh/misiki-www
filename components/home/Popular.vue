<template>
  <ApolloQuery
    :query="require('~/gql/product/popular.gql')"
    :variables="{ city }"
    :update="(data) => data.popular"
  >
    <template v-slot="{ result: { error, data }, isLoading }">
      <div v-if="isLoading" class="flex">
        <Product class="w-1/4" v-for="(n, ix) in 2" :key="ix" :p="{}" />
      </div>
      <ErrComponent v-else-if="error" :error="error" />
      <div v-else-if="data && data.data.length" class="">
        <Carousel :products="data.data" title="Popular" class="" />
      </div>
      <div
        v-else
        class="flex flex-col items-center justify-center w-full text-center h-72"
      >
        <h3 class="text-3xl font-bold">No food available now</h3>
        <div>We are open from 10:00PM to 6:00PM</div>
      </div>
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
