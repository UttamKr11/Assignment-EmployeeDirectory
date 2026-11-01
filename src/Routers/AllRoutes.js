import { Routes, Route } from "react-router-dom"
import { EmployeeDirectory } from "../Pages/EmployeeDirectory"
import { EmployeeProfile } from "../Pages/EmployeeProfile"

export const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<EmployeeDirectory />}></Route>
            <Route path="/employeeprofile/:id" element={<EmployeeProfile />}></Route>
        </Routes>
    )
}
