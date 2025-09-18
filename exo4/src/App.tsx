import { Provider } from "react-redux";
import { store } from "./store/store";
import Index from "./pages/Index";

function App() {
    return (
        <Provider store={store}>
            <Index />
        </Provider>
    );
}

export default App;
