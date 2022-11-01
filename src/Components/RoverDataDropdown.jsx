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

// const choices = [
//   { key: 'camera', text: 'Camera', value: 'camera' },
//   { key: 'model', text: 'Model', value: 'model' },
//   { key: 'speed', text: 'Speed', value: 'speed' },
//   { key: 'specification', text: 'Specifications', value: 'specs' }
// ]; 

// const RoverDataDropdown = () => (
//   <Dropdown Placeholder="Select" fluid multiple selection options = {choices} />
// );

export default RoverDataDropdown;
