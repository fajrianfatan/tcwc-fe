import axios from "axios";

export const useAxios = () => {
  var cookies = useCookie("user");
  var router = useRouter();
  var runtime = useRuntimeConfig();
  const instance = axios.create({
    baseURL: runtime.public.baseURL,
    timeout: 10000,
    withCredentials: false,
  });

  instance.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = "Bearer " + cookies.value;
      config.headers["X-API-KEY"] = runtime.public.tokenDefault;

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  return instance;
};