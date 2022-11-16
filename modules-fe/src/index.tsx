import ReactDOM from "react-dom/client";
import "./index.css";
import "./amsterdam.sans.typo.css";
import Root from "./Root";

const element = document.getElementById("root");
if (element) {
  const root = ReactDOM.createRoot(element);
  root.render(<Root />);
}
