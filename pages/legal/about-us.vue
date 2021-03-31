<template>
  <div class="bg-gray-100">
    <div class="p-4 sm:p-8">
      <div class="w-full px-3 py-5 mt-0 bg-white shadow">
        <main class="">
          <div class="mx-2 mb-8 lg:mx-10">
            <h1 class="mt-8 text-5xl font-bold text-center">
              <span class="underline">About</span>
              Us
            </h1>
            <p
              class="px-2 text-lg font-bold leading-relaxed tracking-widest text-center leader lg:px-64"
            >
              Home food home delivered with love.
            </p>
            <div class="py-6 mx-5">
              <div class="flex justify-center mb-4 font-light leading-loose">
                Misiki is a FNB ecommerce platform which delivers home cooked
                hygined food from housewives to food lovers. Housewives /
                Househusbands prepare food and our delivery boy delivers to the
                customer. We are operating in Sunabeda since 2019 and planning
                to expand to Berhampur in next leap.
              </div>
              <div class="flex justify-center">
                <div class="overflow-hidden bg-white shadow sm:rounded-lg">
                  <div class="px-4 py-5 sm:px-6">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">
                      Business Information
                    </h3>
                    <p class="max-w-2xl mt-1 text-sm text-gray-500">
                      Business details and application.
                    </p>
                  </div>
                  <div class="border-t border-gray-200">
                    <dl>
                      <div
                        class="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                      >
                        <dt class="text-sm font-medium text-gray-500">
                          Address
                        </dt>
                        <dd
                          class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                        >
                          RO-10, Sunabeda, Koraput, Odisha - 763002, India
                        </dd>
                      </div>
                      <div
                        class="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                      >
                        <dt class="text-sm font-medium text-gray-500">Phone</dt>
                        <dd
                          class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                        >
                          +91-9078571888
                        </dd>
                      </div>
                      <div
                        class="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                      >
                        <dt class="text-sm font-medium text-gray-500">
                          Delivery Time
                        </dt>
                        <dd
                          class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                        >
                          7:00PM - 9:00PM (Daily)
                        </dd>
                      </div>
                      <div
                        class="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                      >
                        <dt class="text-sm font-medium text-gray-500">
                          Platform Open Time
                        </dt>
                        <dd
                          class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                        >
                          7:00AM - 6:00PM (Daily)
                        </dd>
                      </div>
                      <div
                        class="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                      >
                        <dt class="text-sm font-medium text-gray-500">Email</dt>
                        <dd
                          class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                        >
                          hi@misiki.in
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- <div
            class="flex flex-wrap justify-between bg-gray-100 md:px-16 md:py-8 lg:py-4 lg:px-4"
          >
            <div class="w-full px-4 md:w-1/2 lg:w-1/3">
              <div class="flex flex-col text-center bg-white rounded shadow">
                <img :src="`/img/mission.png`" />
                <div class="p-4">
                  With a mission of “Amazing customer experience” Misiki aims to
                  offer an easy ecommerce enablement platform where small
                  retailers and SME’s can start their online store with their
                  brand name, at the best prices.
                </div>
              </div>
            </div>
            <div class="w-full px-4 mt-4 md:mt-0 md:w-1/2 lg:w-1/3">
              <div class="flex flex-col text-center bg-white rounded shadow">
                <img :src="`/img/vison.png`" />
                <div class="p-4">
                  To simplify administration, cart checkout and payments for
                  merchants by offering the complete ecommerce solution, so that
                  they can easily come up with their online store and start
                  selling online.
                </div>
              </div>
            </div>
            <div class="w-full px-4 mt-4 md:w-1/2 md:mt-0 lg:w-1/3">
              <div class="flex flex-col text-center bg-white rounded shadow">
                <img :src="`/img/values.png`" />
                <div class="p-4">
                  Misiki wants to reduce ecommerce to its bare bones for small
                  retailers. We bridge the gap between technology and innovation
                  by providing an easy yet powerful ecommerce enablement
                  platform
                </div>
              </div>
            </div>
          </div> -->

          <!-- <div class="justify-center py-12 mx-5">
            <h2 class="text-4xl font-medium text-center">
              Experience Work As A Innovator!
            </h2>
            <p class="flex justify-center">__________________</p>
            <p class="flex justify-center py-6 tracking-widest text-center">
              At Misiki, we don’t just offer jobs, but a career. If you are
              crazy about work and party, then we are waiting for you, eagerly!
            </p>
            <div class="flex justify-center">
              <button
                class="flex px-4 py-2 m-6 text-white rounded jusify-center bg-primary"
              >
                Apply Now
              </button>
            </div>
          </div> -->
        </main>
      </div>
    </div>
  </div>
</template>
<script>
// import AccountMenu from '~/components/AccountMenu'
import { Heading } from '~/shared/components'
import Nav from '~/components/home/Nav'

export default {
  components: {
    // AccountMenu,
    Heading,
    Nav,
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
<style>
h1 {
  margin-bottom: 2rem;
  margin-top: 2rem;
  font-weight: bold;
}
</style>
