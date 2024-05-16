import { useEffect, useState } from "react";
import api from "./axiosConfig";
import { User } from "./type";

const useUserDetail = (username: string): User | undefined => {
  const [user, setUser] = useState<User>();
  const getUserData = async (): Promise<void> => {
    try {
      const response = await api.get(`/api/v1/users/username/${username}`);
      setUser(response.data);
    } catch (error) {
      console.log(error);

      return undefined;
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return user;
};

export default useUserDetail;
