"use server"
import { registerService } from "@/service/auth/login.service"

export const registerAction = async (registerData)=> {
    const register = await registerService(registerData);
    return register;
}