var awsIot = require('aws-iot-device-sdk');
var i2c = require('i2c-bus');
var MPU6050 = require('i2c-mpu6050');
var Gpio = require('onoff').Gpio;

var CLIENT_ID = 'client-id-1';
var address = 0x68;
var i2c1 = i2c.openSync(1);
var LED = new Gpio(4, 'out'); 
 
var sensor = new MPU6050(i2c1, address);
 
var device = awsIot.device({
    keyPath: "certs/ec9fe0c97f-private.pem.key",
   certPath: "certs/ec9fe0c97f-certificate.pem.crt",
     caPath: "certs/root-CA.crt",
   clientId: CLIENT_ID,
       host: "a2k5uia19r8kbb-ats.iot.ap-northeast-2.amazonaws.com"
 });
 
function publishSensorData() {
    var data = sensor.readSync();
    console.log(data);
    var ledStatus = LED.readSync();
    var payload = Object.assign({}, data, {ledStatus: ledStatus});
    device.publish('topic_2', JSON.stringify({clientId: CLIENT_ID, payload: data}, null, 2));
    setTimeout(publishSensorData, 1000);
}

device
  .on('connect', function() {
    console.log('connect');
    device.subscribe(`commands/${CLIENT_ID}`);
    device.publish('topic_2', JSON.stringify({ test_data: 1}));
    publishSensorData();
  });

device
  .on('message', function(topic, payload) {
      CMDS = {
          ON: function() {LED.writeSync(1);},
          OFF: function() {LED.writeSync(0);}
      };
      if (topic === `commands/${CLIENT_ID}/led`) {
        var message = JSON.parse(payload);
        CMDS[message.cmd]();
      } else {
        console.log('message', topic, payload.toString());
      }
  });
