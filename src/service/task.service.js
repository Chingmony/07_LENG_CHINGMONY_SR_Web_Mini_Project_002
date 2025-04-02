
import headerToken from "@/app/api/headerToken";

export const getAllTasks = async () => {
    const token = await headerToken();
    try{
        const res = await fetch(`${process.env.NEXT_APIURL}/tasks/workspace/f72ef304-1e33-4234-a017-c979d62df1cd?pageNo=0&pageSize=10&sortBy=taskId&sortDirection=ASC`,{
            headers: token
        });
    const data = await res.json();
    return data;
    }catch(error){
        console.log(error);
    }
}