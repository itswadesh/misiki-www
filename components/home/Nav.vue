<template>
  <div class="flex flex-col">
    <div
      v-if="!settings.websiteName"
      class="px-4 py-2 font-thin tracking-wide text-center text-yellow-900 bg-gray-800"
    >
      We experiencing an incident and we are on it.
    </div>
    <header class="fixed top-0 z-10 w-full h-auto p-3 bg-yellow-600 shadow-lg" >
      <div>
      <div class="flex flex-row justify-between mx-auto xl:container">
        <div class="my-auto text-white">
          <nuxt-link to="/">
            <div class="my-auto text-xl">{{ settings.websiteName }}</div>
          </nuxt-link>
        </div>
        <Search class="hidden sm:flex" />
        <!--right header block -->
        <div class="flex flex-row">
          <div
            class="sticky z-20 flex flex-row items-center my-auto mr-3 text-sm text-white flex-nowrap"
          >
            <div @click="isOpen = !isOpen">
              <span
                v-if="!user"
                class="my-auto tracking-wider cursor-pointer text-normal"
                @click="showLogin"
                >Login</span
              >
              <span v-else class="cursor-pointer">
                <nuxt-link
                  to="/"
                  class="flex flex-col items-center mx-auto"
                >
                  <svg
                    class="inline w-8 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <!-- <UserIcon class="inline" size="1.4x" /> -->
                  <p class="mx-auto text-center text-white text-normal">
                    {{ user && user.firstName }}
                  </p>
                </nuxt-link>
              </span>
            </div>
          </div>
          <!-- :to="localePath('index')" -->
          <nuxt-link to="/cart" class="my-auto text-white">
            <div class="relative flex flex-col">
              <!-- cart icon -->
              <svg
                class="relative w-6 h-6 mt-2 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                />
              </svg>
              <div
                v-if="cart"
                class="absolute top-0 right-0 flex items-center justify-center w-5 h-5 -mt-1 text-xs text-center text-white bg-yellow-300 rounded-full me-1"
              >
                {{ cart.qty }}
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
              <Search class="mt-2 sm:hidden" />

      </div>
    </header>
  </div>
</template>

<script>
// import CART from '~/gql/cart/cart.gql'
import Search from '~/components/Search'
export default {
  components: {
    Search,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      isOpen: false,
      isOpenMore: false,
    }
  },
  computed: {
    settings() {
      return this.$store.state.settings || {}
    },
    user() {
      return (this.$store.state.auth || {}).user
    },
    cart() {
      return this.$store.state.cart
    },
  },
  // async created() {
  // console.log(this.user)
  // console.log(this.$router.path.name)
  // console.log(this.cart, 'nnnnnnnnnnnnnn')
  // await this.getCart()
  // },
  methods: {
    showLogin() {
      if (!this.user) {
        this.$router.push('/login')
      }
    },
    // async getCart() {
    //   console.log('add to tt', this.cart)
    //   try {
    //     this.cart = (
    //       await this.$apollo.query({
    //         query: CART,
    //         fetchPolicy: 'no-cache',
    //       })
    //     ).data.cart
    //     console.log('add to carttttttt', this.cart)
    //   } catch (e) {
    //     console.log(e)
    //   } finally {
    //   }
    // },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text-xs {
  font-size: 0.675rem;
  line-height: 1.1rem;
  margin-left: 1px;
}
.-mb-1 {
  margin-bottom: 4px;
}
.margin {
  margin-left: 11.5rem;
  /* margin-right: 11.5rem; */
}

.custom-class {
  margin-top: 6px;
}
.height {
  height: 2.4rem;
}
.login {
  padding: 2px;
  width: 7.5rem;
  height: 2.1rem;
  text-align: center;
  /* margin-right: 8rem; */
  /* margin-left: -32px; */
}
/* .qty {
  margin-top: 3px;
  position: absolute;
  top: 9px;
  text-align: center;
  border-radius: 7px;
  width: 18px;
  height: 18px;
  background-color: #ff6161;
  border: 1px solid #fff;
  color: #f0f0f0;
  line-height: 16px;
  font-size: 12px;
} */
.frosted {
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  /* background-color: hsla(0, 0%, 100%, 0.75); */
}
</style>
