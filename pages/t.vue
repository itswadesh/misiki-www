<template>
  <div></div>
</template>

<script>
import settingQ from '~/../shared/gql/settings/settings.gql'
import SUBSCRIPTION_SETTINGS_UPDATED from '~/../shared/gql/settings/settingsUpdated.gql'
import { FacebookIcon } from 'vue-feather-icons'

export default {
  layout: 'account',
  data() {
    return {
      settings: {},
    }
  },
  components: {
    FacebookIcon,
  },
  //   apollo: {
  //     $subscribe: {
  //       settings: {
  //         query: SUBSCRIPTION_SETTINGS_UPDATED,
  //         result({ data }) {
  //           this.settings = data.settingsUpdated
  //         },
  //       },
  //     },
  //   },
  mounted() {
    const observer = this.$apollo.subscribe({
      query: SUBSCRIPTION_SETTINGS_UPDATED,
    })

    // observer.subscribe({
    //   next({ data }) {
    //     console.log(data && data.settingsUpdated)
    //   },
    //   error(error) {
    //     console.error(error)
    //   },
    // })
  },
}
</script>

<style scoped></style>
