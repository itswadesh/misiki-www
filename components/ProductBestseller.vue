<template>
  <div
    class="relative w-full mx-1 mb-2 border rounded shadow sm:mx-2"
    v-if="product"
  >
    <!-- <img
     v-lazy="p.type === 'V' ? 'veg.png' : 'non-veg.png'"
      class="absolute top-0 right-0 w-5 mt-1 mr-1"
    />-->
    <nuxt-link :to="`/${product.slug}`" class="relative block">
      <div
        v-if="product.time == '12 - 2 PM'"
        class="absolute right-0 z-10 px-4 text-xs text-white bg-red-500 rounded-l-lg opacity-75"
      >
        Lunch
      </div>
      <div
        v-else-if="product.time == '8:30 - 9:30 PM'"
        class="absolute right-0 z-10 px-4 text-xs text-white bg-blue-500 rounded-l-lg opacity-75"
      >
        Dinner
      </div>
      <img
        v-lazy="`${product.img}`"
        alt
        class="object-cover w-full h-40 mb-2 rounded"
      />
    </nuxt-link>
    <div class="px-2">
      <div v-if="product.ratings">
        <Ratingcircle :rating="product.ratings" class="m-review" />
        <div class="pl-2 review-font">{{ product.reviews }} reviews</div>
      </div>
      <nuxt-link :to="`/${product.slug}`">
        <h2 class="py-2 text-xs font-bold tracking-wide truncate">
          {{ product.name }}
        </h2>
      </nuxt-link>
      <p>{{ product.description }}</p>
      <div class="flex flex-wrap items-center justify-between my-2">
        <div class="font-bold">
          {{ product.price | currency(settings.currency_symbol) }}
        </div>
        <!-- <img
          v-lazy="product.type === 'V' ? '/veg.png' : '/non-veg.png'"
          class="w-5 mt-1 mr-1"
        /> -->
        <!-- <div v-if="product.stock<1" class="text-xs text-red-500">Out of stock</div> -->
        <!-- <div class="text-xs text-red-500">{{product.updatedAt | date}}</div> -->
      </div>
      <div class="py-1 text-xs border-t" v-if="product.vendor">
        By {{ product.vendor.info.restaurant }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Ratingcircle } from '~/shared/components/ui'
export default {
  props: ['product'],
  methods: {},
  components: { Ratingcircle },
  computed: { ...mapGetters({ settings: 'settings' }) },
}
</script>

<style scoped>
/* .bg{
background: radial-gradient(239.77% 588% at 87.97% -38.64%, #98EEFF 0%, rgba(255, 255, 255, 0) 100%);
opacity: 0.87;
border-radius: 7px;
} */
</style>
