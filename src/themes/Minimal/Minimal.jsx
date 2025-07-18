import './Minimal.css';
import { useContext } from 'react';
import { AppContext } from '../../AppContext';
import { stationSignatureToName } from '../../components/APIFunctions';
import { formatTime } from '../../components/time';
import { translations } from './translations/translations';
import usePersistentState from '../../components/usePersistentState';

const MinimalThemeDefaults = {
  "minimalThemeTrainAmount": 3,
  minimalThemeColor: '#ced64d'
}

export function ThemeSettings() {
  const [trainAmount, setTrainAmount] = usePersistentState("minimalThemeTrainAmount", MinimalThemeDefaults);
  const [themeColor, setThemeColor] = usePersistentState("minimalThemeColor", MinimalThemeDefaults);

  const { language } = useContext(AppContext);
  const t = translations[language.value];

  const resetColor = () => {
    setThemeColor(MinimalThemeDefaults.minimalThemeColor);
  }

  return (
    <div className='MinimalThemeSettings'>
      <label>
        {t.numberOfTrains}
        <input
          type="number"
          min="0"
          max="10"
          value={trainAmount}
          onChange={e => setTrainAmount(e.target.value)}
        />
      </label>

      <label style={{ marginLeft: '20px' }}>
        {t.themeColor}
        <input
          type="color"
          value={themeColor}
          onChange={e => setThemeColor(e.target.value)}
          style={{ marginLeft: '8px', verticalAlign: 'middle' }}
        />
      </label>

      <button onClick={resetColor} style={{ marginLeft: '20px', padding: '4px 10px', cursor: 'pointer' }}>
        {t.resetColor}
      </button>
    </div>
  );
}


function Simple({ trainArray }) {
  const { showArrivals, language } = useContext(AppContext);
  const [trainAmount] = usePersistentState("minimalThemeTrainAmount", MinimalThemeDefaults);
  const [themeColor] = usePersistentState("minimalThemeColor", MinimalThemeDefaults);

  const t = translations[language.value];
  const activityTypeToMatch = showArrivals ? 'Ankomst' : 'Avgang';

  const filteredTrains = trainArray.filter(train => train.ActivityType === activityTypeToMatch);

  if (filteredTrains.length === 0) {
    return (
      <div
        className="NoTrain"
        style={{ color: themeColor, backgroundColor: '#2b2b2b' }}
      >
        {!showArrivals ? t.noArrivals : t.noDepartures}
      </div>
    );
  }

  const firstTrain = filteredTrains[0];
  const nextTrains = filteredTrains.slice(1, 1 + Number(trainAmount));

  const renderTrainSummary = (train) => {
    const toLocationArray = train.ToLocation || [];
    const toLocationString = toLocationArray
      .map(loc => stationSignatureToName(loc))
      .join(' → ');

    return (
      <div className="TrainSummary" key={train.ActivityId || train.AdvertisedTimeAtLocation}>
        <span className="Time" style={{ color: themeColor }}>
          {formatTime(train.AdvertisedTimeAtLocation)}
        </span>
        <span className="Destination" style={{ color: themeColor }}>
          {toLocationArray[0] ? stationSignatureToName(toLocationArray[0]) : t.destinationUnknown}
        </span>
        <span className="Route" style={{ color: themeColor }}>
          {toLocationString}
        </span>
      </div>
    );
  };

  return (
    <div className="SimpleTheme" style={{ color: themeColor, backgroundColor: '#2b2b2b' }}>
      <div className="FirstTrain">
        <div className="SimpleThemeHeader">
          <div className="DepartureTime" style={{ color: themeColor }}>
            {formatTime(firstTrain.AdvertisedTimeAtLocation)}
          </div>
          <div style={{ color: themeColor }}>
            {firstTrain.ToLocation && firstTrain.ToLocation.length > 0
              ? stationSignatureToName(firstTrain.ToLocation[0])
              : t.destinationUnknown}
          </div>
        </div>
        <div style={{ color: themeColor }}>
          {(firstTrain.ToLocation || [])
            .map(loc => stationSignatureToName(loc))
            .join(' → ')}
        </div>
      </div>

      <div className="NextTrainsList">
        {nextTrains.map(renderTrainSummary)}
      </div>
    </div>
  );
}

export default Simple;
