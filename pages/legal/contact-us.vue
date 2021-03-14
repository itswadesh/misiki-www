<template>
  <div class="">
    <h1 class="mx-auto mt-8 text-5xl font-bold text-center mb:8 lg:mb-16">
      <span class="underline">Contact</span>
      Us
    </h1>
    <div class="flex flex-col justify-center">
      <div
        class="flex flex-wrap justify-center w-full px-2 mx-auto lg:px-16 xl:px-48 lg:mb-12"
      >
        <div
          class="w-full py-8 pr-0 my-4 mb-8 bg-white rounded shadow lg:bg-transparent lg:shadow-none lg:rounded-none lg:w-1/2 lg:pr-12"
        >
          <form
            novalidate
            @submit.stop.prevent="submit()"
            class="flex flex-col w-full px-2 mx-auto leading-loose lg:px-24"
          >
            <input
              type="text"
              v-model="email"
              placeholder="Your email"
              class="w-full px-2 mb-2 mr-4 text-xs bg-gray-100 border border-gray-400 rounded w-108 hover:bg-white focus:outline-none"
            />
            <textarea
              v-model="message"
              placeholder="Message"
              class="w-full h-32 px-2 mb-2 mr-4 text-xs bg-gray-100 border border-gray-400 rounded w-108 hover:bg-white focus:outline-none"
            />
            <button
              type="submit"
              :disabled="loading"
              class="flex items-center justify-center w-full h-12 py-2 text-2xl font-bold rounded outline-none"
              :class="{
                'primary text-white': !loading,
                'border border-gray-400 bg-gray-300': loading,
              }"
            >
              <div v-if="loading">
                <img src="/loading.svg" :class="{ loading: loading }" alt="" />
              </div>
              <span v-else>Send</span>
            </button>
          </form>
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
