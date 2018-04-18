import React from "react";
import PopUpMarker from "./PopUpMarker";

const MarkersList = ({array}) => {
  const items = array.map((element) => (
    <PopUpMarker key={element.key} position={element.position} text={element.text} />
  ));
  return <div>{items}</div>;
};

export default MarkersList;
