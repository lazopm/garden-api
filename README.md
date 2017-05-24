# Data Structures

## Garden (object)
+ id: (string, required)
+ name: (string, required)
+ description: (string)
+ created: (Timestamp, required)
+ updated: (Timestamp, required)

## Garden Snapshot (object)
+ gardenId: (string, required)
+ battery:  (integer, required)
+ soilHumidity: (integer, required)  

## Sensor Data (object)
+ gardenId: (string, required)
+ ts: (Timestamp, requred)
+ type: (string, required) 
+ readings: (array[Sensor Reading], required)
+ battery: (string, required)

## Sensor Reading (object)
pin is the corresponding pin in the microcontroller
raw contains the raw value reading, usually voltage.
calibrated is the interpreted form of the reading, for example the soil humidity percentage
+ pin: (integer, required)
+ raw: (any, required) 
+ calibrated: (any) 

# Endpoints

##Public endpoints

GET /gardens
Returns a list of Garden items
response
{
    gardens: Array[Garden]
}

GET /gardens/{id}
Returns a Garden item, and an up to date snapshot of the garden state
{
    garden: Garden
    snapshot: Garden Snapshot
}

GET /gardens/{gardenId}/sensors/{type}
Returns a dump of all the sensor data for that particular type
{
    sensorData: Array[Sensor Data]
}
    

##Private endpoints
This endpoints require the header 
X-Api-Key: {secretKey}

POST /gardens

creates a new Garden item
request body
{
    name: (string, required) 
    description: (string)
}
response body
HTTP 200
{ garden: Garden }


POST /gardens/{gardenId}/sensors/{type}
endpoint for the hardware at the garden to report updates
regardless of the sensor type, the request includes the battery level, omit if not battery powered
request body
{
    type: (string, required),
    readings: Array[Sensor Reading],
    battery: (integer), 
}

response
HTTP 200
