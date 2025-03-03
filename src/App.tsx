import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchResultPage from "./pages/SearchResultPage";
import { TransparentProvider } from "./context/TransparentContext";

const App: React.FC = () => {
  return (
    <TransparentProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/result/:id" element={<SearchResultPage />} />
      </Routes>
    </TransparentProvider>
  );
};

export default App;
