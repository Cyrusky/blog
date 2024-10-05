import "./App.scss";
import { Layout } from "@/layout";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router basename={"/admin"}>
      <Layout />
    </Router>
  );
}

export default App;
