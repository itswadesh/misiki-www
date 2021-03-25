<template>
  <div class="mb-48">
    <Heading title="Join as Chef" />
    <form
      novalidate
      @submit.stop.prevent="save(profile)"
      v-if="profile"
      autocomplete="disabled"
    >
      <div class="mx-4 my-4">
        <div class="flex items-center justify-between mb-4">
          <Textbox
            autocomplete="disabled"
            class="w-full mr-4"
            type="text"
            name="name"
            autofocus
            v-model="profile.restaurant"
            label="Kitchen Name"
          />&nbsp;&nbsp;
          <div class="text-red-500">(Public)</div>
        </div>
        <div class="flex items-center justify-between mb-4">
          <Textbox
            autocomplete="disabled"
            class="w-full mr-4"
            type="text"
            name="name"
            autofocus
            v-model="profile.firstName"
            label="First Name"
          />
          <div class="text-green-500">(Private)</div>
        </div>
        <div class="flex items-center justify-between mb-4">
          <Textbox
            autocomplete="disabled"
            class="w-full mr-4"
            type="text"
            name="name"
            autofocus
            v-model="profile.lastName"
            label="Last Name"
          />
          <div class="text-green-500">(Private)</div>
        </div>
        <div class="flex items-center justify-between mb-4">
          <Textbox
            autocomplete="disabled"
            class="w-full mr-4"
            type="text"
            name="email"
            v-model="profile.email"
            label="Email"
          />
          <div class="text-green-500">(Private)</div>
        </div>
        <div class="flex items-center justify-between mb-4">
          <Textbox
            autocomplete="disabled"
            v-if="profile.address"
            class="w-full mr-4"
            type="text"
            name="name"
            v-model="profile.address.address"
            label="Address"
          />
          <div class="text-green-500">(Private)</div>
        </div>
        <!-- <div class="flex items-center justify-between mb-4">
          <label>City:</label>
          <select name="city" v-model="profile.address.city" :items="cities"></select>
          <span class="text-green-500">(Private)</span>
        </div>-->
      </div>
      <button
        type="submit"
        class="fixed bottom-0 w-full p-3 text-sm font-semibold tracking-widest primary"
      >
        Save Changes
      </button>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { Heading } from '~/shared/components'
import { Textbox } from '~/shared/components/ui'
// import Nav from '~/components/home/Nav.vue'

export default {
  components: {
    Heading,
    Textbox,
    // Nav,
  },
  middleware: ['isAuth'],
  async asyncData({ store }) {
    let profile = { address: {} }
    let userDetails = await store.dispatch('auth/fetch')
    profile = Object.assign({}, userDetails)
    profile.address = profile.address || {}
    return { profile }
  },
  data() {
    return {
      profile: {},
      user: null,
      showImageModal: false,
      userAvatar: null,
    }
  },
  computed: {
    ...mapGetters({
      loading: 'loading',
    }),
  },
  methods: {
    ...mapActions({ updateProfile: 'auth/updateProfile' }),
    save(profile) {
      if (!this.profile.restaurant) {
        this.$store.commit('setErr', 'Please enter Display Name')
        return
      } else if (!this.profile.firstName) {
        this.$store.commit('setErr', 'Please enter firstName')
        return
      } else if (!this.profile.lastName) {
        this.$store.commit('setErr', 'Please enter lastName')
        return
      } else if (!this.profile.address.address) {
        this.$store.commit('setErr', 'Please enter address')
        return
      }
      profile.role = 'chef'
      delete profile.info.__typename
      delete profile.address.__typename
      this.updateProfile(profile)
      this.$router.push('/success-chef')
    },
  },
  watch: {
    // userAvatar: function(avatar) {
    //   this.user.avatar = avatar;
    // }
  },
  created() {},
  head() {
    return {
      title: 'Update your profile',
    }
  },
}
</script>
