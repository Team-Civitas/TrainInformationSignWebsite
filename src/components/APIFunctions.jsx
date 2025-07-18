const SERVER_URL = import.meta.env.VITE_DOMAIN;

let stationsArray = [];
let trainAnnouncementsArray = [];

async function fetchStations() {
  try {
    const response = await fetch(`${SERVER_URL}/api/stations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    stationsArray = data.RESPONSE.RESULT[0].TrainStation;
    return { stationsArray };
  } catch (error) {
    console.error('Error fetching stations:', error);
    throw error;
  }
}

async function getTrainDataAtStation(stationSignature) {
  try {
    const response = await fetch(`${SERVER_URL}/api/train-data/${stationSignature}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const trainAnnouncements = data.RESPONSE.RESULT[0].TrainAnnouncement;
    return trainAnnouncements;
  } catch (error) {
    console.error('Error fetching train data:', error);
    throw error;
  }
}

async function fetchTrainAnnouncements() {
  try {
    const response = await fetch(`${SERVER_URL}/api/train-announcements`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    trainAnnouncementsArray = data.RESPONSE.RESULT[0];
    return { trainAnnouncementsArray };
  } catch (error) {
    console.error('Error fetching train announcements:', error);
    throw error;
  }
}

async function makeTrafikverketRequest(requestBody) {
  try {
    const response = await fetch(`${SERVER_URL}/api/trafikverket`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ requestBody })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error making Trafikverket request:', error);
    throw error;
  }
}

function stationSignatureToName(stationSignature) {
  const station = stationsArray.find(s => s.LocationSignature === stationSignature);
  return station ? station.AdvertisedShortLocationName : null;
}

function nameToStationSignature(name) {
  const station = stationsArray.find(s => s.AdvertisedLocationName === name);
  return station ? station.LocationSignature : null;
}

function operationalTrainNumberToAnnouncment(stationSignature) {
  const station = stationsArray.find(s => s.LocationSignature === stationSignature);
  return station ? station.AdvertisedLocationName : null;
}

async function fetchSLStations() {
  try {
    const response = await fetch(`${SERVER_URL}/api/sl-stations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const stations = data
    return { stations };
  } catch (error) {
    console.error('Error fetching SL stations:', error);
    throw error;
  }
}

async function getSLTrainDataAtStation(stationID) {
  try {
    const response = await fetch(`${SERVER_URL}/api/SLtrainData-data/${stationSignature}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const trainAnnouncements = data;
    return trainAnnouncements;
  } catch (error) {
    console.error('Error fetching train data:', error);
    throw error;
  }
}


export { 
  fetchStations, 
  getTrainDataAtStation, 
  stationSignatureToName, 
  fetchTrainAnnouncements, 
  operationalTrainNumberToAnnouncment, 
  nameToStationSignature,
  makeTrafikverketRequest,
  fetchSLStations
};