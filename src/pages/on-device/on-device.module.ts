import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OnDevicePage } from './on-device';

@NgModule({
  declarations: [
    OnDevicePage,
  ],
  imports: [
    IonicPageModule.forChild(OnDevicePage),
  ],
})
export class OnDevicePageModule {}
