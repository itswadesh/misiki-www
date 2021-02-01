<template>
  <ApolloQuery
    :query="require('~/../shared/gql/category/categories.gql')"
    :variables="{ city }"
  >
    <template v-slot="{ result: { error, data }, isLoading }">
      <content-loader
        v-if="isLoading"
        :height="70"
        :speed="2"
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
      >
        <rect x="30" y="15" width="50" height="50" />
        <rect x="130" y="15" rx="4" ry="4" width="50" height="50" />
        <rect x="230" y="15" rx="4" ry="4" width="50" height="50" />
        <rect x="330" y="15" rx="4" ry="4" width="50" height="50" />
      </content-loader>
      <ErrComponent v-else-if="error" />
      <div
        class="sticky top-0 z-10 flex flex-no-wrap w-full pl-1 mb-2 overflow-x-auto text-gray-700 bg-gray-100 border-t shadow-lg"
        v-else-if="data && data.categories.data"
      >
        <nuxt-link
          v-for="c in data.categories.data"
          :key="c.id"
          :to="`/c/${c.slug}`"
          class="category-item"
        >
          <img v-lazy="c.img" class="w-8 h-8 mb-2 rounded-full" alt />
          <span class="text-xs">{{ c.name }}</span>
        </nuxt-link>
      </div>
    </template>
  </ApolloQuery>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import categories from '~/../shared/gql/category/categories.gql'
import { OnelineSkeleton } from '~/../shared/components/ui'
export default {
  components: { OnelineSkeleton, ContentLoader },
  data() {
    return {
      city: null,
      categories: null,
    }
  },
  middleware: ['geo'],
  async mounted() {
    this.city = (this.$cookies.get('geo') || {}).city
    // try {
    //   this.$store.commit('clearErr', false)
    //   this.categories = (
    //     await this.$apollo.query({
    //       query: categories,
    //       variables: { city },
    //     })
    //   ).data.categories
    // } catch (e) {
    //   this.$store.commit('setErr', e)
    // } finally {
    //   this.$store.commit('busy', false)
    // }
  },
}
</script>

<style scoped></style>
