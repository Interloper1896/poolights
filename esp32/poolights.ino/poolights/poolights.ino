#include <ELECHOUSE_CC1101.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

const int n = 22;
byte buffer[n]  = {0, 0, 4, 146, 73, 37, 182, 89, 101, 182, 201, 36, 178, 201, 44, 146, 75, 109, 178, 64, 0, 0};
int len = 22;

BLECharacteristic *pCharacteristic;
bool deviceConnected = false;
float txValue = 0;


#define SERVICE_UUID           "6E400001-B5A3-F393-E0A9-E50E24DCCA9E" // UART service UUID
#define CHARACTERISTIC_UUID_RX "6E400002-B5A3-F393-E0A9-E50E24DCCA9E"
#define CHARACTERISTIC_UUID_TX "6E400003-B5A3-F393-E0A9-E50E24DCCA9E"


class MyServerCallbacks: public BLEServerCallbacks 
{
    void onConnect(BLEServer* pServer)
    {
      deviceConnected = true;
    };

    void onDisconnect(BLEServer* pServer)
    {
      deviceConnected = false;
    }
};

class MyCallbacks: public BLECharacteristicCallbacks 
{
    void onWrite(BLECharacteristic *pCharacteristic)
    {
      std::string rxValue = pCharacteristic->getValue();

      if (rxValue.length() > 0)
      {
        // Do stuff based on the command received from the app
        if (rxValue.find("A") != -1)
        { 
          for (int i = 0; i < 10; i++)
          {
            ELECHOUSE_cc1101.SendData(buffer, len);
          }
        }
      }
    }
};



void setup() 
{ 
  ELECHOUSE_cc1101.Init(F_868);


  // Create the BLE Device
  BLEDevice::init("ESP32"); // Give it a name

  // Create the BLE Server
  BLEServer *pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());

  // Create the BLE Service
  BLEService *pService = pServer->createService(SERVICE_UUID);

  // Create a BLE Characteristic
  pCharacteristic = pService->createCharacteristic(
                      CHARACTERISTIC_UUID_TX,
                      BLECharacteristic::PROPERTY_NOTIFY
                    );
                      
  pCharacteristic->addDescriptor(new BLE2902());

  BLECharacteristic *pCharacteristic = pService->createCharacteristic(
                                         CHARACTERISTIC_UUID_RX,
                                         BLECharacteristic::PROPERTY_WRITE
                                       );

  pCharacteristic->setCallbacks(new MyCallbacks());

  // Start the service
  pService->start();

  // Start advertising
  pServer->getAdvertising()->start();
}

void loop() {}



