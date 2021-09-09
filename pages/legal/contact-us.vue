<template>
  <div class="">
    <h1
      class="w-full mx-auto mt-16 text-5xl font-bold text-center mb:8 lg:mb-16"
    >
      <span class="underline">Contact</span>
      Us
    </h1>
    <div class="">
      <div class="container px-2 mx-auto">
        <div
          class="
            flex flex-wrap
            items-start
            justify-center
            py-8
            pr-0
            mx-auto
            my-4
            mb-8
            bg-white
            rounded
            shadow
            lg:bg-transparent lg:shadow-none lg:rounded-none
          "
        >
          <div class="overflow-hidden bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                Business Information
              </h3>
              <p class="max-w-2xl mt-1 text-sm text-gray-500">
                Business details and contact info.
              </p>
            </div>
            <div class="border-t border-gray-200">
              <dl>
                <div
                  class="
                    px-4
                    py-5
                    bg-gray-50
                    sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6
                  "
                >
                  <dt class="text-sm font-medium text-gray-500">Address</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    RO-10, Zyrardow - 36-316, Poland
                  </dd>
                </div>
                <div
                  class="
                    px-4
                    py-5
                    bg-white
                    sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6
                  "
                >
                  <dt class="text-sm font-medium text-gray-500">Phone</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    +48-9078571888
                  </dd>
                </div>
                <div
                  class="
                    px-4
                    py-5
                    bg-gray-50
                    sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6
                  "
                >
                  <dt class="text-sm font-medium text-gray-500">
                    Delivery Time
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    7:00PM - 9:00PM (Daily)
                  </dd>
                </div>
                <div
                  class="
                    px-4
                    py-5
                    bg-white
                    sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6
                  "
                >
                  <dt class="text-sm font-medium text-gray-500">
                    Platform Open Time
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    7:00AM - 6:00PM (Daily)
                  </dd>
                </div>
                <div
                  class="
                    px-4
                    py-5
                    bg-gray-50
                    sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6
                  "
                >
                  <dt class="text-sm font-medium text-gray-500">Email</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    hi@foodaffair.club
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div class="ml-2 overflow-hidden bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                Contact Form
              </h3>
              <p class="max-w-2xl mt-1 text-sm text-gray-500">
                We will respond within 24hrs.
              </p>
            </div>
            <div class="border-t border-gray-200">
              <form
                novalidate
                @submit.stop.prevent="submit()"
                class="px-2 leading-loose"
              >
                <input
                  type="text"
                  v-model="email"
                  placeholder="Your email"
                  class="
                    w-full
                    px-2
                    mb-2
                    mr-4
                    text-xs
                    bg-gray-100
                    border border-gray-400
                    rounded
                    w-108
                    hover:bg-white
                    focus:outline-none
                  "
                />
                <textarea
                  v-model="message"
                  placeholder="Message"
                  class="
                    w-full
                    h-32
                    px-2
                    mb-2
                    mr-4
                    text-xs
                    bg-gray-100
                    border border-gray-400
                    rounded
                    w-108
                    hover:bg-white
                    focus:outline-none
                  "
                />
                <button
                  type="submit"
                  :disabled="loading"
                  class="
                    flex
                    items-center
                    justify-center
                    w-full
                    h-12
                    py-2
                    text-2xl
                    font-bold
                    rounded
                    outline-none
                  "
                  :class="{
                    'primary text-white': !loading,
                    'border border-gray-400 bg-gray-300': loading,
                  }"
                >
                  <div v-if="loading">
                    <img
                      src="/loading.svg"
                      :class="{ loading: loading }"
                      alt=""
                    />
                  </div>
                  <span v-else>Send</span>
                </button>
              </form>
            </div>
          </div>
        </div>
        <!-- <div class="w-full lg:w-1/2"> -->
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      disable: 'disable',
      msg: null,
      err: null,
      email: '',
      message: '',
    }
  },
  computed: {
    isEmail() {
      if (this.email.includes('@')) return true
      else return false
    },
  },
  methods: {
    async submit() {
      if (!this.email || this.email == '') {
        return this.$toast
          .error('Please enter your email/phone no')
          .goAway(3000)
      }
      if (!this.isEmail) {
        return this.$toast.error('Entered email is not valid').goAway(3000)
      }
      try {
        this.loading = true
        const res = this.$axios.$post('/api/email/contactus', {
          from: this.email,
          subject: 'Conact from Litekart Demo',
          text: this.message,
        })
        this.msg = 'Thank you for message. We will get back to you soon'
      } catch (e) {
        this.err = e
        console.log('err...', e.toString())
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped></style>
