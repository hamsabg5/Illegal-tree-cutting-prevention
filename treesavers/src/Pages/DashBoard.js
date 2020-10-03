import React from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import NavBar from "components/NavBar.js";
import "styles/dashboard.scss";
import CustomTable from "components/CustomTable";
import { database } from "config/firebase";

import Footer from "components/Footer";
import Cards from "components/Cards";
import LiveBanner from "components/LiveBanner";
import Spinner from "components/Spinner";
import LeafletMap from "components/LeafletMap";
import TestOnline from "./testOnline.js";
import thresholds from "config/thresholds.js";
import sendMessage from "sendNexmoMsg.js";

const DashBoard = () => {
  const [state, setState] = React.useState([]);
  const [selectedDevice, setSelectedDevice] = React.useState(null);
  const [latestDetails, setLatestDetails] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const devicesRef = database.ref("devices");
    devicesRef.on("value", (snapshot) => {
      const list = [];
      const latestDetails = [];
      snapshot.forEach((snap) => {
        const data = snap.val();
        const device = snap.key;
        list.push({
          device,
          online: data.online, //true/false
          disabled: data.disabled, //true/false
          values: data.values,
        });
        const keys = Object.keys(data.values);
        const latestKey = keys[keys.length - 1];
        const penultimateKey = keys.length > 1 ? keys[keys.length - 2] : false;
        const previousAngle = penultimateKey
          ? data.values[penultimateKey].angle
          : data.values[latestKey].angle;


        latestDetails.push({
          ...data.values[latestKey],
          angle:
          data.values[latestKey].tilt ||
            thresholds.angleDiff(data.values[latestKey].angle, previousAngle),
          device,
          online: data.online, //true/false
          disabled: data.disabled,
        });
      });
      setState(list);
      setLatestDetails(latestDetails);
      setSelectedDevice(list.length && list[0].device);
      setLoading(false);
    });
  }, []);

  React.useEffect(() => {
    if (!latestDetails[0]) return;
    const data = latestDetails[0]; //device 0
    const events = [];
    if (data.temp === true) {
      events.push("Temperature is high");
    }
    if (data.noise === true) {
      events.push("Noise detected");
    }
    if (data.angle === true) {
      events.push("It's Titled");
    }
    if (events.length > 0) {
      const message = "Alert! Tree #0 is in danger, " + events.join(",");
      sendMessage(message);
    }
  }, [latestDetails]);

  //same index applies for latestDetails array also
  const selectDeviceIdx = state.findIndex(
    (item) => item.device === selectedDevice
  );
  let selectedDeviceGeoPos = [12.5218, 76.8951]; //by default mandya position
  if (
    latestDetails[selectDeviceIdx] &&
    latestDetails[selectDeviceIdx].location
  ) {
    selectedDeviceGeoPos = latestDetails[selectDeviceIdx].location
      .split(",")
      .map((s) => parseFloat(s));
    // console.log(selectedDeviceGeoPos);
  }
  return (
    <main className="primary-bg" style={{ minHeight: "100vh" }}>
      <NavBar count={state.length} />

      <div className="cards-wrapper">
        <LiveBanner title="Live Updates" />
        {loading && <Spinner className="mx-auto" />}
        <Cards
          selectedDevice={selectedDevice}
          latestDetails={latestDetails}
          setSelectedDevice={(device) => setSelectedDevice(device)}
        />
      </div>
      {!loading && (
        <>
          <Container fluid>
            <Row>
              <Col sm={12} md={8} className="mx-auto">
                <p className="heading">
                  Device {latestDetails[selectDeviceIdx].device} Details
                </p>
                <CustomTable
                  data={
                    selectDeviceIdx !== -1 ? state[selectDeviceIdx].values : []
                  }
                />
                {loading && <Spinner className="mx-auto mt-5" />}
              </Col>
            </Row>
          </Container>
          {latestDetails && latestDetails.length !== 0 && (
            <div id="map" className="map-wrapper">
              <p className="heading">Where are We Right Now?</p>
              <LeafletMap
                data={latestDetails.map((item) => ({
                  device: item.device,
                  position: item.location.split(",").map((s) => parseFloat(s)),
                }))}
              />
            </div>
          )}
          <Footer />
          {/* setIntervalMethod accesses this data  */}
          <TestOnline latestDetails={latestDetails} />
        </>
      )}
    </main>
  );
};

export default DashBoard;
