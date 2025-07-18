const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.text({ type: 'application/xml' }));

app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

app.post('/api/trafikverket', async (req, res) => {
  try {
    const { requestBody } = req.body;
    
    const requestWithKey = requestBody.replace('${APIKey}', process.env.API_KEY);

    const response = await axios.post('https://api.trafikinfo.trafikverket.se/v2/data.json', requestWithKey, {
      headers: {
        'Content-Type': 'application/xml'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Trafikverket API error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Trafikverket API request failed',
      message: error.response?.data?.error || error.message
    });
  }
});

app.post('/api/stations', async (req, res) => {
  try {
    const requestBody = `<REQUEST>
      <LOGIN authenticationkey="${process.env.API_KEY}"/>
      <QUERY objecttype="TrainStation" namespace="rail.infrastructure" schemaversion="1.5" limit="99999999">
        <FILTER>
          <EQ name="Advertised" value="true" />
        </FILTER>
      </QUERY>
    </REQUEST>`;
    
    const response = await axios.post('https://api.trafikinfo.trafikverket.se/v2/data.json', requestBody, {
      headers: {
        'Content-Type': 'application/xml'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Stations API error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Stations request failed',
      message: error.response?.data?.error || error.message
    });
  }
});

app.post('/api/train-data/:stationSignature', async (req, res) => {
  try {
    const { stationSignature } = req.params;
    
    const requestBody = `<REQUEST>
      <LOGIN authenticationkey="${process.env.API_KEY}" />
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
          </AND>
        </FILTER>
      </QUERY>
    </REQUEST>`;

    const response = await axios.post('https://api.trafikinfo.trafikverket.se/v2/data.json', requestBody, {
      headers: {
        'Content-Type': 'application/xml'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Train data API error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Train data request failed',
      message: error.response?.data?.error || error.message
    });
  }
});

app.post('/api/train-announcements', async (req, res) => {
  try {
    const requestBody = `<REQUEST>
      <LOGIN authenticationkey="${process.env.API_KEY}"/>
      <QUERY objecttype="TrainAnnouncement" schemaversion="1.9" limit="99999999">
        <FILTER>
          <EQ name="Deleted" value="false" />
        </FILTER>
      </QUERY>
    </REQUEST>`;

    const response = await axios.post('https://api.trafikinfo.trafikverket.se/v2/data.json', requestBody, {
      headers: {
        'Content-Type': 'application/xml'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Train announcements API error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Train announcements request failed',
      message: error.response?.data?.error || error.message
    });
  }
});

app.post('/api/sl-stations', async (req, res) => {
  try {
    const response = await axios.get('https://transport.integration.sl.se/v1/sites?expand=true', {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data.map(station => ({
      id: station.id,
      name: station.name
    })));
  } catch (error) {
    console.error('SL API error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'SL API request failed',
      message: error.response?.data?.error || error.message
    });
  }
});

app.get('/api/sl-train-data/:stationID', async (req, res) => {
  try {
    const { stationID } = req.params;

    const response = await axios.get(`https://transport.integration.sl.se/v1/sites/${stationID}/departures`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('SL train data API error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'SL train data request failed',
      message: error.response?.data?.error || error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log(`  GET  /health - Health check`);
  console.log(`  POST /api/trafikverket - Generic Trafikverket proxy`);
  console.log(`  POST /api/stations - Fetch train stations`);
  console.log(`  POST /api/train-data/:stationSignature - Fetch train data for station`);
  console.log(`  POST /api/train-announcements - Fetch train announcements`);
  console.log(`  POST /api/sl-stations - Fetch SL stations`);
});

module.exports = app;