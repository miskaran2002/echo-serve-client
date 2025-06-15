import {
    createBrowserRouter,  
} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Signup from "../pages/Shared/signup/Signup";
import Login from "../pages/Shared/login/Login";
import AllServices from "../pages/Allservices/AllServices";
import serviceDetails from "../pages/serviceDetails/serviceDetails";
import PrivateRoute from "../routes/PrivateRoute";
import AddServices from "../pages/Addservices/AddServices";
  

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
                path:"/allServices",
                Component:AllServices

            },
            {
                path:"/addServices",
                element:<PrivateRoute><AddServices></AddServices></PrivateRoute>
            },
            {
                path:"/services/:id",
                Component:serviceDetails,
                loader: ({ params }) => fetch(`http://localhost:3000/services/${params.id}`)
            },

            {
                path: "/signUp",
                Component: Signup
            },
            {
                path:"/login",
                Component:Login
            }
        ]
    },
]);

export default router;