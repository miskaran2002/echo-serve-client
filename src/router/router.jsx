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
import ServiceDetails from "../pages/serviceDetails/serviceDetails";
import MyServices from "../pages/Myservices/MyServices";
import MyReviews from "../myreviews/MyReviews";
  

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
                path:"/myServices",
                element:<PrivateRoute><MyServices></MyServices></PrivateRoute>
            },
            {
                path:"/myReviews",
                element:<PrivateRoute><MyReviews></MyReviews></PrivateRoute>
            },
            {
                path:"/services/:id",
                element:<PrivateRoute><ServiceDetails></ServiceDetails></PrivateRoute>,
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