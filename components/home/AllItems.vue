<template>
  <div class="px-1 sm:px-4">
    <ApolloQuery
      :query="require('~/gql/product/search.gql')"
      :variables="{ city, page: 1, sort: '-updatedAt' }"
      :update="(data) => data.search"
    >
      <template v-slot="{ result: { error, data }, isLoading }">
        <div v-if="isLoading" class="flex">
          <Product class="w-1/4" v-for="(n, ix) in 2" :key="ix" :product="{}" />
        </div>
        <ErrComponent v-else-if="error" :error="error" />
        <div
          v-else-if="data && data.data.length"
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
        >
          <div v-for="p in data.data" :key="p.id" class="col-span-1">
            <Product :product="p" />
          </div>
        </div>
        <div v-else-if="!isLoading" class="flex flex-col min-h-screen">
          No item for today
        </div>
        <div v-else class="flex flex-col min-h-screen">
          <ListCardSkeleton />
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import { Product } from '~/shared/components'
import ListCardSkeleton from '~/components/Skeletons/ListCardSkeleton'

export default {
  data() {
    return {
      city: null,
    }
  },
  components: {
    Product,
    ListCardSkeleton,
  },
  middleware: ['geo'],
  created() {
    this.city = (this.$cookies.get('geo') || {}).city
  },
}
</script>

<style scoped></style>
