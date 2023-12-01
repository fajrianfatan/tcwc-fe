var usecookies = useCookie('devtools')
var router = useRouter()

export default defineNuxtRouteMiddleware((to, from) => {

    // console.log(usecookies)
    if (!usecookies.value) {
        router.push('/login')
    }
})