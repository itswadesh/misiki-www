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
    <div class="container pb-16 mx-auto">
      <!-- <div class="flex flex-wrap">
        <div class="w-1/2" v-for="p in products" :key="p._id">
          <Product :p="p" class />
        </div>
      </div>-->
      <Categories />
      <ApolloQuery
        :query="require('~/gql/product/products.gql')"
        :variables="{ category: $route.params.slug, city }"
      >
        <template v-slot="{ result: { error, data }, isLoading }">
          <div v-if="isLoading"></div>
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
          <div v-else class="mt-64 text-center">
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
import { Heading, Banner, Product, ListCard } from '~/shared/components'
import Categories from '~/components/Categories'
import StickyFooter from '~/components/StickyFooter'
// import products from '~/gql/product/products.gql'
// import category from '~/gql/category/category.gql'

export default {
  data() {
    return {
      city: null,
      category: null,
      products: null,
    }
  },
  // async created() {
  //   const slug = this.$route.params.slug
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
  // },
  middleware: ['geo'],
  async mounted() {
    this.city = (this.$cookies.get('geo') || {}).city
  },
  components: {
    Heading,
    // Header,
    Banner,
    Product,
    Categories,
    ListCard,
    StickyFooter,
    // ContentLoader,
  },
}
</script>
