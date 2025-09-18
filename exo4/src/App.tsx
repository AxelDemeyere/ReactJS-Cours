import { Provider } from "react-redux";
import { store } from "./store/store";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index/Index.tsx";
import NotFound from "./pages/NotFound/NotFound.tsx";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>

        </Provider>
    );
}

export default App;
