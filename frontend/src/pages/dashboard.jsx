import Navbar from "../components/Navbar"
import Certificate from "../components/Certi"
import { useEffect } from "react"
const Dashboard = () => {
    const token = localStorage.getItem("token")
    useEffect(()=>{
        if(!token){
            window.location.replace('/login')
        }
    })
    return (
        <div>
            <Navbar />
            <Certificate
        name="John Doe"
        course="React Development"
        date="January 25, 2024"
      />            
        </div>
    )
}

export default Dashboard