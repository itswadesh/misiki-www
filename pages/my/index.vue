<template>
  <div class>
    <Nav />
    <AccountMenu class="md:hidden" />
    <GeoLocation />
  </div>
</template>

<script>
import Vue from 'vue'
import Nav from '~/components/home/Nav'

import { GeoLocation } from '~/shared/components/'
import AccountMenu from '~/components/AccountMenu'
export default {
  components: { AccountMenu, GeoLocation, Nav },
  middleware: ['isAuth'],
  // layout: 'account',
}
</script>
