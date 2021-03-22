<template>
  <ApolloQuery
    :query="require('~/gql/category/categories.gql')"
    :variables="{ city }"
  >
    <template v-slot="{ result: { error, data }, isLoading }">
    <div v-if="isLoading">Loading...</div>
      <ErrComponent v-else-if="error" />
      <div
        class="sticky top-0 z-10 flex flex-no-wrap max-w-full p-1 pl-1 mb-2 overflow-x-auto text-gray-700 bg-gray-100 border-t shadow-lg"
        v-else-if="data && data.categories.data"
      >
        <nuxt-link
          v-for="c in data.categories.data"
          :key="c.id"
          :to="`/c/${c.slug}`"
          class="flex flex-col pt-4 pb-2 mx-auto category-item"
        >
          <img v-lazy="c.img" class="w-12 h-12 mx-auto mb-1 rounded-full" alt />
          <span class="text-xs text-center">{{ c.name }}</span>
        </nuxt-link>
      </div>
    </template>
  </ApolloQuery>
</template>

<script>
import categories from '~/gql/category/categories.gql'
import { OnelineSkeleton } from '~/shared/components/ui'
export default {
  components: { OnelineSkeleton },
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
