import React from "react";
import PopUpMarker from "./PopUpMarker";

const MarkersList = ({ map, array }) => {
  const items = array.map(({ key, ...props }) => (
    <PopUpMarker key={key} map={map} {...props} />
  ));
  return <div>{items}</div>;
};

export default MarkersList;
