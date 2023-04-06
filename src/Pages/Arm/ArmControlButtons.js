import React from 'react';
import PropTypes from "prop-types";
import { Button, ButtonGroup, Image } from 'react-bootstrap';

const ArmControlButtons = ({ top, left, number }) => {
    const buttonStyle = { width: 100, height: 50, top: top, left: left, position: 'absolute' };

    const handleUp = (e) => {
        if (number === 1) {
            return true;
        }
    }

    const handleDown = (e) => {
        console.log(e.target.id);
    }

    return (
        <ButtonGroup vertical style={buttonStyle}>
            <Button variant='outline-dark' id={`${number}-up`} onClick={(e) => handleUp(e)}>
                <h3><i className="fa-solid fa-angle-up" /></h3>
            </Button>
            <Button variant='outline-dark' id={`${number}-down`} onClick={(e) => handleDown(e)}>
                <h3><i className="fa-solid fa-angle-down" /></h3>
            </Button>
        </ButtonGroup>
    )
}

ArmControlButtons.propType = {
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
}

export default ArmControlButtons;