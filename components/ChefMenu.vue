<template>
  <ApolloQuery
    :query="require('~/gql/product/products.gql')"
    :variables="{ vendor }"
  >
    <template v-slot="{ result: { error, data }, isLoading }">
      <div v-if="isLoading">Loading........</div>
      <ErrComponent v-else-if="error" :error="error" />
      <div class="mb-4" v-else-if="data && data.products.length > 0">
        <Carousel :products="products.data" title="Chef's today's menu" />
      </div>
      <!-- <div v-else>No Items found</div> -->
    </template>
  </ApolloQuery>
</template>

<script>
import { Product } from '~/shared/components'
import Carousel from '~/components/home/Carousel2'

export default {
  props: ['vendor'],
  // data() {
  //   return { products: null }
  // },
  // async created() {
  //   try {
  //     this.$store.commit('clearErr')
  //     this.products = (
  //       await this.$apollo.query({
  //         query: products,
  //         variables: { vendor: this.vendor }
  //         // fetchPolicy: 'no-cache'
  //       })
  //     ).data.products
  //   } catch (e) {
  //     this.$store.commit('setErr', e)
  //   } finally {
  //     this.$store.commit('busy', false)
  //   }
  // },
  components: { Carousel, Product },
}
</script>
