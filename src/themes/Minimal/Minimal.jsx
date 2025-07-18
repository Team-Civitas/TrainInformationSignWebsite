import './Minimal.css';
import { useContext } from 'react';
import { AppContext } from '../../AppContext';
import { stationSignatureToName } from '../../components/APIFunctions';
import { formatTime } from '../../components/time';
import { translations } from './translations/translations';
import usePersistentState from '../../components/usePersistentState';

const MinimalThemeDefaults = {
  "minimalThemeTrainAmount": 3
}

export function ThemeSettings() {
  const [trainAmount, setTrainAmount] = usePersistentState("minimalThemeTrainAmount", MinimalThemeDefaults)

  return (
    <div className='MinimalThemeSettings'>
      <input type="number" min="0" max="10" value={trainAmount} onChange={e => setTrainAmount(e.target.value)}/>
    </div>
  )
}

function Simple({ trainArray }) {
  const { showArrivals, language } = useContext(AppContext);
  const [trainAmount] = usePersistentState("minimalThemeTrainAmount", MinimalThemeDefaults);

  console.log(trainAmount)

  const t = translations[language.value]

  const activityTypeToMatch = showArrivals ? 'Ankomst' : 'Avgang';
  const nextTrain = trainArray.find(train => train.ActivityType === activityTypeToMatch);

  if (!nextTrain) {
    return (
      <div className="NoTrain">
        {!showArrivals ? t.noArrivals : t.noDepartures}
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
              : t.destinationUnknown}
          </div>
        </div>
        <div>{toLocationString}</div>
      </div>
    </div>
  );
}

export default Simple;
