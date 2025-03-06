import { Route, Routes } from "react-router-dom";
import { TransparentProvider } from "./context/TransparentContext";
import HomePage from "./pages/HomePage";
import SearchResultPage from "./pages/SearchResultPage";

const App = () => {
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
