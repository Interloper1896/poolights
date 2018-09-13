import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';


@IonicPage()
@Component({
  selector: 'page-on-device',
  templateUrl: 'on-device.html',
})
export class OnDevicePage {

  serviceUUID: string;
  characteristicColorUUID: string;
  peripheral: any = {};

  colors = {
    red: false,
    green: false,
    blue: false
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private ble: BLE)
  {
    this.peripheral = this.navParams.get('peripheral');
  }

  updatedColors()
  {
    let data = new Uint8Array(3);
    (this.colors.red === true) ? data[0] = "y".charCodeAt(0) : data[0] = "n".charCodeAt(0);
    (this.colors.green === true) ? data[1] = "y".charCodeAt(0) : data[1] = "n".charCodeAt(0);
    (this.colors.blue === true) ? data[2] = "y".charCodeAt(0) : data[2] = "n".charCodeAt(0);
    this.ble.write( this.peripheral.id,
                    this.serviceUUID,
                    this.characteristicColorUUID,
                    data.buffer);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnDevicePage');
  }

}
