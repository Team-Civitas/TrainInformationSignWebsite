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

async function fetchStations() {
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/xml',
            'Authorization': `Bearer ${APIKey}`
        },
        body: getStationsRequest
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
	const stationArray = [];
	for (const station of data.RESPONSE.RESULT[0].TrainStation) {
		stationArray.push(station);
	}

    return stationArray;
}

export {fetchStations}