import { User } from "@/types/types";
import { create } from "zustand";

type Actions = {
  login: (login: string, password: string) => void;
  logout: () => void;
};

type State = {
  isAuthenticated: boolean;
  user: User | null;
  users: User[];
};

const initialState: State = {
  isAuthenticated: false,
  user: null,
  users: [
    { id: "1", role: "user", login: "user@user.com", password: "12345" },
    { id: "2", role: "admin", login: "admin@admin.com", password: "67890" },
  ],
};

export const useAuthStore = create<State & Actions>((set, get) => ({
  ...initialState,
  login: (login: string, password: string) => {
    const user = get().users.find(
      (user) => user.login === login && user.password === password
    );
    set({ isAuthenticated: user && true, user });
  },
  logout: () => {
    set({ isAuthenticated: false, user: null });
  },
}));
