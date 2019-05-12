const awsIot = require('aws-iot-device-sdk');
const ADXL345 = require('adxl345-sensor');

const adxl345 = new ADXL345();

const device = awsIot.device({
   keyPath: "certs/ec9fe0c97f-private.pem.key",
  certPath: "certs/ec9fe0c97f-certificate.pem.crt",
    caPath: "certs/root-CA.crt",
  clientId: "client-id-1",
      host: "a2k5uia19r8kbb-ats.iot.ap-northeast-2.amazonaws.com"
});

const getAcceleration = () => {
  adxl345.getAcceleration(true) // true for g-force units, else false for m/s²
    .then((acceleration) => {
      console.log(`acceleration = ${JSON.stringify(acceleration, null, 2)}`);
      device.publish('topic_2', JSON.stringify(acceleration, null, 2));
      setTimeout(getAcceleration, 1000);
    })
    .catch((err) => {
      console.log(`ADXL345 read error: ${err}`);
      setTimeout(getAcceleration, 2000);
    });
};



//
// Device is an instance returned by mqtt.Client(), see mqtt.js for full
// documentation.
//
device
  .on('connect', function() {
    console.log('connect');
    device.subscribe('topic_1');
    device.publish('topic_2', JSON.stringify({ test_data: 1}));
    adxl345.init()
      .then(() => {
        console.log('ADXL345 initialization succeeded');
        getAcceleration();
      })
      .catch((err) => console.error(`ADXL345 initialization failed: ${err} `));
  });

device
  .on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
  });
