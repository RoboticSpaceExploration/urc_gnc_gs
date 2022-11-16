import React from "react";
import { Dropdown }  from "semantic-ui-react";

const RoverDataDropdown = () => {
  const options = [
    { key: 'camera', text: 'Camera', value: 'camera' },
    { key: 'model', text: 'Model', value: 'model' },
    { key: 'speed', text: 'Speed', value: 'speed' },
    { key: 'specification', text: 'Specifications', value: 'specs' }
  ];

  return (
    <div className="rover-data-dropdown"> 
      <Dropdown placeholder='Select' fluid multiple selection options = {options} />
    </div>
  ); 
};

export default RoverDataDropdown;
