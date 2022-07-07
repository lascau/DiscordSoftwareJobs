import React from "react";
import "./App.css";
import { JobsPage } from "./components/JobsPage";
import { AboutPage } from "./components/AboutPage";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";

export const App = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/about" element={<AboutPage />} />
                <Route path="/" element={<JobsPage />} />
            </Routes>
        </>
    );
};
