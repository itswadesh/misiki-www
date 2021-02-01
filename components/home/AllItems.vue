<template>
  <div>
    <ApolloQuery
      :query="require('~/gql/product/search.gql')"
      :variables="{ city, page: 1, sort: '-updatedAt' }"
      :update="(data) => data.search"
    >
      <template v-slot="{ result: { error, data }, isLoading }">
        <div v-if="isLoading" class="flex">
          <Product class="w-1/2" v-for="(n, ix) in 2" :key="ix" :p="{}" />
        </div>
        <ErrComponent v-else-if="error" :error="error" />
        <div v-else-if="data && data.data.length" class="flex flex-wrap">
          <div v-for="p in data.data" :key="p.id" class="w-1/2">
            <Product :p="p" />
          </div>
        </div>
        <div v-else>No item for today</div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import { Product } from '~/shared/components'

export default {
  data() {
    return {
      city: null,
    }
  },
  components: {
    Product,
  },
  middleware: ['geo'],
  created() {
    this.city = (this.$cookies.get('geo') || {}).city
  },
}
</script>

<style scoped></style>
