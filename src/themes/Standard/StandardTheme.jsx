import './StandardTheme.css';
import { useState, useEffect } from 'react';
import { stationSignatureToName, operationalTrainNumberToAnnouncment } from '../../components/APIFunctions.jsx';
import { formatTime } from '../../components/time.jsx';
import Clock from '../../components/clock.jsx';

function StandardTheme ({ trainArray }) {
    const [infoIndex, setInfoIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setInfoIndex((prev) => prev + 1);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="StandardTheme">
            <div className="header">
                <div className="mainHeader">
                    <p className="mainHeaderText">Avgående tåg - Train departures</p>
                    <Clock className="currentTime"/>
                </div>
                <div className="grid titles">
                    <p className='tid'>Tid</p>
                    <p className='destination'>Destination</p>
                    <p className="nyTid" id='whiteColor'>Ny tid</p>
                    <p className='spår'>Spår</p>
                    <p className='anmärkning'>Anmärkning</p>
                    <div className="tågnr">Tågnummer</div>
                </div>
            </div>
            
            {trainArray.map((train) => {
                const deviations = Array.isArray(train.Deviation) ? train.Deviation : [];
                const productInfo = Array.isArray(train.ProductInformation) ? train.ProductInformation : (train.ProductInformation ? [train.ProductInformation] : []);
                const infoList = [...deviations, ...productInfo];
                const currentInfo = infoList.length > 0 ? infoList[infoIndex % infoList.length] : '';

                const toLocationString = train.ToLocation
                    .map(stationSignatureToName)
                    .join(' ');

                return (
                    <div className="grid" key={train.AdvertisedTrainIdent}>
                        <p className='tid'>{formatTime(train.AdvertisedTimeAtLocation)}</p>
                        <p className='från'>{toLocationString}</p>
                        <p className="nyTid">
                          {train.EstimatedTimeIsPreliminary
                            ? formatTime(train.EstimatedTimeAtLocation)
                            : ''}
                        </p>
                        <p className='spår'>{train.TrackAtLocation}</p>
                        <p className='anmärkning'>{currentInfo}</p>
                        <p className="tågnr">{train.AdvertisedTrainIdent}</p>
                    </div>
                );
            })}

        </div>
    )
}

export default StandardTheme