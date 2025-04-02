import { baseUrl } from "@/service/constants";
export const loginService = async (user) => {
  try {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.log("Error : ", e);
  }
};

export const registerService = async (user) => {
 try{
  const res = await fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    }
  });
  const data = await res.json();
  return data;
  
 }catch(error){
  console.log(error);
 }
}