import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

import App from './App.jsx';

import './index.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    {/* Add more routes here as needed */}
                </Routes>
            </BrowserRouter>
        </MantineProvider>
    </StrictMode>,
);
