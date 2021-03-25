<template>
  <div class="">
    <Nav />
    <!-- <Heading title="Add Address" /> -->
    <div class="container flex flex-row max-w-full p-4 mx-auto mt-16 sm:mt-12 sm:p-8">
      <AccountMenu />
      <AddressEdit :id="$route.params.id" class="w-full lg:ml-8 lg:w-3/4 xs:w-full headings" />
    </div>
  </div>
</template>
<script>
import { AddressEdit, Heading } from '~/shared/components'
import { AddressList } from '~/shared/components'
import Nav from '~/components/home/Nav'

export default {
  components: { AddressEdit, Heading,AddressList, Nav },
}
</script>
