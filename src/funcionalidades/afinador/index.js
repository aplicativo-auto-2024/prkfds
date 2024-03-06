import React, { useState } from "react";

export default function Index() {
    const [tuning, setTuning] = useState({
        string1: "E",
        string2: "A",
        string3: "D",
        string4: "G",
        string5: "B",
        string6: "E"
    });

    return (
        <div>
            <h1>Afinador de Violão</h1>
            <div>
                <p>String 1: {tuning.string1}</p>
                <p>String 2: {tuning.string2}</p>
                <p>String 3: {tuning.string3}</p>
                <p>String 4: {tuning.string4}</p>
                <p>String 5: {tuning.string5}</p>
                <p>String 6: {tuning.string6}</p>
            </div>
        </div>
    );
}
