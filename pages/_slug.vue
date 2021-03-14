<template>
  <div class="bg-white">
    <ApolloQuery
      :query="require('~/gql/product/productSlug.gql')"
      :variables="{ slug: $route.params.slug }"
      :update="
        (data) => {
          initProduct(data.productSlug)
          return data.productSlug
        }
      "
    >
      <template v-slot="{ result: { error, data }, isLoading }">
        <DetailPageSkeleton v-if="isLoading" />
        <ErrComponent v-else-if="error" />
        <div v-else-if="data" class="relative">
          <div class="absolute z-10 w-full">
            <BackButton />
            <!-- <nuxt-link
              to="/search/"
              class="absolute top-0 right-0 w-10 h-10 pt-2 mt-1 mr-1 text-center bg-black rounded-full opacity-25 px-auto py-auto"
            >
              <fa icon="search" class="text-white" />
            </nuxt-link>-->
          </div>
          <div
            v-lazy:background-image="`${data.img}`"
            class="relative flex justify-center h-48 bg-cover lazy-background"
          >
            <div
              v-if="data.vendor && data.vendor.info"
              class="absolute bottom-0 w-3/4 py-2 text-xl font-bold text-center text-white bg-black"
              style="background-color: rgba(0, 0, 0, 0.5)"
            >
              <!-- <div class="text-white opacity-100"></div> -->
              {{ data.vendor.info.restaurant }}
            </div>
          </div>

          <!-- <img v-lazy="`${data.img}`" alt class="object-cover w-full h-48 mb-2" /> -->
          <div class="z-10 px-4 rounded-t-lg">
            <div class="mt-4 mb-2">
              <div
                class="flex items-center justify-between text-sm text-gray-600"
              >
                <img
                  v-lazy="data.type === 'V' ? '/veg.png' : '/non-veg.png'"
                  class="w-5"
                />
                <div class="flex items-center">
                  <svg
                    class="transition-all ease-out transition-medium"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M16.32 7.1A8 8 0 1 1 9 4.06V2h2v2.06c1.46.18 2.8.76 3.9 1.62l1.46-1.46 1.42 1.42-1.46 1.45zM10 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM7 0h6v2H7V0zm5.12 8.46l1.42 1.42L10 13.4 8.59 12l3.53-3.54z"
                    />
                  </svg>
                  <!-- <div v-if="city == 'Sunabeda'" class="flex items-center"> -->
                  <div class="flex items-center">
                    <TruckIcon size="1x" class="mr-2" /> Delivery:
                    <b class="ml-1 text-xl"> {{ data.time }}</b>
                  </div>
                  <!-- <div class="flex items-center" v-else>
                    <TruckIcon size="1x" class="mr-2" /> Delivery within
                    <b class="ml-1 text-xl text-secondary"> 1hr</b>
                  </div> -->
                </div>
                <!-- <div>{{ data.stock }} left</div> -->
                <!-- <div v-if="data.vendor && data.vendor.info">
                  By {{ data.vendor.info.restaurant }}
                </div> -->
                <div v-if="data.stock > 0 && data.stock < 6">
                  Only {{ data.stock }} left
                </div>
              </div>
              <h1 class="mt-2 text-xl font-bold">{{ data.name }}</h1>
              <!-- <div class="flex items-center justify-between mt-4 text-sm">
            <div class="px-3 text-white bg-orange-500 rounded-full">free delivery</div>
            <div class="text-gray-600">
              <fa icon="history" /> 33min
            </div>
            <div class="text-gray-600">
              <fa icon="map-marker" /> 27kms
            </div>
              </div>-->
            </div>
            <div class="flex justify-between">
              <div class="flex items-center">
                <Ratingcircle
                  v-if="reviewSummary"
                  :rating="reviewSummary.avg"
                />
                <div class="">{{ data.ratings }} ratings</div>
              </div>
              <h2 class="text-2xl font-bold">
                {{ data.price | currency(settings.currency_symbol) }}
              </h2>
              <div class="flex justify-around">
                <CartButtons
                  :product="product"
                  :variant="userSelectedVariant"
                  :notify="true"
                />
              </div>
            </div>
            <div class="pb-3 text-xs text-gray-500">
              {{ data.description }}
            </div>
          </div>
          <hr />
          <SocialSharing :data="product" :host="host" />
          <hr class="mb-4" />
          <div v-if="data.vendor">
            <h3 class="px-3 text-2xl font-bold">About Chef</h3>
            <div class="flex p-6 mb-6 bg-gray-100 rounded-lg">
              <img
                v-if="data.vendor.avatar"
                class="object-cover w-24 h-24 mx-0 mr-6 rounded-full"
                v-lazy="data.vendor.avatar"
              />
              <img
                v-else
                class="w-24 h-24 mx-0 mr-6 rounded-full"
                v-lazy="`https://randomuser.me/api/portraits/women/17.jpg`"
              />
              <div class="text-left">
                <h2 class="text-lg" v-if="!data.vendor.info.public">
                  {{ data.vendor.info.restaurant }}
                </h2>
                <h2 class="text-lg" v-else>
                  {{ data.vendor.firstName }} {{ data.vendor.lastName }}
                </h2>
                <div
                  class="flex items-center text-xs tracking-wide text-gray-600"
                >
                  <MapPinIcon size="1.25x" class="mr-1" />
                  {{ data.vendor.city }}
                </div>
                <div class="flex items-center text-sm text-green-500">
                  {{ data.vendor.ratings }}
                  <StarIcon size="1.25x" class="mr-1" />
                  {{ data.vendor.reviews }} reviews
                </div>
                <div class="text-gray-600" v-if="data.vendor.info">
                  {{ data.vendor.info.speciality }}
                </div>
              </div>
            </div>
            <ChefMenu :vendor="data.vendor && data.vendor.id" />
            <div
              class="mb-4"
              v-if="
                data.vendor.info &&
                data.vendor.info.kitchenPhotos &&
                data.vendor.info.kitchenPhotos.length
              "
            >
              <h3 class="px-3 mb-2 text-2xl font-bold">Kitchen Photos</h3>
              <div class="flex flex-wrap px-2">
                <div
                  class="w-1/3 px-1 mb-2"
                  v-for="(p, ix) in data.vendor.info.kitchenPhotos"
                  :key="ix"
                >
                  <img v-lazy="p" class="object-cover h-24 rounded-lg shadow" />
                </div>
              </div>
            </div>

            <div class="px-3" v-if="reviewSummary">
              <h3 class="mb-2 text-2xl font-bold">Reviews</h3>
              <div class="text-sm text-gray-700">
                <Ratingcircle :rating="reviewSummary.avg" />
                <div>
                  Average of {{ reviewSummary.avg }} out of
                  {{ reviewSummary.count }} ratings &
                  {{ reviewSummary.reviews && reviewSummary.reviews.length }}
                  reviews
                </div>
              </div>
              <nuxt-link :to="`/review/${data && data.id}`" v-if="orderCount"
                >Rate Now</nuxt-link
              >
            </div>
          </div>
        </div>
        <CartBar />
      </template>
    </ApolloQuery>
    <!-- <StickyFooter class /> -->
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import CartButtons from '~/components/cart/CartButtons'
import CartBar from '~/components/cart/CartBar'
import StickyFooter from '~/components/StickyFooter'
import ChefMenu from '~/components/ChefMenu'
import { MapPinIcon, StarIcon } from 'vue-feather-icons'

import {
  Ratingcircle,
  DetailPageSkeleton,
  BackButton,
} from '~/shared/components/ui'
import productSlug from '~/gql/product/productSlug.gql'
import SocialSharing from '~/shared/components/SocialSharing'
import productsByIds from '~/gql/product/productsByIds.gql'
import hasOrder from '~/gql/order/hasOrder.gql'
import productReviews from '~/gql/review/productReviews.gql'
import reviewSummary from '~/gql/review/reviewSummary.gql'
import { FacebookIcon, TruckIcon } from 'vue-feather-icons'
// const host = process.server
//   ? this.$ssrContext.req.headers.host
//   : window.location.host
export default {
  components: {
    ChefMenu,
    CartButtons,
    StickyFooter,
    CartBar,
    Ratingcircle,
    DetailPageSkeleton,
    TruckIcon,
    BackButton,
    MapPinIcon,
    StarIcon,
    SocialSharing,
  },
  async asyncData({ req }) {
    if (process.server) {
      return { host: req.headers.host }
    } else {
      return { host: window.location.host }
    }
  },
  data() {
    return {
      shake: false,
      product: null,
      userSelectedVariant: null,
      orderCount: 0,
      reviewSummary: {},
      reviews: [],
      RecentlyViewedProducts: [],
      total: 0,
      avg: 0,
      city: null,
    }
  },
  middleware: ['geo'],
  async created() {
    this.city = (this.$cookies.get('geo') || {}).city
  },
  methods: {
    async initProduct(product) {
      this.product = product
      const id = product && product.id
      if (!id) return
      let recentlyViewd = []
      if (!process.server) {
        recentlyViewd = localStorage.getItem('recent')
        if (recentlyViewd) {
          recentlyViewd = JSON.parse(recentlyViewd)
          if (!recentlyViewd) recentlyViewd = []
          recentlyViewd.reverse()
          if (!recentlyViewd.includes(id)) {
            // if (recentlyViewd.length > 10) {
            //   recentlyViewd = [];
            // }
            recentlyViewd.push(id)
            localStorage.setItem('recent', JSON.stringify(recentlyViewd))
          }
        } else {
          let productId = []
          productId.push(id)
          localStorage.setItem('recent', JSON.stringify(productId))
        }
      }
      try {
        this.$store.commit('clearErr')
        // this.product = (
        //   await this.$apollo.query({
        //     query: productSlug,
        //     variables: { slug: this.$route.params.slug }
        //     // fetchPolicy: 'no-cache'
        //   })
        // ).data.productSlug
        this.userSelectedVariant = this.product
        const rs = (
          await this.$apollo.query({
            query: reviewSummary,
            variables: { product: this.product && this.product.id },
          })
        ).data
        this.reviewSummary = rs.reviewSummary
        this.hasOrder = rs.hasOrder
        if (recentlyViewd && recentlyViewd.length > 0) {
          this.RecentlyViewedProducts = (
            await this.$apollo.query({
              query: productsByIds,
              variables: { ids: recentlyViewd },
            })
          ).data.productsByIds
        }
        // this.reviews = (
        //   await this.$apollo.query({
        //     query: productReviews,
        //     variables: { product: this.product.id }
        //   })
        // ).data.reviews
        // this.orderCount = (
        //   await this.$apollo.query({
        //     query: hasOrder,
        //     variables: { product: this.product.id }
        //   })
        // ).data.hasOrder
        // this.openclose = (await this.$apollo.query({ query: shutter })).data.shutter
      } catch (e) {
        this.$store.commit('setErr', e)
      } finally {
        this.$store.commit('busy', false)
      }
    },
    selectVariant(s) {
      this.userSelectedVariant = s
      this.$emit('variantChanged', s)
      this.selectedImgIndex = 0
    },
  },
  computed: {
    ...mapGetters({
      checkCart: 'cart/checkCart',
      settings: 'settings',
    }),
    ...mapGetters({ user: 'auth/user' }),
    calculateOffPercent() {
      if (!this.product || !this.product) return 0
      let percent =
        ((this.product.mrp - this.product.price) * 100) / this.product.mrp
      return Math.round(percent)
    },
    calculatePrice() {
      let price = 0
      if (this.product.price < this.product.mrp) {
        price = this.product.price
      } else {
        price = this.product.mrp
      }
      return price
    },
  },
  head() {
    // const host = process.server
    //   ? this.$ssrContext.req.headers.host
    //   : window.location.host
    return {
      title:
        (this.product && this.product.metaTitle) ||
        (this.product && this.product.name),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            (this.product && this.product.metaDescription) ||
            (this.product && this.product.description),
        },
        {
          hid: 'keywords',
          name: 'Keywords',
          property: 'keywords',
          content:
            (this.product && this.product.metaKeywords) ||
            (this.product && this.product.keywords),
        },

        // OpenGraph data
        {
          hid: 'og:title',
          name: 'og_title',
          property: 'og:title',
          content:
            (this.product && this.product.metaTitle) ||
            (this.product && this.product.name),
        },
        {
          hid: 'og:description',
          name: 'Description',
          property: 'og:description',
          content:
            (this.product && this.product.metaDescription) ||
            (this.product && this.product.description),
        },
        // {
        //   name: "og_url",
        //   property: "og:url",
        //   content:
        //     host + "/" + this.product &&
        //     this.product.slug + "?id=" + this.product &&
        //     this.product._id
        // },
        {
          name: 'og_image',
          property: 'og:image',
          content:
            (this.product &&
              this.settings &&
              this.settings.CDN_URL + this.product.img) ||
            this.settings.social_share,
        },
        {
          property: 'og:image:width',
          content: '600',
        },
        {
          property: 'og:image:height',
          content: '600',
        },
        // Twitter
        {
          name: 'twitter:title',
          content:
            (this.product && this.product.metaTitle) ||
            (this.product && this.product.name),
        },
        {
          name: 'twitter:description',
          content:
            (this.product && this.product.metaDescription) ||
            (this.product && this.product.description),
        },
        {
          name: 'twitter:image:src',
          content:
            (this.product &&
              this.settings &&
              this.settings.CDN_URL + this.product.img) ||
            this.settings.open_graph_image,
        },
        // Google / Schema.org markup:
        {
          hid: 'product_name',
          itemprop: 'name',
          content: this.product && this.product.name,
        },
        {
          hid: 'product_description',
          itemprop: 'description',
          content:
            (this.product && this.product.metaDescription) ||
            (this.product && this.product.description),
        },
        {
          hid: 'product_image',
          itemprop: 'image',
          content:
            (this.product &&
              this.settings &&
              this.settings.CDN_URL + this.product.img) ||
            this.settings.open_graph_image,
        },
        {
          hid: 'product_price',
          name: 'product_price',
          property: 'product:price',
          content: this.product && this.product.price,
        },
      ],
    }
  },
}
</script>

<style scoped></style>
