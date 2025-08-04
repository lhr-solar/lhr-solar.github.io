import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

import App from './App.jsx';
import EPlan from './pages/EPlan.jsx';
import EplanVehicle from './pages/EplanVehicle.jsx';
import EplanProject from './pages/EplanProject.jsx';

import './index.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/eplan" element={<EPlan />} />
                    <Route path="/eplan/:vehicle" element={<EplanVehicle />} />
                    <Route path="/eplan/:vehicle/:project" element={<EplanProject />} />
                </Routes>
            </BrowserRouter>
        </MantineProvider>
    </StrictMode>,
);
