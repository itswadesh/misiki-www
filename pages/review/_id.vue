<template>
  <div>
    <Heading title="Post Your Rating" />
    
    <form
      novalidate
      autocomplete="off"
      @submit.prevent.prevent="submit()"
      class="mx-2"
    >
      <div class="flex flex-col items-center pt-3 my-4 bg-white">
      <div class="flex flex-col-reverse justify-between w-full px-4 md:flex-row">
        <StarRating v-model="saveReview.rating" class="my-auto" />
          <div class="flex justify-end">
            <span v-if="product" class="flex flex-row">
                  <h2 class="p-2 pl-4 my-auto font-medium text-gray-700">
                    <p>{{ product.name }}</p>
                  </h2>
                  <img
                    v-lazy="product.img"
                    alt="product img"
                    class="object-cover w-20 h-20 m-2 ml-4 bg-gray-200 shadow border-1"
                  />
            </span>
        </div>
      </div>
        <br />
        <Textarea
          class="w-full px-4"
          autofocus
          v-model="saveReview.message"
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
import REVIEW from '~/gql/review/saveReview.gql'
import PRODUCT from '~/gql/product/product.gql'
import { mapGetters, mapActions, mapMutations } from 'vuex'


export default {
  components: { Heading, Submit, Textarea, StarRating },
  fetch({ store, redirect, route }) {
    if (!(store.state.auth || {}).user)
      return redirect('/login?return=/food/reviews/' + route.params.id)
  },
  data() {
    return {
      product: null,
      // review:{}
       saveReview: {
        id: this.$route.query.id,
        product: this.$route.query.id,
        message: '',
        rating: null,
      },
    }
  },
  async created() {
    // console.log('id..........', this.$route.query.id)
    await this.getProduct()
  },
  
  methods: {
        ...mapMutations({ success: 'success', setErr: 'setErr' }),
    async getProduct() {
      this.loading = true
      try {
        this.product = (
          await this.$apollo.query({
            query: PRODUCT,
            variables: { id: this.$route.query.id },
            fetchPolicy: 'no-cache',
          })
        ).data.product
        this.updatedDeliveryDates()
      } catch (e) {
        // console.log(e)
      } finally {
        this.loading = false
      }
    },

    // async submit() {
    //   try {
    //     this.$store.commit('clearErr')
    //     if (!this.review.rating)
    //       return this.$store.commit('setErr', 'Please rate the item')
    //     const product = this.$route.params.id
    //     const { rating, message } = this.review
    //     const review = (
    //       await this.$apollo.mutate({
    //         mutation: saveReview,
    //         variables: { product, rating, message },
    //       })
    //     ).data.saveReview
    //     console.log("rvies", this.saveReview)
    //     this.$router.push('/' + review.product.slug)
    //   } catch (e) {
    //     this.$store.commit('setErr', e)
    //   } finally {
    //     this.$store.commit('busy', false)
    //   }
    // },
      async submit() {
      let msg = 'Your Comment Added'
      try {
        const saveReview = (
          await this.$apollo.mutate({
            mutation: REVIEW,
            variables: this.saveReview,
          })
        ).data.saveReview
        console.log('review', this.saveReview)
        this.success(msg)
      } catch (e) {
        this.setErr(e.toString())
        // console.log(e)
      } finally {
      }
    },
  },
}
</script>
