import AddData from "../components/addData"
import { useEffect } from "react"

const AdminDashboard = () => {
    
    useEffect(()=>{
        const token = localStorage.getItem("token")
        const user = localStorage.getItem("user")

        if (!token) {
            window.location.replace('/login')
        }
        if(!user){
            window.location.replace('/login')
        }
    },[])

    return(
       <>
        <AddData />
       </>
    )
}

export default AdminDashboard