import useSignup from "./useSignup";

const useRegister = async (username, name, password, email) => {
  const axios = useSignup();
  return await axios
    .post<{ isSuccess: boolean; error: any; data: any }>("/auth/signup", {
      username,
      name,
      password,
      email,
    })
    .then((result) => result.data['data']);
};
