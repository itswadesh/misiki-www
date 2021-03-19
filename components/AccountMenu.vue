<template>
  <div class="flex flex-col lg:w-1/4">
    <div
      v-if="user"
      class="w-full p-10 leading-loose text-center bg-white border-b border-gray-200 shadow lg:mt-10"
    >
      <div class="mb-2">
        <img
          v-if="user.avatar"
          class="inline-block object-cover w-16 h-16 rounded-full"
          v-lazy="user.avatar"
          alt
        />
        <span
          v-else
          class="inline-block w-20 h-20 p-2 text-4xl text-gray-600 bg-gray-200 rounded-full"
          >{{ user.firstName | first }}</span
        >
      </div>
      <div class="text-lg">{{ user.firstName }} {{ user.lastName }}</div>
      <div class="text-sm text-gray-500">{{ user.phone }}</div>
    </div>
    <div class="h-full p-8 bg-gray-200">
      <div class="flex justify-center">
        <nav id="nav" class="relative w-full">
          <span
            class="absolute w-full h-10 transition-transform ease-out bg-white rounded-lg shadow transition-medium"
            :style="{ transform: `translateY(calc(100% * ${selected}))` }"
          ></span>
          <ul class="relative">
            <li>
              <button
                type="button"
                @click="select(0, '/my/orders')"
                :aria-selected="selected === 0"
                class="flex items-center w-full px-3 py-2 focus:outline-none focus-visible:underline"
              >
                <svg
                  :class="selected === 0 ? 'text-indigo-400' : 'text-gray-500'"
                  class="w-6 h-6 transition-all ease-out transition-medium"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 7a1 1 0 011-1h8a1 1 0 011 1v8a1 1 0 11-2 0V8h-7a1 1 0 01-1-1z"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M20.707 7.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0L9 12.414l-5.293 5.293a1 1 0 01-1.414-1.414l6-6a1 1 0 011.414 0L13 13.586l6.293-6.293a1 1 0 011.414 0z"
                  />
                </svg>
                <span
                  :class="selected === 0 ? 'text-indigo-600' : 'text-gray-700'"
                  class="ml-2 text-sm font-medium transition-all ease-out transition-medium"
                  >Orders</span
                >
              </button>
            </li>
            <li>
              <button
                type="button"
                @click="select(1, '/my/address')"
                :aria-selected="selected === 1"
                class="flex items-center w-full px-3 py-2 focus:outline-none focus-visible:underline"
              >
                <svg
                  :class="selected === 1 ? 'text-indigo-400' : 'text-gray-500'"
                  class="w-6 h-6 transition-all ease-out transition-medium"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.707 2.293a1 1 0 00-1.414 0l-9 9a1 1 0 101.414 1.414L4 12.414V21a1 1 0 001 1h5a1 1 0 001-1v-6h2v6a1 1 0 001 1h5a1 1 0 001-1v-8.586l.293.293a1 1 0 001.414-1.414l-9-9zM18 10.414l-6-6-6 6V20h3v-6a1 1 0 011-1h4a1 1 0 011 1v6h3v-9.586z"
                  />
                </svg>
                <span
                  :class="selected === 1 ? 'text-indigo-600' : 'text-gray-700'"
                  class="ml-2 text-sm font-medium transition-all ease-out transition-medium"
                  >Address</span
                >
              </button>
            </li>
            <li>
              <button
                type="button"
                @click="select(2, '/my/profile')"
                :aria-selected="selected === 2"
                class="flex items-center w-full px-3 py-2 focus:outline-none focus-visible:underline"
              >
                <svg
                  :class="selected === 2 ? 'text-indigo-400' : 'text-gray-500'"
                  class="w-6 h-6 transition-all ease-out transition-medium"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.46a1 1 0 0 1 1.42-1.42 3 3 0 0 0 4.24 0 1 1 0 0 1 1.42 1.42 5 5 0 0 1-7.08 0zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
                  />
                </svg>
                <span
                  :class="selected === 2 ? 'text-indigo-600' : 'text-gray-700'"
                  class="ml-2 text-sm font-medium transition-all ease-out transition-medium"
                  >Profile Details</span
                >
              </button>
            </li>
            <!-- <li>
              <button
                type="button"
                @click="select(3, '/feedback')"
                :aria-selected="selected === 3"
                class="flex items-center w-full px-3 py-2 focus:outline-none focus-visible:underline"
              >
                <svg
                  :class="selected === 3 ? 'text-indigo-400' : 'text-gray-500'"
                  class="w-6 h-6 transition-all ease-out transition-medium"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12.76 3.76a6 6 0 0 1 8.48 8.48l-8.53 8.54a1 1 0 0 1-1.42 0l-8.53-8.54a6 6 0 0 1 8.48-8.48l.76.75.76-.75zm7.07 7.07a4 4 0 1 0-5.66-5.66l-1.46 1.47a1 1 0 0 1-1.42 0L9.83 5.17a4 4 0 1 0-5.66 5.66L12 18.66l7.83-7.83z"
                  />
                </svg>
                <span
                  :class="selected === 3 ? 'text-indigo-600' : 'text-gray-700'"
                  class="ml-2 text-sm font-medium transition-all ease-out transition-medium"
                  >Wishlist</span
                >
              </button>
            </li> -->
            <li>
              <button
                type="button"
                @click="select(4, '/feedback')"
                :aria-selected="selected === 4"
                class="flex items-center w-full px-3 py-2 focus:outline-none focus-visible:underline"
              >
                <svg
                  :class="selected === 4 ? 'text-indigo-400' : 'text-gray-500'"
                  class="w-6 h-6 transition-all ease-out transition-medium"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M2 15V5c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v15a1 1 0 0 1-1.7.7L16.58 17H4a2 2 0 0 1-2-2zM20 5H4v10h13a1 1 0 0 1 .7.3l2.3 2.29V5z"
                  />
                </svg>
                <span
                  :class="selected === 4 ? 'text-indigo-600' : 'text-gray-700'"
                  class="ml-2 text-sm font-medium transition-all ease-out transition-medium"
                  >Feedback</span
                >
              </button>
            </li>
            <li>
              <button
                type="button"
                @click="select(5, '/legal/about-us')"
                :aria-selected="selected === 5"
                class="flex items-center w-full px-3 py-2 focus:outline-none focus-visible:underline"
              >
                <svg
                  :class="selected === 5 ? 'text-indigo-400' : 'text-gray-500'"
                  class="w-6 h-6 transition-all ease-out transition-medium"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M2 15V5c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v15a1 1 0 0 1-1.7.7L16.58 17H4a2 2 0 0 1-2-2zM20 5H4v10h13a1 1 0 0 1 .7.3l2.3 2.29V5z"
                  />
                </svg>
                <span
                  :class="selected === 5 ? 'text-indigo-600' : 'text-gray-700'"
                  class="ml-2 text-sm font-medium transition-all ease-out transition-medium"
                  >About Us</span
                >
              </button>
            </li>
            <li>
              <button
                type="button"
                @click="select(6, '/legal/privacy-policy')"
                :aria-selected="selected === 6"
                class="flex items-center w-full px-3 py-2 focus:outline-none focus-visible:underline"
              >
                <svg
                  :class="selected === 6 ? 'text-indigo-400' : 'text-gray-500'"
                  class="w-6 h-6 transition-all ease-out transition-medium"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M2 15V5c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v15a1 1 0 0 1-1.7.7L16.58 17H4a2 2 0 0 1-2-2zM20 5H4v10h13a1 1 0 0 1 .7.3l2.3 2.29V5z"
                  />
                </svg>
                <span
                  :class="selected === 6 ? 'text-indigo-600' : 'text-gray-700'"
                  class="ml-2 text-sm font-medium transition-all ease-out transition-medium"
                  >Privacy Policy</span
                >
              </button>
            </li>
            <li>
              <button
                type="button"
                @click="select(7, '/legal/terms')"
                :aria-selected="selected === 7"
                class="flex items-center w-full px-3 py-2 focus:outline-none focus-visible:underline"
              >
                <svg
                  :class="selected === 7 ? 'text-indigo-400' : 'text-gray-500'"
                  class="w-6 h-6 transition-all ease-out transition-medium"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M2 15V5c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v15a1 1 0 0 1-1.7.7L16.58 17H4a2 2 0 0 1-2-2zM20 5H4v10h13a1 1 0 0 1 .7.3l2.3 2.29V5z"
                  />
                </svg>
                <span
                  :class="selected === 7 ? 'text-indigo-600' : 'text-gray-700'"
                  class="ml-2 text-sm font-medium transition-all ease-out transition-medium"
                  >Terms</span
                >
              </button>
            </li>
            <li>
              <button
                type="button"
                @click="logout"
                class="flex items-center w-full px-3 py-2 focus:outline-none focus-visible:underline"
              >
                <svg
                  class="w-6 h-6 text-gray-500 transition-all ease-out transition-medium"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7 10a3 3 0 013-3h8a3 3 0 013 3v8a3 3 0 01-3 3h-8a3 3 0 01-3-3v-8zm3-1a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1v-8a1 1 0 00-1-1h-8z"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3 6a3 3 0 013-3h10a1 1 0 110 2H6a1 1 0 00-1 1v10a1 1 0 11-2 0V6z"
                  />
                </svg>
                <span
                  class="ml-2 text-sm font-medium text-gray-700 transition-all ease-out transition-medium"
                  >Logout</span
                >
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      selected: 0,
    }
  },
  computed: {
    ...mapGetters({ user: 'auth/user' }),
  },
  methods: {
    select(i, url) {
      this.selected = i
      this.$router.push(url)
    },
    async logout() {
      this.$store.dispatch('auth/logout')
    },
  },
}
</script>

<style scoped>
.ease-in {
  transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
}
.ease-out {
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
}
.ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.transition-fastest {
  transition-duration: 75ms;
}
.transition-faster {
  transition-duration: 100ms;
}
.transition-fast {
  transition-duration: 150ms;
}
.transition-medium {
  transition-duration: 200ms;
}
.transition-slow {
  transition-duration: 300ms;
}
.transition-slower {
  transition-duration: 500ms;
}
.transition-slowest {
  transition-duration: 700ms;
}

.transition-all {
  transition-property: all;
}
.transition-opacity {
  transition-property: opacity;
}
.transition-transform {
  transition-property: transform;
}

.focus-visible.focus-visible\:underline {
  text-decoration: underline;
}
</style>
