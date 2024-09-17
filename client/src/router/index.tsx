import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
const Layout = React.lazy(()=>import("./Layouts/Main/Layout"));

export const Router: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Layout/>}>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}