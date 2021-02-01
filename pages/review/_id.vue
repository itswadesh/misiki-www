<template>
  <div>
    <Heading title="Post Your Rating" />
    <form
      novalidate
      autocomplete="off"
      @submit.stop.prevent="submit()"
      class="mx-2"
    >
      <div class="flex flex-col items-center my-4 bg-white">
        <StarRating v-model="review.rating" class="mt-4" />
        <br />
        <Textarea
          class="w-full px-4"
          autofocus
          v-model="review.message"
          label="Write Your Review Here"
        ></Textarea>
        <br />
      </div>
      <Submit>Publish Rating</Submit>
    </form>
  </div>
</template>
<script>
import { Submit, Textarea, StarRating } from '~/shared/components/ui'
import { Heading } from '~/shared/components'
import saveReview from '~/gql/review/saveReview.gql'

export default {
  components: { Heading, Submit, Textarea, StarRating },
  fetch({ store, redirect, route }) {
    if (!(store.state.auth || {}).user)
      return redirect('/login?return=/food/reviews/' + route.params.id)
  },
  data() {
    return {
      review: {},
    }
  },
  methods: {
    async submit() {
      try {
        this.$store.commit('clearErr')
        if (!this.review.rating)
          return this.$store.commit('setErr', 'Please rate the item')
        const product = this.$route.params.id
        const { rating, message } = this.review
        const review = (
          await this.$apollo.mutate({
            mutation: saveReview,
            variables: { product, rating, message },
          })
        ).data.saveReview
        this.$router.push('/' + review.product.slug)
      } catch (e) {
        this.$store.commit('setErr', e)
      } finally {
        this.$store.commit('busy', false)
      }
    },
  },
}
</script>
