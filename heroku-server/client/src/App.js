import React from "react";
import "./App.css";
import { JobsPage } from "./components/JobsPage";
import { AboutPage } from "./components/AboutPage";
import { Routes, Route } from "react-router-dom";

export const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<JobsPage />} />
            </Routes>
        </>
    );
};
