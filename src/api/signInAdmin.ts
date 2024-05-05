import api from "./axiosConfig";

export const signInAdmin = async (
   username: string,
   password: string
): Promise<any> => {
   try {
      const response = await api.post("/api/v1/tenants/signin", {
         username,
         password,
      });
      return response;
   } catch (error) {
      console.log(error);
      return false;
   }
};
