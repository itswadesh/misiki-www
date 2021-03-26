<template>
  <div>
    <div class="relative flex px-1 py-2 m-2 bg-white rounded shadow">
      <div
        v-if="p.time == '12 - 2 PM'"
        class="absolute left-0 z-10 px-4 text-xs text-white bg-red-500 rounded-r-lg opacity-75"
      >
        Lunch
      </div>
      <div
        v-else-if="p.time == '8:30 - 10:00 PM'"
        class="absolute left-0 z-10 px-4 text-xs text-white bg-blue-500 rounded-r-lg opacity-75"
      >
        Dinner
      </div>
      <nuxt-link :to="`/${p.slug}`" class="p-2">
        <img v-lazy="p.img" class="object-cover w-32 h-20 rounded" />
      </nuxt-link>
      <div class="w-full my-2" v-if="p.vendor">
        <nuxt-link v-if="p.vendor" :to="`/search/${p.vendor.info.restaurant}`">
          <img
            v-lazy="p.vendor.avatar"
            class="absolute top-0 right-0 object-cover w-8 h-8 p-1 mt-2 mr-2 bg-white border rounded-full"
          />
        </nuxt-link>
        <nuxt-link :to="`/${p.slug}`" class="font-bold tracking-wide">
          {{ p.name }}
        </nuxt-link>
        <div class="flex justify-between my-auto">
          <div class="flex items-center text-sm tracking-widest text-gray-500">
            <svg
              class="w-4 transition-all ease-out transition-medium"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M18 11v7a2 2 0 0 1-4 0v-5h-2V3a3 3 0 0 1 3-3h3v11zM4 10a2 2 0 0 1-2-2V1a1 1 0 0 1 2 0v4h1V1a1 1 0 0 1 2 0v4h1V1a1 1 0 0 1 2 0v7a2 2 0 0 1-2 2v8a2 2 0 0 1-4 0v-8z"
              />
            </svg>
            {{ p.vendor.info.restaurant }}
          </div>
          <div class="pr-2 text-xl font-black text-gray-700">
            {{ p.price | currency(settings.currency_symbol) }}
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <Ratingcircle :rating="p.ratings" class="m-review" />
            <!-- <span class="mx-1 text-sm font-medium text-black">4.6</!-->
            <!-- <div class="text-sm font-medium text-gray-500">(rating/review)</div> -->
          </div>
          <!-- <div class="px-3 text-xs rounded-full">Free Delivery</div> -->
          <img
            v-lazy="p.type === 'V' ? '/veg.png' : '/non-veg.png'"
            class="w-5 mr-2"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Ratingcircle } from '~/shared/components/ui'
export default {
  props: ['p'],
  methods: {},
  components: { Ratingcircle },
  computed: { ...mapGetters({ settings: 'settings' }) },
}
</script>

<style scoped></style>
