
import Home from "../pages/Home";
import { useAuthStore } from "../store/UseAuthStore";
import ChatBase from "./chatBase";
function DashBoard() {
    const {authUser}  = useAuthStore();
    
    return <>
    {
    authUser ? <ChatBase/> : <Home/>
    }
    </>
}

export default DashBoard;