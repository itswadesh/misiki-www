<template>
  <div>
    <Nav />
    <nuxt-link
    
      to="/login?role=chef"
      class="block px-2 py-1 mx-auto mt-24 font-medium text-center text-gray-700 bg-yellow-200 border-2 border-yellow-300 rounded shadow cursor-pointer sm:mt-16 hover:text-black hover:bg-yellow-300"
    >
      Get started as chef in 30 seconds
    </nuxt-link>
    <Hero />
    <div class="w-full mb-20">
      <Categories />
      <!-- <div class="block px-2 py-2 mx-auto mb-2 text-center bg-blue-200 border-2 border-blue-300 shadow">
        For delivery info:
        <span class="font-bold">8637260828</span> (Bheem)
      </div>
      <AllItems /> -->
      <Popular />
      <BestSellers />
    </div>
    <StickyFooter />
    <a
      href="https://api.whatsapp.com/send?phone=919078571888"
      target="_blank"
      class="fixed bottom-0 right-0 block w-12 h-12 mb-20 mr-4 bg-green-500 rounded-full cursor-pointer hover:shadow-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 32 32"
      >
        <path
          d=" M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.73.244-1.088 0-.058 0-.144-.03-.215-.1-.172-2.434-1.39-2.678-1.39zm-2.908 7.593c-1.747 0-3.48-.53-4.942-1.49L7.793 24.41l1.132-3.337a8.955 8.955 0 0 1-1.72-5.272c0-4.955 4.04-8.995 8.997-8.995S25.2 10.845 25.2 15.8c0 4.958-4.04 8.998-8.998 8.998zm0-19.798c-5.96 0-10.8 4.842-10.8 10.8 0 1.964.53 3.898 1.546 5.574L5 27.176l5.974-1.92a10.807 10.807 0 0 0 16.03-9.455c0-5.958-4.842-10.8-10.802-10.8z"
          fill-rule="evenodd"
          fill="white"
        ></path>
      </svg>
    </a>
  </div>
</template>

<script>
import Vue from 'vue'
import Nav from '~/components/home/Nav'

import Categories from '~/components/Categories'
import { Hero, Product } from '~/shared/components'
import StickyFooter from '~/components/StickyFooter'
import BestSellers from '~/components/home/BestSellers'
import Popular from '~/components/home/Popular'
import AllItems from '~/components/home/AllItems'
import RecentVisit from '~/components/home/RecentVisit'
import products from '~/gql/product/products.gql'
export default {
  components: {
    Hero,
    // Product,
    Categories,
    Nav,
    StickyFooter,
    BestSellers,
    // RecentVisit,
    Popular,
    AllItems,
  },
}
</script>
