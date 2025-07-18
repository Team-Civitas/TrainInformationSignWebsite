## Building/Compiling
Create this .env in /server (you get the API key from [trafikverket](https://data.trafikverket.se/documentation/api-railway/get-started))
```
API_KEY=<YOUR_API_KEY>
PORT=3001
```
Create a .env in the root like this:
```
VITE_DOMAIN=http://localhost:3001
```
Then run
```
npm install
npm run dev
```

