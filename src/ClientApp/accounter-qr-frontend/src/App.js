import "./App.css";
import { useState, useEffect } from "react";
import {
  getThings,
  getThingQR,
  deleteThingById,
  addNewThing,
} from "./api/api.js";
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
      <table class="table table-striped">
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
                <button
                  onClick={() => deleteThing(thing)}
                  class="btn btn-danger"
                >
                  Удалить
                </button>
              </td>
              <td>{thing.name}</td>
              <td>{thing.type}</td>
              <td>{thing.creationDateTime}</td>
              <td>
                <button
                  onClick={() => onSelectThing(thing)}
                  class="btn btn-info"
                >
                  Подробнее
                </button>
              </td>
              <td>
                <button onClick={() => downloadQR(thing)} class="btn btn-link">
                  QR-код
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

function AddNewThingModalWindow({ addNewThing }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [newAttributeName, setNewAttributeName] = useState("");
  const [newAttributeValue, setNewAttributeValue] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function addAttribute() {
    setAttributes([...attributes, [newAttributeName, newAttributeValue]]);
  }

  function removeLastAttribute() {
    setAttributes(attributes.slice(0, -1));
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeType(e) {
    setType(e.target.value);
  }

  function handleChangeNewAttributeName(e) {
    setNewAttributeName(e.target.value);
  }

  function handleChangeNewAttributeValue(e) {
    setNewAttributeValue(e.target.value);
  }

  function attributesToString() {
    return attributes
      .map((attribute) => `"${attribute[0]}":"${attribute[1]}"`)
      .join(",");
  }

  function constructNewThingJson() {
    return JSON.parse(
      `{ "name": "${name}", "type": "${type}", "attributes": {${attributesToString()}} }`
    );
  }

  function save() {
    const newThingJson = constructNewThingJson();
    console.log(newThingJson);
    addNewThing(newThingJson);
    handleClose();
  }

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
          {
            <div>
              <table>
                <tr>
                  <td>Название</td>
                  <td>
                    <input
                      value={name}
                      onChange={handleChangeName.bind(this)}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>Тип</td>
                  <td>
                    <input
                      value={type}
                      onChange={handleChangeType.bind(this)}
                    ></input>
                  </td>
                </tr>
              </table>
              <table>
                <tr>
                  <th>Атрибут</th>
                  <th>Значение</th>
                </tr>
                {attributes.map((attribute) => (
                  <tr>
                    <td>{attribute[0]}</td>
                    <td>{attribute[1]}</td>
                  </tr>
                ))}
              </table>
              <table>
                <tr>
                  <th>Новый атрибут</th>
                  <th>Новое значение</th>
                </tr>
                <tr>
                  <td>
                    <input
                      value={newAttributeName}
                      onChange={handleChangeNewAttributeName.bind(this)}
                    ></input>
                  </td>
                  <td>
                    <input
                      value={newAttributeValue}
                      onChange={handleChangeNewAttributeValue.bind(this)}
                    ></input>
                  </td>
                </tr>
              </table>
              <Button onClick={addAttribute}>+</Button>
              <Button onClick={removeLastAttribute} variant="danger">
                -
              </Button>
            </div>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={save}>
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

  function addThing(newThing) {
    addNewThing(newThing).then((response) => {
      const newThingFromResponse = response.data;
      setThings([...things, newThingFromResponse]);
    });
  }

  useEffect(() => {
    getThings().then(function (response) {
      setThings(response.data);
    });
  }, []);

  return (
    <main>
      <div class="container">
        <div class="row">
          <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <a
              href="/"
              class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
            >
              <span class="fs-4">Система учета AccounterQR </span>
            </a>
          </header>
        </div>
        <div class="row">
          <div class="col-2">
            <AddNewThingModalWindow addNewThing={addThing} />
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-8">
            <ThingsList
              allThings={things}
              onSelectThing={selectThing}
              deleteThing={deleteThing}
            />
          </div>
          <div class="col-4">
            <ThingPreview selectedThing={selectedThing} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
