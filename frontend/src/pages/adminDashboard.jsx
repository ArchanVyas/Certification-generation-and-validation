import AddData from "../components/addData"
import AdminNavbar from "../components/AdminNavbar"
import PendingRequest from "../components/PendingRequest"
import AdminPieChart from "../components/AdminPieChart"
import AdminBarChart from "../components/AdminBarChart"
import { useEffect } from "react"
const AdminDashboard = () => {

    useEffect(() => {
        const token = localStorage.getItem("token")
        const user = localStorage.getItem("user")

        if (!token) {
            window.location.replace('/login')
        }
        if (!user) {
            window.location.replace('/login')
        }
    }, [])

    return (
        <>
            <AdminNavbar />
            <div className="grid grid-cols-2 gap-20 mt-12">
            <AdminPieChart />
            <AdminBarChart />
            </div>
            <PendingRequest />
        </>
    )
}

export default AdminDashboard