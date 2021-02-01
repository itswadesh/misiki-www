<template>
  <ApolloQuery
    class
    :query="require('~/gql/page/pageSlug.gql')"
    :variables="{ slug: 'about' }"
    :update="
      (data) => {
        setPage(data.pageSlug)
        return data.pageSlug
      }
    "
  >
    <template v-slot="{ result: { error, data }, isLoading }">
      <div v-if="isLoading" class="w-full">Loading...</div>
      <ErrComponent v-else-if="error" />
      <div
        v-else-if="data"
        class="flex flex-col items-center justify-center min-h-screen"
      >
        <div class="content_title">
          <h3>{{ data.name }}</h3>
        </div>
        <Shortcode :content="data.content"></Shortcode>
      </div>
    </template>
  </ApolloQuery>
</template>
<script>
const Shortcode = () => import('~/components/Shortcode')

export default {
  layout: 'none',
  data() {
    return {
      page: {},
    }
  },
  methods: {
    setPage(page) {
      this.page = page
    },
  },
  //   async created({ params, route, $axios }) {
  //     let page = {},
  //       err = null;
  //     try {
  //       if (slug) {
  //         page = (await $apollo.query({query: page, })).data.page;
  //       }
  //       err = null;
  //     } catch (e) {
  //       page = {};
  //       err = e;
  //     }
  //     return { page, err };
  //   },
  components: { Shortcode },
  head() {
    return {
      title: this.page && this.page.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.page && this.page.metaDescription,
        },
        {
          hid: 'og:description',
          name: 'Description',
          property: 'og:description',
          content: this.page && this.page.metaDescription,
        },
        {
          hid: 'keywords',
          name: 'Keywords',
          property: 'keywords',
          content: this.page && this.page.metaKeywords,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: this.page && this.page.metaTitle,
        },
        // Twitter
        {
          name: 'twitter:title',
          content: this.page && this.page.metaTitle,
        },
        {
          name: 'twitter:description',
          content: this.page && this.page.metaDescription,
        },
      ],
    }
  },
}
</script>
