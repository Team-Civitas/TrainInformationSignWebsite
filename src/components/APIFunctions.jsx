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
      // 'Authorization': `Bearer ${APIKey}`, // likely not needed
    },
    body: getStationsRequest
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const responseText = await response.text();

  // Parse XML response
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(responseText, "application/xml");

  // Extract TrainStation nodes
  const trainStations = xmlDoc.getElementsByTagName("TrainStation");
  const stationArray = [];

  for (let i = 0; i < trainStations.length; i++) {
    const stationNode = trainStations[i];
    const station = {};

    // Extract child elements into station object
    for (let j = 0; j < stationNode.children.length; j++) {
      const child = stationNode.children[j];
      station[child.nodeName] = child.textContent;
    }
    stationArray.push(station);
  }

  return stationArray;
}

export { fetchStations };
