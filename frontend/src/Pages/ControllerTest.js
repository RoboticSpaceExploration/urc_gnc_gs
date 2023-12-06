import {useState} from "react";
import {useGamepads} from "react-gamepads";

const buttonLabels = [
    "A",
    "B",
    "X",
    "Y",
    "L1",
    "R1",
    "L2",
    "R2",
    "BACK",
    "START",
    "L3",
    "R3",
    "UP",
    "DOWN",
    "LEFT",
    "RIGHT",
    "HOME",
    "MULTIMEDIA"
]

const axesLabels = [
    "LX",
    "LY",
    "RX",
    "RY"
]

function ControllerTest() {
    const [gamepads, setGamepads] = useState([]);
    useGamepads(_gamepads => {
        setGamepads(Object.values(_gamepads))
    })
    if (!gamepads) return '';
    return (
        <div className="ControllerTest">
            {gamepads.length && gamepads.map(gp => {
                return (
                    <div>
                        <div><span>ID:</span>{gp.id}</div>
                        {gp.buttons.map((button, index) => {
                            return (
                                <div><span>{buttonLabels[index]}:</span><span>{button.value}</span></div>
                            )
                        })}
                        {gp.axes.map((stick, label) => {
                            return (
                                <div><span>{axesLabels[label]}:</span><span>{stick}</span></div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    );
}



export default ControllerTest;
