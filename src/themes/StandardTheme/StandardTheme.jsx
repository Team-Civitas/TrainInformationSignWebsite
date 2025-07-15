import React from "react";
import './StandardTheme.css';

function StandardTheme() {
    return (
        <div className="StandardTheme">
            <div className="header">
                <div className="mainHeader">
                    <p className="mainHeaderText">Ankommande tåg - Train arrivals</p>
                    <p className="currentTime">08:35</p>
                </div>
                <div className="grid titles">
                    <p>Tid</p>
                    <p>Från</p>
                    <p>Ny tid</p>
                    <p>Spår</p>
                    <p>Anmärkning</p>
                    <div className="tågnr">Tågnummer</div>
                </div>
            </div>

            <div className="grid">
                <div>08:02</div>
                <div>Stockholm C</div>
                <div className="nyTid">08:40</div>
                <div>2b</div>
                <div>Försenad</div>
                <div className="tågnr">1234</div>
            </div>

            <div class="grid">
                <div>08:10</div>
                <div>Bålsta Enköping</div>
                <div className="nyTid">09:00</div>
                <div>1a</div>
                <div>Sen tågvänd</div>
                <div className="tågnr">163</div>
            </div>
            
            <div class="grid">
                <div>08:36</div>
                <div>Uppsala C Stockholm C</div>
                <div></div>
                <div>5a</div>
                <div>SJ Regional</div>
                <div className="tågnr">1553</div>
            </div>
            
            <div class="grid">
                <div>09:20</div>
                <div>Bålsta Enköping</div>
                <div></div>
                <div>3</div>
                <div>SJ Regional</div>
                <div className="tågnr">643</div>
            </div>
            
            <div class="grid">
                <div>09:54</div>
                <div>Bålsta Enköping</div>
                <div></div>
                <div>4b</div>
                <div>SJ Regional</div>
                <div className="tågnr">222</div>
            </div>

        </div>
    )
}

export default StandardTheme