<template>
  <div class="heading">
  <nav class="bg-dark border-gray-200">
    <div class="max-w-screen-full flex flex-wrap items-center justify-between mx-3 p-4">
      <NuxtLink to="/disturbance">
      <div class="flex items-center space-x-4">
        <div class="flex flex-col">
        <img src="/bmkg-logo.png" class="h-8" alt="BMKG Logo" />
        <span class="text-xs font-semibold whitespace-nowrap dark:text-white">BMKG</span>
        </div>
        <div class="flex flex-col">
            <span class="text-xl font-semibold whitespace-nowrap dark:text-white">TCWC - Jakarta</span>
            <span class="text-xs font-semibold whitespace-nowrap dark:text-white">Tropical Cyclone Warning Center</span>
        </div>
      </div>
      </NuxtLink>
      <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <button type="button" class="flex text-sm bg-gray-900 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
          <span class="sr-only">Open user menu</span>
          <img class="w-8 h-8 rounded-full" src="/profile-pic.jpg" alt="user photo">
        </button>
        <!-- Dropdown menu -->
        <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
          <div class="px-4 py-3">
            <span class="block text-sm text-gray-800 dark:text-white">Bonnie Green</span>
            <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
          </div>
          <ul class="py-2" aria-labelledby="user-menu-button">
            <li>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
            </li>
          </ul>
        </div>
        <button data-collapse-toggle="navbar-user" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
    </div>
    
    </div>
  </nav>

  </div>
</template>

<script setup>
const axios = useAxiosDev()
const cookie = useCookie("user");

var data = reactive({
  routerdata: {},
  userProfile: {},
});

onMounted(async () => {
  var router = useRouter();
  data.routerdata = router.currentRoute;
  if (cookie.value) {
    const res = await axios.get(
      "profile"
    );

    data.userProfile = res.data;
  } else {
    console.log("belum login");
  }
});
</script>
