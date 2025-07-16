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

function makeSearchRequest(station_signature) {
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
        <EQ name="LocationSignature" value="${station_signature}" />
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

  const stationArray = data.RESPONSE.RESULT[0].TrainStation;
  const stationList = stationArray.map(station => station.AdvertisedLocationName);

  return { stationArray, stationList };
}

async function getStationData(station_signature) {
  const requestBody = makeSearchRequest(station_signature);

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
  return trainAnnouncements;
}


export { fetchStations, getStationData };
