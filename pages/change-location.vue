<template>
  <div>
    <Nav />
    <ChangeLocation class="mt-24 sm:mt-16" />
  </div>
</template>

<script>
import Nav from '~/components/home/Nav'

import { ChangeLocation } from '~/shared/components'

export default {
  layout: 'none',
  components: { ChangeLocation, Nav },
}
</script>

<style scoped></style>
