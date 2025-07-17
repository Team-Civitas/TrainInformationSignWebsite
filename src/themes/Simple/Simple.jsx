import './Simple.css';
import { useContext } from 'react';
import { AppContext } from '../../AppContext';
import { stationSignatureToName } from '../../components/APIFunctions';
import { formatTime } from '../../components/time';

function Simple({ trainArray }) {
  const { isArrival } = useContext(AppContext);

  const activityTypeToMatch = !isArrival ? 'Ankomst' : 'Avgang';
  const nextTrain = trainArray.find(train => train.ActivityType === activityTypeToMatch);

  if (!nextTrain) {
    return (
      <div className="NoTrain">
        {!isArrival ? 'Inga kommande ankomster' : 'Inga kommande avgångar'}
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
