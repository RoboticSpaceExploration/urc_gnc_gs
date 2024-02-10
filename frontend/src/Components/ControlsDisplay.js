import React, {useState} from "react";
import {ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import Controls2 from "./Controls2";
import Controls from "./Controls";

function ControlsDisplay() {
    const [usingGamepad, setUsingGamepad] = useState(false);

    function handleChange(e) {
        const value = e.target.value === "true";
        setUsingGamepad(value);
    }

    return (
        <div>
            <ToggleButtonGroup type="radio" name="options" defaultValue="false">
                <ToggleButton id="keyboard-button" variant="secondary" value="false" checked={!usingGamepad} onChange={handleChange}>
                    Keyboard
                </ToggleButton>
                <ToggleButton id="controller-button" variant="secondary" value="true" checked={usingGamepad} onChange={handleChange}>
                    Controller
                </ToggleButton>
            </ToggleButtonGroup>
            {usingGamepad ? <Controls2/> : <Controls/>}
        </div>
    );
}

export default ControlsDisplay
