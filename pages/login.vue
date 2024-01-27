<template>
  <div class="w-full h-screen bg-dark scrollbar-hide" >
    <img
      class="w-3/5 h-full left-0 top-0 absolute rounded-tr-[40px] rounded-br-[40px]"
      src="/bg-login.png"
      alt="Background Image"
    />
    <div class="w-3/5 h-full left-0 top-0 absolute bg-darkest bg-opacity-50 rounded-tr-[40px] rounded-br-[40px]"/>
    <div>
      <div class="relative">
        <div class="w-[260px] h-[62px] mt-5 ml-5 bg-dark absolute rounded-[10px]">
          <div class="flex items-center space-x-4">
            <div class="flex flex-col ml-3 mt-2">
            <img src="/bmkg-logo.png" class="h-8" alt="BMKG Logo" />
            <span class="text-xs font-semibold whitespace-nowrap dark:text-white">BMKG</span>
            </div>
            <div class="flex flex-col">
                <span class="text-2xl ml-2 mb-6 text-center font-bold whitespace-nowrap dark:text-white">TCWC - Jakarta</span>
                <span class="w-[190px] h-[18px] mt-9 bg-tcwc-sub absolute rounded-[10px] text-center text-xs font-semibold whitespace-nowrap dark:text-white">Tropical Cyclone Warning Center</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-32 w-32">
    <div class="w-32 absolute inset-x-2/3 inset-y-1/3 flex flex-col items-center">
      <div class="left-[2px] top-0 absolute text-white text-3xl font-medium font-poppins">Sign in</div>
      <div class="w-[431px] h-[285px] left-0 top-[68px] absolute">
        <form @submit.prevent="handleLogin">
        <div class="w-[431px] h-[177px] left- top-0 absolute">
          <div class="w-[429px] h-16 left-[2px] top-0 absolute flex-col justify-start items-start inline-flex" @keyup.enter="handleLogin">
            <div class="text-white text-lg font-poppins">Email</div>
            <input v-model="data.email" type="email" class="text-white text-lg font-poppins bg-transparent outline-transparent border-none focus:outline-none rounded-[10px] w-full" placeholder="email@bmkg.go.id"/>
            <div class="w-[17px] h-[17px] relative origin-top-left rotate-180"></div>
            <div class="w-[429px] h-0.5 left-[2px] top-[62px] absolute bg-white"></div>
          </div>
          <div class="w-[431px] h-16 left- top-[113px] absolute flex-col justify-start items-start inline-flex">
            <div class="left-[2px] top-0 absolute text-white text-lg font-poppins">Password</div>
            <div class="w-[429px] h-0.5 left-[2px] top-[62px] absolute bg-white"></div>
            <div class="w-[429px] h-6 left-0 top-[31px] absolute">
              <input v-model="data.password" type="password" class="text-white text-lg font-poppins bg-transparent border-none focus:outline-none rounded-[10px] w-full" placeholder="************"/>
              <div class="w-[17px] h-[17px] left-0 top-[2px] absolute flex-col justify-start items-start inline-flex"></div>
            </div>
            <div class="w-3.5 h-3.5 left-[417px] top-[39px] absolute">
              <div class="w-3.5 h-[12.09px] left-0 top-[0.96px] absolute"></div>
            </div>
          </div>
        </div>
        <div class="w-[429px] h-[53px] left-[2px] top-[232px] absolute">
          <button class="w-[429px] h-[53px] left-0 top-0 bg-btn-submit rounded-[32px] shadow absolute text-white text-[17px] font-medium font-poppins"
          @click="handleLogin()">
            Login
          </button>
        </div>
      </form>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
const axios = useAxios()
// import axios from 'axios';
var router = useRouter()
var data = reactive({
  email: 'admin.satellite@bmkg.go.id',
  password: 'bmkg2023@satellite',
  loading: false
});
var expire = new Date();
// 14 days
expire.setTime(new Date().getTime() + 3600000 * 24 * 14);
const cookie = useCookie("user", {
  maxAge: 1210000,
});

const handleLogin = async () => {
  data.loading = true;
  try {
    const response = await axios.post("login", {
      email: data.email,
      password: data.password
    });
    // const response = await axios.post("login")
    console.log(response);
    cookie.value = response.data.data;
    console.log(cookie.value);
    
router.push("/disturbance");
  } catch (error) {
    console.error(error);
    data.loading = false;
    alert("email atau password salah");
  }
};
// async function handleLogin() {
//   data.loading = true;
//   // const token = Cookies.get('access_token');
//   try {
//     var res = await axios.post('url/api/api-tcwc/login', data.form)
//     console.log(res);
//     // Cookies.set('token', access_token)
//     router.push('/disturbance');
//   } catch (error) {
//     data.loading = false;
//     console.error('Login error:', error);
//     alert('Incorrect username or password. Please try again.');
//   }
// }
</script>

<style scoped>
</style>
