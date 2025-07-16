import './StandardTheme.css';
import { useState, useEffect } from 'react';

function StandardTheme() {
    // mekanik för klockan (tack stackoverflow)
    const [klocka, setKlocka] = useState('');

    useEffect(() => {
        function uppdateraKlocka() {
            const nu = new Date();
            const timmar = String(nu.getHours()).padStart(2, '0');
            const minuter = String(nu.getMinutes()).padStart(2, '0');
            setKlocka(`${timmar}:${minuter}`);
        }

        uppdateraKlocka();
        const intervalId = setInterval(uppdateraKlocka, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (

        // JSX för StandardTheme
        <div className="StandardTheme">
            <div className="header">
                <div className="mainHeader">
                    <p className="mainHeaderText">Ankommande tåg - Train arrivals</p>
                    <p className="currentTime">{klocka}</p>
                </div>
                <div className="grid titles">
                    <p className='tid'>Tid</p>
                    <p className='från'>Från</p>
                    <p className="nyTid" id='whiteColor'>Ny tid</p>
                    <p className='spår'>Spår</p>
                    <p className='anmärkning'>Anmärkning</p>
                    <div className="tågnr">Tågnummer</div>
                </div>
            </div>
            
            {stationArray.map((i) =>
            <div className="grid">
                <p className='tid'>08:02</p>
                <p className='från'>{i.ToLocation}</p>
                <p className="nyTid">08:40</p>
                <p className='spår'>2b</p>
                <p className='anmärkning'>Försenad</p>
                <p className="tågnr">1234</p>
            </div>
            )}

            <div className="grid">
                <p className='tid'>08:02</p>
                <p className='från'>Stockholm C</p>
                <p className="nyTid">08:40</p>
                <p className='spår'>2b</p>
                <p className='anmärkning'>Försenad</p>
                <p className="tågnr">1234</p>
            </div>

            <div className="grid">
                <p className="tid">08:10</p>
                <p className="från">Bålsta Enköping</p>
                <p className="nyTid">09:00</p>
                <p className="spår">1a</p>
                <p className="anmärkning">Sen tågvänd</p>
                <p className="tågnr">163</p>
            </div>

            <div className="grid">
                <p className="tid">08:36</p>
                <p className="från">Uppsala C Stockholm C</p>
                <p className="nyTid"></p>
                <p className="spår">5a</p>
                <p className="anmärkning">SJ Regional</p>
                <p className="tågnr">1553</p>
            </div>

            <div className="grid">
                <p className="tid">09:20</p>
                <p className="från">Bålsta Enköping</p>
                <p className="nyTid"></p>
                <p className="spår">3</p>
                <p className="anmärkning">SJ Regional</p>
                <p className="tågnr">643</p>
            </div>

            <div className="grid">
                <p className="tid">09:54</p>
                <p className="från">Bålsta Enköping</p>
                <p className="nyTid"></p>
                <p className="spår">4b</p>
                <p className="anmärkning">SJ Regional</p>
                <p className="tågnr">222</p>
            </div>


        </div>
    )
}

export default StandardTheme