import './sl.css';
import { useState, useEffect, useContext } from 'react';
import { stationSignatureToName } from '../../components/APIFunctions.jsx';
import { formatTime } from '../../components/time.jsx';
import Clock from '../../components/clock.jsx';
import { AppContext } from '../../AppContext.js';

export function ThemeSettings() {
    return (
        <div>Hello, SL!</div>
    )
}

function ThemeSL({ trainArray }) {
    const { showArrivals } = useContext(AppContext);
    const [infoIndex, setInfoIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setInfoIndex((prev) => prev + 1);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const ARRIVAL = showArrivals;

    if (ARRIVAL) {
        return (
            <div className="StandardTheme">
                <div className="header">
                    <div className="mainHeader">
                        <p className="mainHeaderText">Ankommande tåg - Train arrivals</p>
                        <Clock className="currentTime" />
                    </div>
                    <div className="grid titles">
                        <p className='tid'>Tid</p>
                        <p className='destination'>Från</p>
                        <p className="nyTid" id='whiteColor'>Ny tid</p>
                        <p className='spår'>Spår</p>
                        <p className='anmärkning'>Anmärkning</p>
                        <div className="tågnr">Tågnummer</div>
                    </div>
                </div>

                {trainArray.map((train) => {
                    if (train.ActivityType !== 'Ankomst') {
                        return null;
                    }

                    const deviations = Array.isArray(train.Deviation) ? train.Deviation : [];
                    const productInfo = Array.isArray(train.ProductInformation) ? train.ProductInformation : (train.ProductInformation ? [train.ProductInformation] : []);
                    const infoList = [...deviations, ...productInfo];
                    const currentInfo = infoList.length > 0 ? infoList[infoIndex % infoList.length] : '';

                    const fromLocationString = train.FromLocation
                        .map(stationSignatureToName)
                        .join(' ');

                    return (
                        <div className="grid" key={train.AdvertisedTrainIdent}>
                            <p className='tid'>{formatTime(train.AdvertisedTimeAtLocation)}</p>
                            <p className='från'>{fromLocationString}</p>
                            <p className="nyTid">
                                {train.EstimatedTimeAtLocation
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

    return (
        <div className="StandardTheme">
            <div className="header">
                <div className="mainHeader">
                    <p className="mainHeaderText">Tunnelbana <span style={{ color: 'orange' }}> Metro</span></p>
                </div>
                <div className="grid titles">
                    <p className='tid'>Linje <br/> <span style={{ color: 'orange' }}> Route</span></p>
                    <p className='destination'>Destination <br/> <span style={{ color: 'orange' }}> Destination</span></p>
                    <p className='spår'>Spår <br/> <span style={{ color: 'orange' }}> Track</span></p>
                    <div className="tågnr">Avgång <br/> <span style={{ color: 'orange' }}> Departure</span></div>
                </div>
            </div>
            
            {trainArray.map((train) => {
                if (train.ActivityType !== 'Avgang') {
                    return null;
                }
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
                          {train.EstimatedTimeAtLocation
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

export default ThemeSL