import "./App.css";
import { useState, useEffect } from "react";
import { getThings, getThingQR, deleteThingById } from "./api/api.js";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

var thing = JSON.parse(
  '{ "name": "Стол", "type": "Мебель", "creationDateTime": "2028-10-31T17:04:32.0000000", "attributes": {"Материал": "Дерево", "Ножки" : 4} }'
);
var testThings = JSON.parse(
  '[{ "name": "Стол", "type": "Мебель", "creationDateTime": "2028-10-31T17:04:32.0000000", "attributes": {"Материал": "Дерево", "Ножки" : 4} },' +
    '{ "name": "Стол волшебный", "type": "Мебель", "creationDateTime": "2028-10-31T17:04:32.0000000", "attributes": {"Материал": "Дерево волшебное", "Ножки" : 1} }]'
);

export function convertByteArrayToBlob(data, mimeType) {
  const file = new Blob([data], { type: mimeType });
  return URL.createObjectURL(file);
}

function ThingsList({ allThings, onSelectThing, deleteThing }) {
  function downloadQR(thing) {
    getThingQR(thing.id).then((response) => {
      const element = document.createElement("a");
      element.href = convertByteArrayToBlob(response.data, "png");
      element.download = "qr.png";
      document.body.appendChild(element);
      element.click();
    });
  }

  return (
    <div className="frame">
      <h3>Просмотр всех объектов</h3>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Имя</th>
            <th>Тип</th>
            <th>Дата добавления</th>
            <th></th>
            <th></th>
          </tr>
          {allThings.map((thing) => (
            <tr>
              <td>
                <button onClick={() => deleteThing(thing)}>Удалить</button>
              </td>
              <td>{thing.name}</td>
              <td>{thing.type}</td>
              <td>{thing.creationDateTime}</td>
              <td>
                <button onClick={() => onSelectThing(thing)}>Подробнее</button>
              </td>
              <td>
                <button onClick={() => downloadQR(thing)}>QR-код</button>
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

function AddNewThingModalWindow() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Добавить объект
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Добавление нового объекта</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewThing></NewThing>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function App() {
  const [selectedThing, setSelectedThing] = useState(thing);
  const [things, setThings] = useState([]);

  function selectThing(newSelectedThing) {
    setSelectedThing(newSelectedThing);
  }

  function deleteThing(thing) {
    deleteThingById(thing.id).then((response) => {
      setThings(things.filter((t) => !(t.id == thing.id)));
    });
  }

  useEffect(() => {
    getThings().then(function (response) {
      setThings(response.data);
    });
  }, []);

  return (
    <main>
      <AddNewThingModalWindow />
      <div className="main-things-list">
        <ThingsList
          allThings={things}
          onSelectThing={selectThing}
          deleteThing={deleteThing}
        />
      </div>
      <div className="main-thing-preview">
        <ThingPreview selectedThing={selectedThing} />
      </div>
    </main>
  );
}

export default App;
