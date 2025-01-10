import Clock from "./components/Clock";
import "./index.css";

const App = () => {
  return (
    <div className="app-container">
      <h1 className="title">Analog Clock</h1>
      <Clock />
      <p className="author">Autor: Łukasz Przybysz</p>
    </div>
  );
};

export default App;
