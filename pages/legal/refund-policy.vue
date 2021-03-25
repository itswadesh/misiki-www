<style scoped>
h1 {
  margin-bottom: 2rem;
  margin-top: 2rem;
  font-weight: bold;
}
ul {
  list-style-type: disc;
}
.hfull {
  min-height: 70vh;
}
</style>
<script>
export default {
  layout: 'support',
}
</script>
<template>
  <div>
    <Nav />
  <div class="mx-2 mb-16 hfull lg:mx-48">
    <h1 class="text-4xl text-center">Refund & Cancellation Policy</h1>
    <ul>
      <li>
        You may cancel your account at anytime by emailing support@misiki.in
      </li>
      <li>
        Once your account is cancelled all of your Content will be immediately
        deleted from the Service. Since deletion of all data is final please be
        sure that you do in fact want to cancel your account before doing so.
      </li>
      <li>
        We reserve the right to modify or terminate the Misiki service for any
        reason, without notice at any time.
      </li>
      <li>
        Fraud: Without limiting any other remedies, Misiki may suspend or
        terminate your account if we suspect that you (by conviction,
        settlement, insurance or escrow investigation, or otherwise) have
        engaged in fraudulent activity in connection with the Site.
      </li>
    </ul>
  </div>
  </div>
</template>

<script>
import Nav from '~/components/home/Nav'
export default {
  component:{
    Nav
  }
   
  }
</script>

