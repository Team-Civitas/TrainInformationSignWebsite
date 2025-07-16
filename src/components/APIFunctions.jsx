const APIKey = "7a05cfa303364a539023d77f22259d7e";
const URL = "https://api.trafikinfo.trafikverket.se/v2/data.json";

const getStationsRequest = `<REQUEST>
  <LOGIN authenticationkey="${APIKey}"/>
  <QUERY objecttype="TrainStation" namespace="rail.infrastructure" schemaversion="1.5" limit="99999999">
    <FILTER>
      <EQ name="CountryCode" value="SE" />
      <EQ name="Advertised" value="true" />
    </FILTER>
  </QUERY>
</REQUEST>`;

function makeSearchRequest(stationSignature) {
  return `<REQUEST>
  <LOGIN authenticationkey="${APIKey}" />
  <QUERY objecttype="TrainAnnouncement" orderby="AdvertisedTimeAtLocation" schemaversion="1">
    <FILTER>
      <AND>
        <OR>
          <AND>
            <GT name="AdvertisedTimeAtLocation" value="$dateadd(-00:15:00)" />
            <LT name="AdvertisedTimeAtLocation" value="$dateadd(14:00:00)" />
          </AND>
          <GT name="EstimatedTimeAtLocation" value="$now" />
        </OR>
        <EQ name="LocationSignature" value="${stationSignature}" />
        <EQ name="ActivityType" value="Avgang" />
      </AND>
    </FILTER>
    <INCLUDE>InformationOwner</INCLUDE>
    <INCLUDE>AdvertisedTimeAtLocation</INCLUDE>
    <INCLUDE>TrackAtLocation</INCLUDE>
    <INCLUDE>FromLocation</INCLUDE>
    <INCLUDE>ToLocation</INCLUDE>
  </QUERY>
</REQUEST>`;
}

let stationsArray = [];

async function fetchStations() {
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/xml"
    },
    body: getStationsRequest
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  stationsArray = data.RESPONSE.RESULT[0].TrainStation;

  return { stationsArray };
}

function stationSignatureToName(stationSignature) {
  const station = stationsArray.find(s => s.LocationSignature === stationSignature);
  return station ? station.AdvertisedLocationName : null;
}

async function getTrainDataAtStation(stationSignature) {
  const requestBody = makeSearchRequest(stationSignature);
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/xml",
    },
    body: requestBody
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const text = await response.text();
  const parsed = JSON.parse(text);

  const trainAnnouncements = parsed.RESPONSE.RESULT[0].TrainAnnouncement;
  console.log(trainAnnouncements);
  return trainAnnouncements;
}


export { fetchStations, getTrainDataAtStation, stationSignatureToName };
