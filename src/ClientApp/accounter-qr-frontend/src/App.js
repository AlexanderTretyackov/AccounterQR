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

function NewThing() {
  return (
    <div className="frame">
      <h3>Добавление новой вещи</h3>
      <div id="openModal" class="modal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title">Добавление объекта</h3>
            </div>
            <select id="city-select" name="city">
              <option>{thing.name}</option>
            </select>
            <div class="modal-body">
              <table>
                <tr>
                  <th>Атрибут</th>
                  <th>Значение</th>
                </tr>
                <tr>
                  <td>Ширина</td>
                  <td>
                    <input
                      type="text"
                      name="width"
                      requiredminlength="1"
                      maxlength="5"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Высота</td>
                  <td>
                    <input
                      type="text"
                      name="height"
                      requiredminlength="1"
                      maxlength="5"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Длина</td>
                  <td>
                    <input
                      type="text"
                      name="length"
                      requiredminlength="1"
                      maxlength="5"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Количество ножек</td>
                  <td>
                    <input
                      type="text"
                      name="legs"
                      requiredminlength="1"
                      maxlength="4"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Материал</td>
                  <td>
                    <input
                      type="text"
                      name="material"
                      requiredminlength="3"
                      maxlength="20"
                    />
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <button>Сохранить</button>
      <button>Отмена </button>
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
            <AddNewThingModalWindow />
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
