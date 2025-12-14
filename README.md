# homebridge-vpilot-notifications

[![npm version](https://img.shields.io/npm/v/homebridge-vpilot-notifications.svg)](https://www.npmjs.com/package/homebridge-vpilot-notifications)
[![npm downloads](https://img.shields.io/npm/dt/homebridge-vpilot-notifications.svg)](https://www.npmjs.com/package/homebridge-vpilot-notifications)
[![GitHub issues](https://img.shields.io/github/issues/montislignum/homebridge-vpilot-notifications.svg)](https://github.com/montislignum/homebridge-vpilot-notifications/issues)
[![GitHub stars](https://img.shields.io/github/stars/montislignum/homebridge-vpilot-notifications.svg)](https://github.com/montislignum/homebridge-vpilot-notifications/stargazers)[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A Homebridge plugin that receives messages from [vPilot](https://vpilot.metacraft.com/) via TCP and triggers a HomeKit motion sensor.  
This allows you to get HomeKit notifications when new messages arrive in vPilot (e.g., private messages or ATC calls).

---

## ✨ Features
- Runs a TCP server on a configurable port (default: 3000).
- Receives messages sent from your vPilot plugin.
- Triggers a HomeKit motion sensor that can be used in automations.
- Sensor automatically resets after a configurable duration.
- Full logging for debugging and transparency.

---

## 📦 Installation

1. Clone or download the project:
   ```bash
   git clone https://github.com/montislignum/homebridge-vpilot-notifications.git
   cd homebridge-vpilot-notifications
   ```

2. Install into Homebridge’s node_modules:
   ```bash
   sudo npm install -g .
   ```

   > If you run Homebridge via `hb-service`, make sure the plugin is located in `/var/lib/homebridge/node_modules`.

3. Restart Homebridge:
   ```bash
   sudo hb-service restart
   ```

---

## ⚙️ Configuration

Add the accessory to your `config.json`:

```json
{
  "accessories": [
    {
      "accessory": "VPilotNotifier",
      "name": "vPilot Messages",
      "port": 3000,
      "activeDuration": 10
    }
  ]
}
```

- **accessory**: Must be `VPilotNotifier` (case-sensitive).
- **name**: Display name in HomeKit.
- **port**: TCP port that matches your vPilot plugin.
- **activeDuration**: How long the sensor stays active (in seconds).

---

## 🛫 vPilot Plugin

This plugin requires a small C# plugin for vPilot that sends messages to Homebridge via TCP.  
Example (simplified):

```csharp
using System.Net.Sockets;
using System.Text;

public void SendMessage(string message)
{
    using (TcpClient client = new TcpClient("raspberrypi.local", 3000))
    {
        byte[] data = Encoding.ASCII.GetBytes(message);
        client.GetStream().Write(data, 0, data.Length);
    }
}
```

When vPilot receives a private message, the plugin calls:
```csharp
SendMessage("NEW_PRIVATE_MESSAGE");
```

The Homebridge plugin receives the message and triggers the motion sensor.

---

## 🧪 Testing

1. Start Homebridge and check the logs:
   ```
   [VPilotNotifier] Server listening on port 3000
   ```
2. Send a test message from the vPilot plugin.
3. Check the Homebridge log:
   ```
   [VPilotNotifier] Received message: NEW_PRIVATE_MESSAGE
   ```
4. The motion sensor activates in HomeKit → you can now create automations.

---

## 📜 License
MIT

---

## 🤝 Credits
- Developed by Jonas  
- Built to integrate vPilot with HomeKit via Homebridge

=======
A Homebridge plugin that integrates vPilot with HomeKit by triggering motion sensors via TCP messages.

