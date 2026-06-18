import api from "../axios"
import { LoginPayload } from "@/types/auth"

export const AuthService = {
  login(data: LoginPayload) {
    return api.post("/auth/login", data)
  },

  logout() {
    return api.post("/logout")
  },
}