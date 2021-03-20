<template>
  <div class="bg-gray-100">
    <Heading title="Personal Details" />
    <div class="container flex flex-row max-w-full p-4 mx-auto sm:p-8">
    <AccountMenu  />
    <div class="w-full h-screen px-3 py-5 mt-0 bg-white shadow md:px-10 lg:h-auto lg:ml-8 lg:w-3/4">
      <form
        class="w-full mb-1 lg:mx-15 form"
        novalidate
        autocomplete="off"
        @submit.stop.prevent="submit(profile)"
      >
        <div class="p-2" v-if="a">
          <!-- <Avatar
            :image="profile.avatar"
            name="avatar"
            folder="avatar"
            @remove="removeImage"
            @save="saveImage"
          /> -->
          <div
            type="tel"
            label="Phone"
            class="w-full mb-4 text-center"
            name="name"
          >
            Phone: {{ profile.phone }}
          </div>
          <div class="flex justify-between w-full mb-4">
            <Textbox
              label="First Name"
              class="w-1/2 mr-1"
              name="firstName"
              v-model="profile.firstName"
            />
            <Textbox
              label="Last Name"
              class="w-1/2 ml-1"
              name="lastName"
              v-model="profile.lastName"
            />
          </div>
          <Textbox
            label="Email"
            class="w-full mb-4"
            name="email"
            v-model="profile.email"
          />
          <!-- <Textbox
            label="Address"
            class="w-full mb-4"
            name="name"
            v-model="a.address"
          />
          <Textbox
            type="tel"
            label="Pin Code"
            class="w-full mb-4"
            name="name"
            v-model="a.zip"
          />
          <Textbox
            label="District"
            class="w-full mb-4"
            name="name"
            v-model="a.district"
          />
          <div class="flex justify-between w-full mb-4">
            <Textbox
              label="City"
              class="w-1/2 mr-1"
              name="name"
              v-model="a.city"
            />
            <Textbox
              label="State"
              class="w-1/2 ml-1"
              name="name"
              v-model="a.state"
            />
          </div> -->
        </div>
        <div
          class="fixed bottom-0 left-0 flex justify-between w-full shadow lg:shadow-none lg:relative"
        >
          <button
            type="button"
            @click="$router.push('/my')"
            class="w-1/2 p-3 text-sm font-semibold tracking-widest text-black bg-white lg:rounded"
          >
            CANCEL
          </button>
          <button
            type="submit"
            class="w-1/2 p-3 text-sm font-semibold tracking-widest primary lg:rounded"
          >
            CONTINUE
          </button>
        </div>
      </form>
    </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions } from 'vuex'
import { Avatar, Heading } from '~/shared/components'
import { Textbox, Checkbox } from '~/shared/components/ui'
import me from '~/gql/user/me.gql'
import AccountMenu from '~/components/AccountMenu'

import { location } from '~/shared/mixins'
export default {
  middleware: ['isAuth'],
  mixins: [location],
  data() {
    return {
      a: {},
      profile: {},
      nwErr: null,
      graphErr: null,
    }
  },
  components: {
    Heading,
    Textbox,
    Checkbox,
    Avatar,
    AccountMenu,
  },
  computed: {
    // user() {
    //   return (this.$store.state.auth || {}).user || null;
    // }
  },
  async mounted() {
    try {
      this.$store.commit('busy', true)
      const user = (
        await this.$apollo.query({ query: me, fetchPolicy: 'no-cache' })
      ).data.me
      this.profile = { ...user }
      // this.a = this.$cookies.get('geo')
      // this.profile.address = this.profile.address || {}
      // this.a.address =
      //   this.profile.address.address || (this.a && this.a.address)
      // this.a.district =
      //   this.profile.address.district || (this.a && this.a.district)
      // this.a.city = this.profile.address.city || (this.a && this.a.city)
      // this.a.zip = (
      //   this.profile.address.zip ||
      //   (this.a && this.a.zip)
      // ).toString()
      // this.a.firstName =
      //   this.profile.address.firstName || this.profile.firstName
      // this.a.lastName = this.profile.address.lastName || this.profile.lastName
      // this.a.phone = this.profile.phone
      // if (!this.profile.info) this.profile.info = {};
      // this.profile.public = this.profile.info.public || false;
      // this.profile.restaurant = this.profile.info.restaurant;
    } catch (e) {
      this.$store.commit('setErr', e)
    } finally {
      this.$store.commit('busy', false)
    }
  },
  methods: {
    saveImage(name, image) {
      this.profile.avatar = image
      this.saveProfile()
    },
    removeImage(name) {
      this.profile.avatar = ''
      this.saveProfile()
    },
    ...mapActions({
      updateProfile: 'auth/updateProfile',
    }),
    go(url) {
      this.$router.push(url)
    },
    submit() {
      try {
        this.saveProfile()
        this.$router.push('/my')
      } catch (e) {}
    },
    async saveProfile() {
      try {
        this.$store.commit('busy', true)
        // this.profile.restaurant = this.profile.info.restaurant;
        // this.profile.public = !!this.profile.info.public;
        // this.profile.address = this.a;
        delete this.profile.address.__typename
        delete this.profile.info.__typename
        return await this.updateProfile(this.profile)
      } catch (e) {
        this.$store.commit('setErr', e)
      } finally {
        this.$store.commit('busy', false)
      }
    },
  },
  layout: 'none',
}
</script>

<style scoped>
/* form */
form {
  display: inline-block;
}
.field {
  padding-top: 10px;
  display: flex;
  flex-direction: column;
}
label {
  order: -1;
  padding-left: 5px;
  font-size: 14px;
  transition: all 0.3s ease-in;
  transform: translateY(30px);
  pointer-events: none;
}
input:focus + label,
textarea:focus + label {
  transform: translateY(16px);
}
/* form ends */
</style>
