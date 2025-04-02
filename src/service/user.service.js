import headerToken from "@/app/api/headerToken";

export const getAllUsers = async () => {
    const token = await headerToken();
    try{
        const res = await fetch(`${process.env.NEXT_APIURL}/user`,{
            headers: token
        });
    const data = await res.json();
    return data;
    }catch(error){
        console.log(error);
    }
}
