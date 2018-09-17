#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>


BLECharacteristic *pCharacteristic;
bool deviceConnected = false;
float txValue = 0;
char deviceName[20] = "poolights1";


#define SERVICE_UUID           "6E400001-B5A3-F393-E0A9-E50E24DCCA9E"
#define CHARACTERISTIC_UUID_RX "6E400002-B5A3-F393-E0A9-E50E24DCCA9E"
#define CHARACTERISTIC_UUID_TX "6E400003-B5A3-F393-E0A9-E50E24DCCA9E"


class MyServerCallbacks: public BLEServerCallbacks 
{
    void onConnect(BLEServer* pServer)
    {
      deviceConnected = true;
      Serial.println("Connecté !");
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

      if (rxValue.length() == 3)
      {
        // Do stuff based on the command received from the app
        (rxValue[0] == 'y') ? Serial.println("red_on") : Serial.println("red_off");
        (rxValue[1] == 'y') ? Serial.println("green_on") : Serial.println("green_off");
        (rxValue[2] == 'y') ? Serial.println("blue_on\n") : Serial.println("blue_off\n");
      }
    }
};



void setup() 
{ 
  Serial.begin(9600);
  Serial.println("Initialisation");
  
  // Create the BLE Device
  BLEDevice::init(deviceName); // Give it a name

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
