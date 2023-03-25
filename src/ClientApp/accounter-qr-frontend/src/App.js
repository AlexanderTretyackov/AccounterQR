import logo from "./logo.svg";
import "./App.css";

var thing = JSON.parse(
  '{ "name": "Стол", "type": "Мебель", "creationDateTime": "2028-10-31T17:04:32.0000000", "attributes": {"Материал": "Дерево", "Ножки" : 4} }'
);
console.log(thing);

function ThingsList() {
  return (
    <div className="frame">
      <h3>Список вещей</h3>
    </div>
  );
}

function NewThing() {
  return (
    <div className="frame">
      <h3>Добавление новой вещи</h3>
    </div>
  );
}

export function GetThingAttributes(thing) {
  var keys = Object.keys(thing.attributes);
  return (
    <ul>
      {keys.map((key) => (
        <li key={key}>
          {key}: {thing.attributes[key]}
        </li>
      ))}
    </ul>
  );
}

function ThingPreview() {
  return (
    <div className="frame">
      <h3>Просмотр выбранного объекта</h3>
      <p>Имя: {thing.name}</p>
      <p>Тип: {thing.type}</p>
      <p>Дата добавления: {thing.creationDateTime}</p>
      {GetThingAttributes(thing)}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <NewThing />
        <div className="test">
          <ThingsList />
          <ThingPreview />
        </div>
      </header>
    </div>
  );
}

export default App;
