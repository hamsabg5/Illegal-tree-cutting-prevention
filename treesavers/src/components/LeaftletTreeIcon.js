import L from "leaflet";
import tree from "assets/single-tree.svg";

//stackoverflow.com/questions/47723812/custom-marker-icon-with-react-leaflet
const LeaftletTreeIcon = new L.Icon({
  iconUrl: tree,
  iconRetinaUrl: tree,
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(60, 75),
  className: "leaflet-div-icon",
});

export default LeaftletTreeIcon;
