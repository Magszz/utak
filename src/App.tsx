import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import Fallback from "./Fallback";

const Products = lazy(() => import("@/container/Products"));

const App = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
