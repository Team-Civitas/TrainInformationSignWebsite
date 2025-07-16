import './StandardTheme.css';
import { useState, useEffect } from 'react';
import { stationSignatureToName, operationalTrainNumberToAnnouncment } from '../../components/APIFunctions.jsx';

function StandardTheme ({ trainArray }) {
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

    console.log(trainArray);

    function formatTime(isoString) {
        const date = new Date(isoString);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    return (
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
            
            {trainArray.map((train) => {
                const toLocationString = train.ToLocation
                    .map(stationSignatureToName)
                    .join(' ');
                return (
                    <div className="grid">
                        <p className='tid'>{formatTime(train.AdvertisedTimeAtLocation)}</p>
                        <p className='från'>{toLocationString}</p>
                        <p className="nyTid">
                          {train.EstimatedTimeIsPreliminary
                            ? formatTime(train.EstimatedTimeAtLocation)
                            : ''}
                        </p>
                        <p className='spår'>{train.TrackAtLocation}</p>
                        <p className='anmärkning'>{train.Deviation}</p>
                        <p className="tågnr">{train.AdvertisedTrainIdent}</p>
                    </div>
                );
            })}

        </div>
    )
}

export default StandardTheme