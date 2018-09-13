import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { ToastController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { OnDevicePage } from '../on-device/on-device';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage 
{

  devices: any[] = [];
  //deviceID: string = 'poolights1';
  deviceName: string = 'poolights1';
  statusMessage: string;
  isScanning: boolean;
  isFirstScan: boolean;
  peripheral: any = {};

  constructor(public navCtrl: NavController, private ble: BLE, private ngZone: NgZone/**, private toastCtrl: ToastController*/) 
  {
    this.ble.enable();
    if(this.ble.isEnabled())
    {
      this.scanning();
      this.isFirstScan = false;
    }
  }

  scanning()
  {
    this.setMessage("Scanning...");
    this.isScanning = true;
    this.devices = [];
    this.ble.scan([], 6).subscribe(
      device => {this.onDeviceDiscovered(device)},
      error => {}
    );

    setTimeout(()=>{this.isScanning = false; this.setMessage("Unable to connect, please try again");}, 6000);
  }

  setMessage(message)
  {
    this.ngZone.run(()=>{ this.statusMessage = message;});
  }

  onDeviceDiscovered(device)
  {
    this.ngZone.run(()=>{ this.devices.push(device); 
                          if(/**(device.id === this.deviceID) &&*/ (device.name === this.deviceName)) 
                            this.connecting(device);
                            this.ble.stopScan();
                        });
  }

  connecting(device)
  {
    this.isScanning = false;
    this.ble.connect(device.id).subscribe(peripheral=>this.onConnected(peripheral));
  }

  onConnected(peripheral)
  {
    this.ngZone.run(()=>{ this.peripheral = peripheral;
                          this.navCtrl.push(OnDevicePage, {peripheral: peripheral})});
  }

  /**
  createToast()
  {
    let toast = this.toastCtrl.create({
      message: this.statusMessage
    });
  }
  */

}
