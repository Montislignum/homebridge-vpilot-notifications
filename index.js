let Service, Characteristic;
const net = require('net');

module.exports = (homebridge) => {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;

  homebridge.registerAccessory(
    "homebridge-vpilot-notifications",
    "VPilotNotifier",
    VPilotNotifier
  );
};

class VPilotNotifier {
  constructor(log, config) {
    this.log = log;
    this.name = config.name || "vPilot Notifier";
    this.port = config.port || 3000;

    this.service = new Service.MotionSensor(this.name);

    const server = net.createServer((socket) => {
      socket.on('data', (data) => {
        const messageType = data.toString().trim();
        this.log.info('Received message:', messageType);

        this.service.getCharacteristic(Characteristic.MotionDetected)
          .updateValue(true);

        setTimeout(() => {
          this.service.getCharacteristic(Characteristic.MotionDetected)
            .updateValue(false);
        }, 3000);
      });
    });

    server.listen(this.port, '0.0.0.0', () => {
      this.log.info(`Server listening on port ${this.port}`);
    });

    server.on('error', (err) => {
      this.log.error('Server error:', err);
    });
  }

  getServices() {
    return [this.service];
  }
}
