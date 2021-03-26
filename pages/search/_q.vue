<template>
  <div>
    <div class="flex justify-center mt-24 lg:mt-20">
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
    <div class="container min-h-screen mx-auto">
      <!-- <Categories /> -->
      <div v-if="loading && data && data.length" class="text-center">
        Loading.......
      </div>
      <div
        v-infinite-scroll="loadMore"
        :infinite-scroll-distance="3"
        :infinite-scroll-immediate-check="true"
        class="flex flex-wrap"
      >
        <!-- <transition-group
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
          @beforeLeave="beforeLeave"
          :css="false"
          name="slide-up"
        > -->
        <ListCard
          class="w-full slide-up-item lg:w-1/2 xl:w-1/3"
          v-for="p in data"
          :key="p.id"
          :p="p"
        />
        <!-- </transition-group> -->
      </div>
      <div v-if="data.length < 1 && !loading" class="mt-64 text-center">
        No items found. Please modify your search
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Nav from '~/components/home/Nav'

import {
  Heading,
  Banner,
  Product,
  ListCardSkeleton,
  Categories,
  SelectablePlan,
} from '~/shared/components'
import ListCard from '~/components/ListCard'
import { infiniteScroll } from '~/shared/mixins'
import { constructURL } from '~/shared/lib/'
import SEARCH from '~/gql/product/search.gql'

export default {
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
    Nav,
    Heading,
    Banner,
    Product,
    Categories,
    ListCard,
    ListCardSkeleton,
    SelectablePlan,
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
