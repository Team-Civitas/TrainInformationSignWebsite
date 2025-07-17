## Building/Compiling
Create this .env in /server (you get the API key from [trafikverket](https://data.trafikverket.se/documentation/api-railway/get-started))
```
API_KEY=<YOUR_API_KEY>
PORT=3001
```

Then run
```
npm --prefix server install
npm install
npm run dev
```

