import logo from "./logo.svg";
import "./App.css";

function ThingsList() {
  return <p>Список вещей</p>;
}

function NewThing() {
  return <p>Добавление новой вещи</p>;
}

function ThingPreview() {
  return <p>Отображение информации о выбранной вещи</p>;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <NewThing />
        <ThingPreview />
        <ThingsList />
      </header>
    </div>
  );
}

export default App;
