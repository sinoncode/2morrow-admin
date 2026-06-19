import { create } from "zustand"
import { AuthService } from "@/api/services/auth.service"
import { toast } from "@/lib/toast"

interface LoginData {
  email: string
  password: string
}

interface User {
  id: string;
  name: string;
  email: string;
  permissions: string[];
}


interface AuthStore {
  loading: boolean
  error: string | null
 user: User | null;
  login: (data: LoginData) => Promise<boolean>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  loading: false,
  error: null,
  user: null,

  login: async (data) => {
    set({
      loading: true,
      error: null,
    })

    try {
     const response = await AuthService.login(data);

localStorage.setItem(
  "access_token",
  response.data.data.token
);

set({
  user: response.data.data.user,
});

      toast.success("Login successful")

      return true
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Login failed"

      set({
        error: message,
      })

      set({
  user: null,
});

      toast.error(message)

      return false
    } finally {
      set({
        loading: false,
      })
    }
  },

  logout: async () => {
    try {
      await AuthService.logout()
    } catch (error) {
      console.error(error)
    } finally {
      localStorage.removeItem("access_token")
      toast.success("Logged out successfully")
    }
  },
}))