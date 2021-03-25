<template>
<div>
  <Nav />
  <!-- <Heading title="Manage Address" /> -->
  <div class="container flex flex-row max-w-full p-4 mx-auto mt-16 sm:mt-12 sm:p-8">
    <AccountMenu />
    <AddressList class="w-full h-screen px-3 py-5 mt-0 bg-white shadow md:px-10 lg:h-auto lg:ml-8 lg:w-3/4" />
  </div>
</div>
</template>
<script>
import AccountMenu from '~/components/AccountMenu'
import { AddressList } from '~/shared/components'
import {Heading} from '~/shared/components'
import Nav from '~/components/home/Nav'

export default {
  components: { AddressList, Heading, AccountMenu, Nav},
  // layout: 'account',
}
</script>
