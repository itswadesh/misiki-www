<style>
h1 {
  margin-bottom: 2rem;
  margin-top: 2rem;
  font-weight: bold;
}
</style>

<template>
  <div class="bg-gray-100">
  <Heading title="About MISIKI" />
  <div class="container flex flex-row max-w-full p-4 mx-auto sm:p-8">
    <AccountMenu  />
    <div class="w-full h-screen px-3 py-5 mt-0 bg-white shadow md:px-10 lg:h-auto lg:ml-8 lg:w-3/4">
      <main>
        <div class="mx-2 mb-8 lg:mx-10">
          <h1 class="mt-8 text-5xl font-bold text-center">
            <span class="underline">About</span>
            Us
          </h1>
          <p
            class="px-2 text-lg font-bold leading-relaxed tracking-widest text-center leader lg:px-64"
          >
            Helping You Build An Online Brand
          </p>
          <div class="py-6 mx-5">
            <div class="flex justify-center mb-4 leading-loose">
              Misiki is a product of India based Javascript e-commerce Solution. It
              offers an platform to sell home cooked, hygine foods.
            </div>
            <div class="flex justify-center">
              Started in 2014, Misiki has acquired 800+ happy clients to date. If
              you are an ecommerce business owner, all you need to do is choose your
              goal and we will help you develop the optimal technology platform for
              your business. We are continuously evolving to drive ecommerce for
              global merchants so that they can enable a better experience for their
              customers using our technology and analytics at every stage of the
              cycle.
            </div>
          </div>
        </div>

        <div
          class="flex flex-wrap justify-between bg-gray-100 md:px-16 md:py-8 lg:py-4 lg:px-4"
        >
          <div class="w-full px-4 md:w-1/2 lg:w-1/3">
            <div class="flex flex-col text-center bg-white rounded shadow">
              <img :src="`/img/mission.png`" />
              <div class="p-4">
                With a mission of “Amazing customer experience” Misiki aims to offer
                an easy ecommerce enablement platform where small retailers and
                SME’s can start their online store with their brand name, at the
                best prices.
              </div>
            </div>
          </div>
          <div class="w-full px-4 mt-4 md:mt-0 md:w-1/2 lg:w-1/3">
            <div class="flex flex-col text-center bg-white rounded shadow">
              <img :src="`/img/vison.png`" />
              <div class="p-4">
                To simplify administration, cart checkout and payments for merchants
                by offering the complete ecommerce solution, so that they can easily
                come up with their online store and start selling online.
              </div>
            </div>
          </div>
          <div class="w-full px-4 mt-4 md:w-1/2 md:mt-0 lg:w-1/3">
            <div class="flex flex-col text-center bg-white rounded shadow">
              <img :src="`/img/values.png`" />
              <div class="p-4">
                Misiki wants to reduce ecommerce to its bare bones for small
                retailers. We bridge the gap between technology and innovation by
                providing an easy yet powerful ecommerce enablement platform
              </div>
            </div>
          </div>
        </div>

        <div class="justify-center py-12 mx-5">
          <h2 class="text-4xl font-medium text-center">
            Experience Work As A Innovator!
          </h2>
          <p class="flex justify-center">__________________</p>
          <p class="flex justify-center py-6 tracking-widest text-center">
            At Misiki, we don’t just offer jobs, but a career. If you are crazy
            about work and party, then we are waiting for you, eagerly!
          </p>
          <div class="flex justify-center">
            <button
              class="flex px-4 py-2 m-6 text-white rounded jusify-center bg-primary"
            >
              Apply Now
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</div>
</template>
<script>
import AccountMenu from '~/components/AccountMenu'
import { Heading } from '~/shared/components'

export default {
  components:{
    AccountMenu, Heading
  },
  head() {
    return {
      title: 'About Us',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'About Us',
        },
        {
          hid: 'keywords',
          name: 'Keywords',
          property: 'keywords',
          content: 'about misiki',
        },

        // OpenGraph data
        {
          hid: 'og:title',
          name: 'og_title',
          property: 'og:title',
          content: 'About Us',
        },
        {
          hid: 'og:description',
          name: 'Description',
          property: 'og:description',
          content: 'About Us',
        },
        // Twitter
        {
          name: 'twitter:title',
          content: 'About Us',
        },
        {
          name: 'twitter:description',
          content: 'About Us',
        },
      ],
    }
  },
}
</script>
