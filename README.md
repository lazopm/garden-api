# Garden API
A simple AWS Serverless api for an automated garden.

## Install
`yarn install`

## Deploy
`yarn deploy`

### Requirements
+ node
+ yarn
+ serverless + aws credentials

## Roadmap 
- [x] Create/List/Get Gardens
- [x] Post sensor data
- [ ] Snapshot task
- [ ] Alerts
- [ ] Auto watering scheduling

## Data Structures

### Garden (object)
+ id: (string, required) unique hash to identify the garden
+ name: (string, required)
+ description: (string)
+ created: (integer, required) timestamp generated when created

### Garden Snapshot (object)
this is a snapshot of the state of the garden
+ gardenId: (string, required)
+ ts: (integer, required)
+ battery:  (integer, required)
+ soilHumidity: (integer, required)  

### Sensor Data (object)
+ garden: (string, required) garden id hash
+ ts: (integer, requred) timestamp, generated by server not microcontroller
+ type: (string, required) sensor type. soilHumidity, temperature, etc
+ readings: (array[Sensor Reading], required) 
+ battery: (integer|null) battery percentage, or null if not battery powered

### Sensor Reading (object)
+ pin: (integer, required) corresponding pin in the microcontroller
+ raw: (any, required) raw contains the raw value reading, usually voltage.
+ calibrated: (any) calibrated is the interpreted form of the reading, for example the soil humidity percentage

## Endpoints

### Public endpoints

`GET /gardens`
Returns a list of Garden items

`GET /gardens/{id}`
Returns a Garden item, and an up to date snapshot of the garden state
```
{
    garden: Garden
    snapshot: Garden Snapshot
}
```

`GET /gardens/{gardenId}/sensors/{type}` Returns a dump of all the sensor data for that particular garden and type

### Private endpoints
This endpoints require the header 
`X-Api-Key: {secretKey}`

`POST /gardens`
creates a new Garden item
request body
```
{
    name: (string, required) 
    description: (string)
}
```
response body
```
HTTP 200
{ Garden } 
```

`POST /gardens/{gardenId}/sensors/{type}`
endpoint for the hardware at the garden to report updates
regardless of the sensor type, the request includes the battery level, omit if not battery powered
request body
```
{
    type: (string, required),
    readings: Array[Sensor Reading],
    battery: (integer), 
}
```
response
```
HTTP 200
```
