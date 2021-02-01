<template>
  <div>
    <div class="flex justify-center">
      <SelectablePlan
        class="filter"
        v-for="f in foodFilters"
        :key="f.name"
        :name="f.name"
        :value="f.value"
        :color="f.color"
        v-model="type"
        @onUpdatePlan="filter"
      ></SelectablePlan>
    </div>
    <Banner />
    <div class="container min-h-screen">
      <!-- <Categories /> -->
      <div
        class
        v-infinite-scroll="loadMore"
        :infinite-scroll-distance="3"
        :infinite-scroll-immediate-check="true"
      >
        <content-loader
          v-if="loading"
          :height="100"
          :speed="2"
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
        >
          <rect x="20" y="15" rx="4" ry="4" width="100" height="70" />
          <rect x="140" y="20" rx="4" ry="4" width="100" height="10" />
          <rect x="140" y="40" rx="4" ry="4" width="120" height="8" />
          <rect x="350" y="15" rx="25" ry="25" width="25" height="25" />
          <rect x="340" y="45" rx="4" ry="4" width="50" height="8" />
        </content-loader>
        <!-- <transition-group
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
          @beforeLeave="beforeLeave"
          :css="false"
          name="slide-up"
        > -->
        <ListCard class="slide-up-item" v-for="p in data" :key="p.id" :p="p" />
        <!-- </transition-group> -->
      </div>
      <div v-if="data.length < 1 && !loading" class="mt-64 text-center">
        No items found. Please modify your search
      </div>
    </div>
    <GeoLocation />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import {
  Heading,
  Banner,
  Product,
  ListCardSkeleton,
  Categories,
  GeoLocation,
  SelectablePlan,
} from '~/../shared/components'
import { ContentLoader } from 'vue-content-loader'
import ListCard from '~/components/ListCard'
import { infiniteScroll } from '~/../shared/mixins'
import { constructURL } from '~/../shared/lib/'
import SEARCH from '~/../shared/gql/product/search.gql'
// import gsap from 'gsap'

export default {
  layout: 'search',
  mixins: [infiniteScroll],
  data() {
    return {
      type: '',
      model: SEARCH,
      attr: 'search',
      foodFilters: [
        { name: 'Veg', value: 'V', color: 'green' },
        { name: 'Non Veg', value: 'N', color: 'red' },
        { name: 'All', value: '', color: 'gray' },
      ],
    }
  },
  components: {
    Heading,
    Banner,
    Product,
    Categories,
    ListCard,
    ListCardSkeleton,
    GeoLocation,
    SelectablePlan,
    ContentLoader,
  },
  created() {
    this.type = this.$route.query.type || ''
  },
  mounted() {
    this.getData() // Creates server rendering issue unless placed here
    // Animates when typed into search box too
    // gsap.from('.filter', {
    //   x: -200,
    //   duration: 0.5,
    //   opacity: 0,
    //   z: 0.5,
    // })
  },
  computed: { ...mapGetters({ loading: 'loading' }) },
  methods: {
    // beforeEnter(el) {
    //   gsap.from(el, {
    //     x: -200,
    //     y: 200,
    //     duration: 0.5,
    //     opacity: 0,
    //     scale: 0.1,
    //     ease: 'power1',
    //     stagger: 0.2,
    //   })
    // },
    // enter(el, done) {},
    // beforeLeave(el) {},
    // leave(el, done) {
    //   gsap.to(el, {
    //     position: 'absolute',
    //     x: 200,
    //     duration: 0.3,
    //     opacity: 0,
    //     onComplete: done,
    //     scale: 0,
    //     ease: 'power1',
    //   })
    // },
    filter() {
      this.$router.push(
        `/search/${this.$route.params.q || ''}?type=${this.type}`
      )
    },
  },
}
</script>
<style scoped>
.slide-up-move {
  transition: transform 1s;
}
/* .slide-up-item {
  transition: all 1s;
}
.slide-up-enter {
  transform: translateX(100px);
  opacity: 0;
}
.slide-up-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}
.slide-up-leave-active {
  position: absolute;
} */
/* .slide-left-enter {
  transform: translateY(10px);
  opacity: 0;
}

.slide-left-enter-active {
  transition: all 2s ease;
}
.slide-up-enter {
  transform: translateY(10px);
  opacity: 0;
}

.slide-up-enter-active {
  transition: all 0.2s ease;
}
.list-enter-active {
  animation: add-item 1s;
}

.list-leave-active {
  position: absolute;
  animation: add-item 1s reverse;
}

.list-move {
  transition: transform 1s;
}
@keyframes add-item {
  0% {
    opacity: 0;
    transform: translateX(150px);
  }
  50% {
    opacity: 0.5;
    transform: translateX(-10px) skewX(20deg);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
} */
</style>
