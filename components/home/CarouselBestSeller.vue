<template>
  <div
    class="w-full px-2 mx-auto my-4"
    v-if="products && products[0] && products[0].items"
  >
    <div class="flex justify-center mx-4 border-b">
      <p
        class="pb-2 mt-2 text-center border-b2 text-accent-600 border-accent-600 md:ml-6 md:mt-4"
      >
        {{ title }}
      </p>
    </div>
    <VueSlickCarousel v-bind="settings" class="flex">
      <div v-for="p in products[0].items" :key="p.id" class>
        <ProductBestseller :product="p" />
      </div>
    </VueSlickCarousel>
  </div>
</template>

<script>
import ProductBestseller from '~/components/ProductBestseller.vue'

export default {
  props: ['title', 'products'],
  data() {
    return {
      settings: {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 5,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
        ],
      },
    }
  },
  components: {
    ProductBestseller,
  },
}
</script>

<style scoped></style>
