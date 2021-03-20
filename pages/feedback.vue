<template>
  <div>
    <Heading title="Feedback" />
    <div class="container flex flex-row max-w-full p-4 mx-auto sm:p-8">
    <AccountMenu class="" />
    <div class="w-full h-screen px-3 py-5 mt-0 bg-white shadow md:px-10 lg:h-auto lg:ml-8 lg:w-3/4">
      <form
        novalidate
        autocomplete="off"
        @submit.stop.prevent="submit(message)"
        class="mx-2"
      >
        <Textarea v-model="message" ref="message" label="Message" />
        <Submit class="mt-10">Send</Submit>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import AccountMenu from '~/components/AccountMenu'
import { Textbox, Submit, Textarea } from '~/shared/components/ui'
import { Heading } from '~/shared/components'
import saveMessage from '~/gql/product/saveMessage.gql'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      message: '',
    }
  },
  computed: {
    ...mapGetters({ user: 'auth/user', loading: 'loading' }),
  },
  components: { Heading, Textbox, Textarea, Submit, AccountMenu },
  methods: {
    async submit(message) {
      if (message == '') {
        this.$store.commit('setErr', 'Can not send blank message')
        // this.$nextTick(() => this.$refs.message.focus())
        return
      }
      try {
        this.$store.commit('clearErr')
        if (!this.user) return this.$router.push('/login')
        await this.$apollo.mutate({
          mutation: saveMessage,
          variables: { body: message },
        })
        this.message = ''
        // this.getData()
        this.$store.commit('success', 'Message sent successfully')
        this.$router.push('/')
      } catch (e) {
        this.$store.commit('setErr', e)
      } finally {
        this.$store.commit('busy', false)
      }
    },
  },
  // layout: 'account',
}
</script>

<style scoped></style>
