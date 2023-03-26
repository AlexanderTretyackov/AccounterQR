import "./App.css";
import { useState } from "react";
import { getThings } from "./api/api.js";

var thing = JSON.parse(
  '{ "name": "Стол", "type": "Мебель", "creationDateTime": "2028-10-31T17:04:32.0000000", "attributes": {"Материал": "Дерево", "Ножки" : 4} }'
);
var things = JSON.parse(
  '[{ "name": "Стол", "type": "Мебель", "creationDateTime": "2028-10-31T17:04:32.0000000", "attributes": {"Материал": "Дерево", "Ножки" : 4} },' +
    '{ "name": "Стол волшебный", "type": "Мебель", "creationDateTime": "2028-10-31T17:04:32.0000000", "attributes": {"Материал": "Дерево волшебное", "Ножки" : 1} }]'
);

console.log(thing);

function ThingsList({ onSelectThing }) {
  return (
    <div className="frame">
      <h3>Просмотр всех объектов</h3>
      <table>
        <tbody>
          <tr>
            <th>Имя</th>
            <th>Тип</th>
            <th>Дата добавления</th>
            <th></th>
          </tr>
          {things.map((thing) => (
            <tr onClick={() => onSelectThing(thing)}>
              <td>{thing.name}</td>
              <td>{thing.type}</td>
              <td>{thing.creationDateTime}</td>
              <td>
                <button onClick={() => onSelectThing(thing)}>Подробнее</button>
              </td>
            </tr>
          ))}
        </tbody>
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
      <h4>Атрибуты:</h4>
      {GetThingAttributes(selectedThing)}
    </div>
  );
}

function App() {
  const [selectedThing, setSelectedThing] = useState(thing);

  function selectThing(newSelectedThing) {
    setSelectedThing(newSelectedThing);
  }
  const temp = getThings();
  console.log(temp);
  return (
    <main>
      <div className="main-things-creation">
        <NewThing />
      </div>
      <div className="main-things-list">
        <ThingsList onSelectThing={selectThing} />
      </div>
      <div className="main-thing-preview">
        <ThingPreview selectedThing={selectedThing} />
      </div>
    </main>
  );
}

export default App;
