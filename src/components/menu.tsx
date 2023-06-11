import React from "react";

export default function Menu() {
    return (
        <div id="lefColumn">
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                <input type="checkbox" id="checkbox1" />
                <label htmlFor="checkbox1" style={{ marginLeft: "8px" }}>На выбивание</label>
            </div>
            <h2 id="title">Игроки</h2>
            <div id="playerList">
                <div className="playerItem" id="playerItem0">
                    <input id="text0" className="nicksInput" maxLength={50} type="text" />
                    <span className="inputButton cross"></span>
                </div>
            </div>
            <h2>Выбившие</h2>
            <div id="destroyedList"></div>
        </div>
    );
}
