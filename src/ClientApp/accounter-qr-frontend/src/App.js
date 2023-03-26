import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

var thing = JSON.parse(
  '{ "name": "Стол", "type": "Мебель", "creationDateTime": "2028-10-31T17:04:32.0000000", "attributes": {"Материал": "Дерево", "Ножки" : 4} }'
);
console.log(thing);

function ThingsList() {
  return (
    <div className="frame">
      <h3>Просмотр всех объектов</h3>
      <table>
        <tr>
          <th>Имя</th>
          <th>Тип</th>
          <th>Дата добавления</th>
        </tr>
        <tr>
          <td>данные</td>
          <td>данные</td>
          <td>данные</td>
        </tr>
      </table>
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

function ThingPreview({ selectedThing }) {
  return (
    <div className="frame">
      <h3>Просмотр выбранного объекта</h3>
      <p>Имя: {selectedThing.name}</p>
      <p>Тип: {selectedThing.type}</p>
      <p>Дата добавления: {selectedThing.creationDateTime}</p>
      {GetThingAttributes(selectedThing)}
    </div>
  );
}

function App() {
  const [selectedThing, setSelectedThing] = useState(thing);

  function selectThing(newSelectedThing) {
    setSelectedThing(newSelectedThing);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <NewThing />
        <div className="test">
          <ThingsList />
          <ThingPreview selectedThing={selectedThing} />
        </div>
      </header>
    </div>
  );
}

export default App;
