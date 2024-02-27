import AddData from "../components/addData"
import AdminNavbar from "../components/AdminNavbar"
import PendingRequest from "../components/PendingRequest"
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
            <PendingRequest />
        </>
    )
}

export default AdminDashboard