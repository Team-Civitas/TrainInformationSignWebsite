import './Minimal.css';
import { useContext } from 'react';
import { AppContext } from '../../AppContext';
import { stationSignatureToName } from '../../components/APIFunctions';
import { formatTime } from '../../components/time';

export function ThemeSettings() {
    return (
        <div>Hello, Minimal!</div>
    )
}

function Simple({ trainArray }) {
  const { showArrivals } = useContext(AppContext);

  const activityTypeToMatch = !showArrivals ? 'Ankomst' : 'Avgang';
  const nextTrain = trainArray.find(train => train.ActivityType === activityTypeToMatch);

  if (!nextTrain) {
    return (
      <div className="NoTrain">
        {!showArrivals ? 'Inga kommande ankomster' : 'Inga kommande avgångar'}
      </div>
    );
  }

  const toLocationArray = nextTrain.ToLocation || [];
  const toLocationString = toLocationArray
    .map(loc => stationSignatureToName(loc))
    .join(' → ');

  return (
    <div className="SimpleTheme">
      <div>
        <div className="SimpleThemeHeader">
          <div className="DepartureTime">
            {formatTime(nextTrain.AdvertisedTimeAtLocation)}
          </div>
          <div>
            {toLocationArray[0]
              ? stationSignatureToName(toLocationArray[0])
              : 'Okänd destination'}
          </div>
        </div>
        <div>{toLocationString}</div>
      </div>
    </div>
  );
}

export default Simple;
