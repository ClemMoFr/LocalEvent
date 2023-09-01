import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RoutesPaths from "./config/RoutesPaths";

function App() {
  return (
    <BrowserRouter>
      <RoutesPaths />
    </BrowserRouter>
  );
}

export default App;
