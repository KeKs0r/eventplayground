const esClient = require('eventstore-node');
const uuid = require('uuid');

const streamName = 'testStream';
const connSettings = {}; // Default

var esConnection = esClient.createConnection(connSettings, "tcp://localhost:1113");
esConnection.connect().catch(err => console.log(err))


esConnection.once('connected', function (tcpEndPoint) {
    console.log('Connected to eventstore at ' + tcpEndPoint.host + ":" + tcpEndPoint.port);
});



const eventId = uuid.v4();
const eventData = {
    a : Math.random(),
    b: uuid.v4()
};
const event = esClient.createJsonEventData(eventId, eventData, null, 'testEvent');
console.log("Appending...");
esConnection.appendToStream(streamName, esClient.expectedVersion.any, event)
    .then(function(result) {
        console.log("Stored event:", eventId);
        console.log("Look for it at: http://localhost:2113/web/index.html#/streams/testStream");
        esConnection.close();
        process.exit(2);
    })
    .catch(function(err) {
        console.log(err);
        process.exit(2)
    });