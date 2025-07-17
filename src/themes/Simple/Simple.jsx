import './Simple.css';
import { stationSignatureToName } from '../../components/APIFunctions';
import { formatTime } from '../../components/time';

function Simple({ trainArray }) {
    const now = new Date();

    const nextTrain = trainArray
        .slice()
        .filter(t => new Date(t.AdvertisedTimeAtLocation) > now)
        .sort((a, b) => new Date(a.AdvertisedTimeAtLocation) - new Date(b.AdvertisedTimeAtLocation))[0];

    if (!nextTrain) return <div className="SimpleTheme">Inga kommande avgångar</div>;

    const toLocationString = nextTrain.ToLocation
        .map(stationSignatureToName)
        .join(' → ');

    return (
        <div className='SimpleTheme'>
            <div>
                <div className='SimpleThemeHeader'>
                    <div className="DepartureTime">
                        {formatTime(nextTrain.AdvertisedTimeAtLocation)}
                    </div>
                    <div>
                        {stationSignatureToName(nextTrain.ToLocation[0])}
                    </div>
                </div>
                <div>
                    {toLocationString}
                </div>
            </div>
        </div>
    );
}

export default Simple;
