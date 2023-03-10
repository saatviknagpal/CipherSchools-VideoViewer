import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import "./App.css";

export default function App() {
  const element = useRoutes(routes);
  return <div className="bg-gray-100 App">{element}</div>;
}
