<template>
  <div>
    <ApolloQuery
      :query="require('~/gql/category/category.gql')"
      :variables="{ slug: $route.params.slug }"
    >
      <template v-slot="{ result: { error, data }, isLoading }">
        <Heading v-if="isLoading" :title="`Explore ...`" back="/" />
        <ErrComponent v-else-if="error" :error="error" />

        <div v-else-if="data && data.category">
          <Heading :title="`Explore ${data.category.name}`" back="/" />
        </div>
        <div v-else>Category not found</div>
      </template>
    </ApolloQuery>
    <Banner />
    <div class="container">
      <!-- <div class="flex flex-wrap">
        <div class="w-1/2" v-for="p in products" :key="p._id">
          <Product :p="p" class />
        </div>
      </div>-->
      <Categories />
      <ApolloQuery
        :query="require('~/gql/product/products.gql')"
        :variables="{ category: $route.params.slug }"
      >
        <template v-slot="{ result: { error, data }, isLoading }">
          <content-loader
            v-if="isLoading"
            :height="100"
            :speed="2"
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
          >
            <rect x="10" y="15" rx="4" ry="4" width="100" height="70" />
            <rect x="140" y="20" rx="4" ry="4" width="100" height="10" />
            <rect x="140" y="40" rx="4" ry="4" width="120" height="8" />
            <rect x="350" y="15" rx="25" ry="25" width="25" height="25" />
            <rect x="340" y="45" rx="4" ry="4" width="50" height="8" />
          </content-loader>
          <ErrComponent v-else-if="error" :error="error" />

          <div
            class="flex flex-wrap"
            v-else-if="
              data &&
              data.products &&
              data.products.data &&
              data.products.data.length
            "
          >
            <div class="w-full" v-for="p in data.products.data" :key="p._id">
              <ListCard :p="p" class :isLoading="isLoading" />
            </div>
          </div>
          <div v-else class="text-center mt-64">
            No items under this category
          </div>
        </template>
      </ApolloQuery>
    </div>
    <StickyFooter />
  </div>
</template>

<script>
import Vue from 'vue'
// import {Header} from '~/shared/components'
import {
  Heading,
  Banner,
  Product,
  ListCard,
  Categories,
} from '~/shared/components'
import StickyFooter from '~/components/StickyFooter'
import { ContentLoader } from 'vue-content-loader'
// import products from '~/gql/product/products.gql'
// import category from '~/gql/category/category.gql'

export default {
  data() {
    return {
      category: null,
      products: null,
    }
  },
  async created() {
    const slug = this.$route.params.slug
    // try {
    //   this.$store.commit('clearErr')
    //   this.category = (
    //     await this.$apollo.query({
    //       query: category,
    //       variables: { slug }
    //       // fetchPolicy: 'no-cache'
    //     })
    //   ).data.category
    // this.products = (
    //   await this.$apollo.query({
    //     query: products,
    //     variables: { category: slug }
    //     // fetchPolicy: 'no-cache'
    //   })
    // ).data.products
    // } catch (e) {
    //   this.products = []
    // } finally {
    //   this.$store.commit('busy', false)
    // }
  },
  components: {
    Heading,
    // Header,
    Banner,
    Product,
    Categories,
    ListCard,
    StickyFooter,
    ContentLoader,
  },
}
</script>
