import {
    createBrowserRouter,  
} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Signup from "../pages/Shared/signup/Signup";
  

const router = createBrowserRouter([
    {
        path: "/",
        Component:RootLayout,
        children:[
            {
                index: true,
                Component:Home

            },
            {
                path: "/signUp",
                Component: Signup
            }
        ]
    },
]);

export default router;