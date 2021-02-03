<template>
  <div>
    <!-- <div class="flex justify-between px-2 py-4 bg-white">
      <input
        type="text"
        class="w-full text-xl border rounded-full"
        name="search"
      />
      <img
        v-lazy="`img/banners.svg`"
        class="w-8 h-8 ml-2 bg-gray-300 rounded-full"
      />
    </div>
    <div class="flex justify-between">
      <h1 class="px-2 font-bold">Popular of the week</h1>
      <h2 class="px-2 text-sm font-medium">Show all (>)</h2>
    </div>-->
    <!-- <content-loader
        v-if="!isLoading"
        :height="100"
        :speed="2"
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
      >
        <rect x="30" y="15" rx="4" ry="4" width="100" height="70" />
        <rect x="140" y="20" rx="4" ry="4" width="100" height="10" />
        <rect x="140" y="40" rx="4" ry="4" width="120" height="8" />
        <rect x="350" y="15" rx="25" ry="25" width="25" height="25"/>
        <rect x="340" y="45" rx="4" ry="4" width="50" height="8"/>
    </content-loader>-->
    <div class="relative flex px-1 py-2 m-2 bg-white rounded shadow">
      <div
        v-if="p.time == '12 - 2 PM'"
        class="absolute left-0 z-10 px-4 text-xs text-white bg-red-500 rounded-r-lg opacity-75"
      >
        Lunch
      </div>
      <div
        v-else-if="p.time == '8:30 - 9:30 PM'"
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
        <div class="flex justify-between">
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
          <div class="text-xl font-black text-gray-700">
            {{ p.price | currency(settings.currency_symbol) }}
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <Ratingcircle :rating="p.ratings" class="m-review" />
            <!-- <fa icon="star h-3 w-3 my-2" /> -->
            <!-- <span class="mx-1 text-sm font-medium text-black">4.6</!-->
            <!-- <div class="text-sm font-medium text-gray-500">(rating/review)</div> -->
          </div>
          <!-- <div class="px-3 text-xs text-white bg-orange-500 rounded-full">Free Delivery</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Ratingcircle } from '~/shared/components/ui'
import { ContentLoader } from 'vue-content-loader'
export default {
  props: ['p'],
  methods: {},
  components: { Ratingcircle, ContentLoader },
  computed: { ...mapGetters({ settings: 'settings' }) },
}
</script>

<style scoped></style>
