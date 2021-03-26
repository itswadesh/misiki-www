<template>
  <div class="mb-6 h-60 md:h-64 lg:h-80 xl:h-96 sm:mb-0">
    <p class="flex justify-center">
      <!-- <img src="/loading.svg" v-if="loading" class="absolute z-10 justify-center block m-3" /> -->
      <progress
        v-if="loading"
        class="absolute z-10 justify-center block m-3 material-progress-circular"
      />
    </p>
    <!-- <SlideBarSkeleton v-if="skeleton" /> -->

    <VueSlickCarousel
      v-bind="settings"
      v-if="banners"
      class="relative h-60 md:h-64 lg:h-80 xl:h-96"
    >
      <template #prevArrow="arrowOption">
        <div
          class="invisible custom-arrow custom-arrow1 sm:visible hover:shadow-xl"
        >
          {{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }}
        </div>
      </template>

      <div
        v-for="b in banners.data"
        :key="b.id"
        class="overflow-hidden focus:outline-none"
      >
        <button @click="go(b.link)">
          <div
            class="m-5 shadow sm:shadow-none sm:m-2 rounded-2xl focus:outline-none"
          >
            <img
              v-lazy="b.img"
              class="object-cover w-full overflow-hidden border sm:p-2 sm:border-none h-60 md:object-cover lg:p-3 md:h-64 lg:h-80 xl:h-96 rounded-2xl focus:outline-none"
            />
          </div>
        </button>
      </div>
      <!-- v-if="loading" -->
      <template #nextArrow="arrowOption">
        <div
          class="invisible custom-arrow custom-arrow2 sm:visible hover:shadow-xl"
        >
          {{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }}
        </div>
      </template>
    </VueSlickCarousel>
  </div>
</template>

<script>
import SlideBarSkeleton from '~/components/AllSkeletons/SlideBarSkeleton'
import BANNERS from '~/gql/banner/banners.gql'

export default {
  data() {
    return {
      settings: {
        centerMode: true,
        centerPadding: '150px',
        centerMargin: '20px',
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 1,
        speed: 500,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              centerPadding: '110px',
              centerMargin: '20px',
              slidesToScroll: 1,
              focusOnSelect: true,
              infinite: true,
            },
          },
          {
            breakpoint: 768,
            settings: {
              centerPadding: '60px',
              centerMargin: '15px',
              slidesToScroll: 1,
              focusOnSelect: true,
              infinite: true,
            },
          },
          {
            breakpoint: 640,
            settings: {
              centerPadding: '0px',
              centerMargin: '15px',
              slidesToScroll: 1,
              focusOnSelect: true,
              infinite: true,
            },
          },
        ],
      },
      banners: null,
      skeleton: false,
      loading: false,
    }
  },
  components: { SlideBarSkeleton },
  async created() {
    this.getBanners()
  },
  methods: {
    go(url) {
      this.$router.push(this.localePath(url))
    },
    async getBanners() {
      this.loading = true
      // this.skeleton = true
      try {
        this.banners = (
          await this.$apollo.query({
            query: BANNERS,
            variables: {
              type: 'slider',
            },
            fetchPolicy: 'no-cache',
          })
        ).data.banners
      } catch (e) {
        // console.log(e)
      } finally {
        this.loading = false
        // this.skeleton = false
      }
    },
  },
}
</script>
<style scoped>
.custom-arrow {
  height: 80px;
  width: 46px;
  padding: 3px;
  padding-top: 23px;
  background: #777;
  border-radius: 5px;
  opacity: 0.75;
  z-index: 1;
}
.custom-arrow2[data-v-f2d6c0b2] {
  margin-right: 25px;
}
.custom-arrow1[data-v-f2d6c0b2] {
  margin-left: 25px;
}
.slick-prev {
  left: 20px;
}
.slick-next {
  right: 30px;
}

.slick-prev:before,
.slick-next:before {
  /* font-famiy: "slick"; */
  font-size: 40px;
  line-height: 1;
  opacity: 1;
  color: white;
  -webkit-font-smoothing: antialiased;
}
</style>
