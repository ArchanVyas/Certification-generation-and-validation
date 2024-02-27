import { useEffect } from "react"

const Logout = () => {
    useEffect(()=>{
        localStorage.clear()
        window.location.replace('/login')
    })
    return(
<></>
    )
}

export default Logout