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

function ThemeSL({ SLTrainArray }) {
    const { showArrivals } = useContext(AppContext);
    const [infoIndex, setInfoIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setInfoIndex((prev) => prev + 1);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const ARRIVAL = showArrivals;
    console.log(SLTrainArray)

    if (SLTrainArray.length === 0) {return}

    if (ARRIVAL) {
        return (
            <div className="SLTheme">
                <div className="header">
                    <div className="SL-mainHeader">
                        <div>
                        <img id="TrafficType-logotype-nav" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/SL_Rail_Symbol.svg/1024px-SL_Rail_Symbol.svg.png" alt="SL" />
                            <p className="SL-mainHeaderText">Pendeltåg</p>
                            <p className="SL-mainHeaderText SL-English">Commuter Rail</p>
                        </div>
                        <img id="SL-logotype-nav" src="https://upload.wikimedia.org/wikipedia/commons/c/ca/SL_logo.svg" alt="SL" />
                    </div>

                    <div className="SL-grid titles">
                        <p className='linje'>Linje</p>
                        <p className='destination'>Destination</p>
                        <p className='spår'>Spår</p>
                        <p className='tid'>Avgång</p>
                    </div>
                </div>

                {SLTrainArray.departures.map((train) => {
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
                    <p className='tid'>Linje <br /> <span style={{ color: 'orange' }}> Route</span></p>
                    <p className='destination'>Destination <br /> <span style={{ color: 'orange' }}> Destination</span></p>
                    <p className='spår'>Spår <br /> <span style={{ color: 'orange' }}> Track</span></p>
                    <div className="tågnr">Avgång <br /> <span style={{ color: 'orange' }}> Departure</span></div>
                </div>
            </div>

            {SLTrainArray.departures.map((train) => {
                return (
                    <div className="grid" key={train.journey.id /* Do some better key */}> 
                        <p className='tid'>{train.line.designation}</p>
                        <p className='från'>{train.destination}</p>
                        <p className='spår'>{train.stop_point.designation}</p>
                        <p className="tågnr">{formatTime(train.scheduled)}</p>
                    </div>
                );
            })}

        </div>
    )
}

export default ThemeSL