import "./App.scss";
import { Layout } from "@/layout";
import { HashRouter } from "react-router-dom";

function App() {
  return (
    <HashRouter
      future={{
        v7_relativeSplatPath: true,
      }}
    >
      <Layout />
    </HashRouter>
  );
}

export default App;
