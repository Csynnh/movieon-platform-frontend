import api from "./axiosConfig";
import { User } from "./type";
const addUser = async (user: User): Promise<void> => {
   try {
      const response = await api.post("/api/v1/users", user);
      console.log("response.data :>> ", response.data);
      return response.data;
   } catch (error) {
      console.log(error);
   }
};

export default addUser;
