import React from "react";
import { database } from "config/firebase";
import { Modal } from "react-bootstrap";
import Input from "components/Input";
import Spinner from "components/Spinner";
import thresholds from "config/thresholds";

const Test = ({ show, onHide }) => {
  const [state, setState] = React.useState({
    loading: false,
    location: "12.9716,77.5946",
    angle: 30,
    temp: 30,
    noise: 30,
    device: 0,
  });

  const tempAddData = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setState((state) => ({ ...state, loading: true }));
    const deviceRef = database.ref("devices/" + state.device + "/values");
    const item = {
      date: Date.now()/1000,
      location: state.location,
      noise: parseFloat(state.noise) > thresholds.noise,
      angle: state.angle,
      temp: parseFloat(state.temp) > thresholds.temp,
    };
    await deviceRef.push(item);
    setState((state) => ({ ...state, loading: false }));
    onHide();
  };
  const onChange = ({ target: { value, name } }) => {
    setState((state) => ({ ...state, [name]: value }));
  };
  return (
    <Modal size="md" show={show} onHide={onHide}>
      <Modal.Title className="text-center mt-4"> Test Details </Modal.Title>
      <Modal.Body>
        <form className="mx-auto " onSubmit={tempAddData} id="test">
          <Input
            type="number"
            name="device"
            label="Device Number"
            placeholder="0"
            value={state.device}
            onChange={onChange}
          />
          <Input
            type="number"
            name="temp"
            label="Temperature"
            labelAfterStr=" > 40 is High"
            placeholder="30"
            value={state.temp}
            onChange={onChange}
          />
          <Input
            type="number"
            name="noise"
            label="Noise"
            placeholder="30"
            labelAfterStr={` > ${thresholds.noise} is High`}
            value={state.noise}
            onChange={onChange}
          />
          <Input
            type="number"
            name="angle"
            label="Angle"
            placeholder="30"
            value={state.angle}
            onChange={onChange}
          />
          <Input
            type="text"
            name="location"
            label="Location"
            placeholder="12.9716, 77.5946"
            value={state.location}
            onChange={onChange}
          />
          <button className="primary-btn d-block mx-auto mb-1">
            {state.loading ? <Spinner /> : "Submit"}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Test;
