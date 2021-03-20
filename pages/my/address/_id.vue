<template>
  <div class="">
    <Heading title="Add Address" />
    <div class="container flex flex-row max-w-full p-4 mx-auto sm:p-8">
      <AccountMenu />
      <AddressEdit :id="$route.params.id" class="w-full lg:ml-8 lg:w-3/4 xs:w-full headings" />
    </div>
  </div>
</template>
<script>
import { AddressEdit, Heading } from '~/shared/components'
import { AddressList } from '~/shared/components'

export default {
  components: { AddressEdit, Heading,AddressList },
}
</script>
