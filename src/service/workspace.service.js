import headerToken from "@/app/api/headerToken";

export const getAllWorkspace = async () => {
    const token = await headerToken();
    try{
        const res = await fetch(`${process.env.NEXT_APIURL}/workspaces?pageNo=0&pageSize=10&sortBy=workspaceId&sortDirection=ASC`,{
            headers: token
        });
    const data = await res.json();
    return data;
    }catch(error){
        console.log(error);
    }
}

//postWorkspace
export const postWorkspace = async (workspaceData) => {
    const token = await headerToken(); 
    try {
      const res = await fetch(`${process.env.NEXT_APIURL}/workspace`, {
        method: "POST", 
        headers: {
          ...token, 
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(workspaceData), 
      });
  
     
      const data = await res.json(); 
      return data; 
    } catch (error) {
      console.error("Error posting workspace:", error);
    }
  };
  
  //update
  export const updateWorkspace = async (id, updatedData) => {
    const token = await headerToken(); 

   
        const res = await fetch(`${process.env.NEXT_APIURL}/workspace/${id}`, {
            method: "PUT",
            headers: {
                ...token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });

        

        const data = await res.json();
        return data;
    
};

