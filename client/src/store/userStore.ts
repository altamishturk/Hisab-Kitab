import { create } from 'zustand'
import { axiosInstance } from '../utils/axiosInstance';


type State = {
  user: any;
  fetch: () => void;
};


export const useUserStore = create<State>((set) => ({
  user: null,
  fetch: async () => {
    try {
        const response = await axiosInstance.get("/users");
        set({user: response.data.user})
    } 
    catch (error) {
        set({user: null});
    }
  }
}))