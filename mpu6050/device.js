const awsIot = require('aws-iot-device-sdk');
const i2c = require('i2c-bus');
const MPU6050 = require('i2c-mpu6050');
const Gpio = require('onoff').Gpio;

const CLIENT_ID = 'client-id-1';
const address = 0x68;
const i2c1 = i2c.openSync(1);
const LED = new Gpio(4, 'out'); 
 
const sensor = new MPU6050(i2c1, address);
 
const device = awsIot.device({
    keyPath: "certs/ec9fe0c97f-private.pem.key",
   certPath: "certs/ec9fe0c97f-certificate.pem.crt",
     caPath: "certs/root-CA.crt",
   clientId: CLIENT_ID,
       host: "a2k5uia19r8kbb-ats.iot.ap-northeast-2.amazonaws.com"
 });
 
const publishSensorData = () => {
    const data = sensor.readSync();
    console.log(data);
    const ledStatus = LED.readSync();
    const payload = Object.assign({}, data, {ledStatus: ledStatus});
    device.publish('topic_2', JSON.stringify({clientId: CLIENT_ID, payload: data}, null, 2));
    setTimeout(publishSensorData, 1000);
}

device
  .on('connect', function() {
    console.log('connect');
    device.subscribe(`commands/${CLIENT_ID}/#`);
    device.publish('topic_2', JSON.stringify({ test_data: 1}));
    publishSensorData();
  });

device
  .on('message', function(topic, payload) {
      const message = JSON.parse(payload);
      console.log('message:', topic, message);
      if (topic === `commands/${CLIENT_ID}/led`) {
        let CMDS = {
          ON: () => {LED.writeSync(1);},
          OFF: () => {LED.writeSync(0);}
        };
        CMDS[message.cmd]();
      } else {
        console.log('message', topic, payload.toString());
      }
  });
