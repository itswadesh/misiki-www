<template>
  <!-- @submit.stop.prevent="submit(search)" -->
  <form
    novalidate
    autocomplete="off"
    class="w-full"
  >
    <div class="relative flex flex-row flex-1 sm:mx-3 md:mx-20 height">
      <!-- :placeholder="$t('Search for products, brands and more')" -->
      <input
        type="text"
        placeholder="Search for Foods"
        class="w-full p-2 pl-3 text-sm border-0 rounded-sm shadow-lg placeholder focus:outline-none focus:ring focus:ring-yellow-500"
        v-model="search"
      />
      <span class="my-auto -ml-8">
        <!-- search icon -->
        <svg
          class="w-5 h-5 text-sm text-gray-500 custom-class"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </span>
    </div>
  </form>
</template>

<script>
// import { typingTimeout } from '~/config'
// export default {
//   data() {
//     return {
//       search: '',
//     }
//   },
//   methods: {
//     submit(q) {
//       this.$router.push(`/search/${q}`)
//     },
//   },
//   watch: {
//     search: {
//       immediate: false,
//       handler(value, oldValue) {
//         // if (value.length < 4) return;
//         if (!oldValue) return // Do not trigger on page load
//         clearTimeout(this.typingTimer)
//         let vm = this
//         this.typingTimer = setTimeout(function () {
//           if (!value || value == 'undefined') value = '' // When clear button clicked
//           vm.searchString = value
//           vm.$router.push(`/search/${value}`)
//         }, typingTimeout)
//       },
//     },
//     '$route.params.q': {
//       immediate: true,
//       handler(value) {
//         let pathName = null
//         if (this.$route.name) pathName = this.$route.name.substr(0, 8)
//         if (pathName === 'category') return
//         if (!value || value == 'undefined') value = ''
//         if (value == '') return
//         if (this.search == '') this.search = value
//       },
//     },
//   },
// }
</script>

<style scoped>
img {
  margin-right: 1rem;
}
</style>
