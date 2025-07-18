import { useContext } from 'react';
import { themeList } from '../../themes/themes';
import { nameToStationSignature } from '../../components/APIFunctions';
import { AppContext } from '../../AppContext';
import './Settings.css'
import Navbar from '../../components/Navbar/Navbar';
import MySelect from '../../components/MySelect/MySelect';
import { AcquireThemeSettings } from '../../components/AcquireTheme';
import { languageOptions } from '../../languages/languages';
import { translations } from '../../languages/languages';
import MyButton from '../../components/MyButton/MyButton';

function Settings() {
  const { theme, setTheme, selectedStation, setSelectedStation, stationList, showArrivals, setArrival, language, setLanguage } = useContext(AppContext);
  const t = translations[language.value]

  const stationOptions = Array.isArray(stationList.stationsArray)
    ? stationList.stationsArray.map(station => ({
      value: nameToStationSignature(station.AdvertisedLocationName),
      label: station.AdvertisedLocationName,
    }))
    : [];

  const themeOptions = themeList.map(t => ({
    value: t,
    label: t,
  }));

  return (
    <div>
      <Navbar className="constant" />

      <div className="SettingsMain">

        <div className="GlobalSettings">
          <h1>{t.globalSettings}</h1>

          <div className="LanguageSelector">
            <h2>{t.chooseLanguage}</h2>
            <MySelect
              options={languageOptions}
              value={language}
              onChange={(opt) => setLanguage(opt)}
              placeholder={t.chooseLanguage}
            />
          </div>

          <div className="ThemeSelector">
            <h2 className="ThemeSelectorLabel">{t.chooseTheme}:</h2>
            <MySelect
              options={themeOptions}
              value={themeOptions.find(opt => opt.value === theme)}
              onChange={(opt) => setTheme(opt.value)}
              placeholder={t.chooseTheme}
            />
          </div>

          <div className="StationSearchMeny">
            <h2>{t.chooseStation}:</h2>
            <MySelect
              options={stationOptions}
              value={selectedStation}
              onChange={setSelectedStation}
              placeholder={t.chooseStation}
            />
          </div>

          <div className='DepArrButtons'>
            <h2>{t.chooseDisplay}:</h2>
            <div>
              <MyButton
                onClick={() => setArrival(true)}
                className={`TwinButton ArrButton DefaultButton ${showArrivals ? 'DefaultActiveButton' : ''}`}
                title={t.Arrival}
                type="left"
              />
              <MyButton
                onClick={() => setArrival(false)}
                className={`TwinButton DepButton DefaultButton ${!showArrivals ? 'DefaultActiveButton' : ''}`}
                title={t.Departure}
                type="right"
              />
            </div>

          </div>

        </div>
        
        <div className="ThemeSettings">
          <h1 id='ThemeSettingsID'>{t.themeSettings}</h1>
        </div>

      </div>
      <AcquireThemeSettings theme={theme}/>

    </div>
  );
}

export default Settings;
