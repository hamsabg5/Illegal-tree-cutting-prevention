import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import LeaftletTreeIcon from "components/LeaftletTreeIcon";
import "leaflet/dist/leaflet.css";

//data = [{device,position},...]
const LeafletMap = ({ data }) => {
  const mandyaPosition = [12.5218, 76.8951]; //for centering , in (all cases)
  const [state, setState] = React.useState({
    position:[null,null],
    show:false
  });
  return (
    <Map center={mandyaPosition} zoom={10}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {state.show && (
        <Popup
          position={state.position}
          onClose={() => {
            setState({
              position:[null,null],
              show:false
            });
          }}
        >
          <span>Device {state.device}</span>
        </Popup>
      )}
      {data.map(item => <Marker
        key={item.device}
        position={item.position} //{[lat, long]}
        icon={LeaftletTreeIcon}
        onclick={(e) => {
          console.log(e)
          setState({
            position:e.latlng,
            show:true,
            device:item.device
          });
        }}
    />)}

    </Map>
  );
};

export default LeafletMap;
