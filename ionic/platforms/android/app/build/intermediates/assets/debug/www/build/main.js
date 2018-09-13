webpackJsonp([1],{

/***/ 110:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 110;

/***/ }),

/***/ 151:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/on-device/on-device.module": [
		270,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 151;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_ble__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__on_device_on_device__ = __webpack_require__(195);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { ToastController } from 'ionic-angular';


var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, ble, ngZone /**, private toastCtrl: ToastController*/) {
        this.navCtrl = navCtrl;
        this.ble = ble;
        this.ngZone = ngZone; /**, private toastCtrl: ToastController*/
        this.devices = [];
        this.deviceID = 'poolights1';
        this.deviceName = 'poolights1';
        this.peripheral = {};
        this.ble.enable();
        if (this.ble.isEnabled()) {
            this.scanning();
            this.isFirstScan = false;
        }
    }
    HomePage.prototype.scanning = function () {
        var _this = this;
        this.setMessage("Scanning...");
        this.isScanning = true;
        this.devices = [];
        this.ble.scan([], 6).subscribe(function (device) { _this.onDeviceDiscovered(device); }, function (error) { });
        setTimeout(function () { _this.isScanning = false; _this.setMessage("Impossible to connect, please try again"); }, 6000);
    };
    HomePage.prototype.setMessage = function (message) {
        var _this = this;
        this.ngZone.run(function () { _this.statusMessage = message; });
    };
    HomePage.prototype.onDeviceDiscovered = function (device) {
        var _this = this;
        this.ngZone.run(function () {
            _this.devices.push(device);
            if ((device.id === _this.deviceID) && (device.name === _this.deviceName))
                _this.connecting(device);
            _this.ble.stopScan();
        });
    };
    HomePage.prototype.connecting = function (device) {
        var _this = this;
        this.isScanning = false;
        this.ble.connect(device.id).subscribe(function (peripheral) { return _this.onConnected(peripheral); });
    };
    HomePage.prototype.onConnected = function (peripheral) {
        var _this = this;
        this.ngZone.run(function () {
            _this.peripheral = peripheral;
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__on_device_on_device__["a" /* OnDevicePage */], { peripheral: peripheral });
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/louis/projects/poolights/ionic/src/pages/home/home.html"*/'<ion-header class="secondColor">\n  <ion-navbar transparent>\n    <ion-title>\n        <i><b>P O O L I G H T S</b></i>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding class="water">\n  <ion-buttons end>\n    <button ion-button round class="button1" *ngIf="(isScanning === false) && (isFirstScan === false)" (click)="scanning()">\n      Retry\n    </button>\n    <ion-spinner class="spinner1" name="bubbles" *ngIf="isScanning === true">\n    </ion-spinner>\n  </ion-buttons>\n</ion-content>\n\n<ion-footer class="secondColor">\n  <ion-toolbar transparent>\n    <p>{{ statusMessage }}</p>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/home/louis/projects/poolights/ionic/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_ble__["a" /* BLE */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */] /**, private toastCtrl: ToastController*/])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OnDevicePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_ble__ = __webpack_require__(77);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var OnDevicePage = /** @class */ (function () {
    function OnDevicePage(navCtrl, navParams, ble) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ble = ble;
        this.peripheral = {};
        this.colors = {
            red: false,
            green: false,
            blue: false
        };
        this.peripheral = this.navParams.get('peripheral');
    }
    OnDevicePage.prototype.updatedColors = function () {
        var data = new Uint8Array(3);
        (this.colors.red === true) ? data[0] = "y".charCodeAt(0) : data[0] = "n".charCodeAt(0);
        (this.colors.green === true) ? data[1] = "y".charCodeAt(0) : data[1] = "n".charCodeAt(0);
        (this.colors.blue === true) ? data[2] = "y".charCodeAt(0) : data[2] = "n".charCodeAt(0);
        this.ble.write(this.peripheral.id, this.serviceUUID, this.characteristicColorUUID, data.buffer);
    };
    OnDevicePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OnDevicePage');
    };
    OnDevicePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-on-device',template:/*ion-inline-start:"/home/louis/projects/poolights/ionic/src/pages/on-device/on-device.html"*/'\n<ion-header class="secondColor">\n  <ion-navbar transparent>\n    <ion-title>\n        <i><b>P O O L I G H T S</b></i>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding class="water">\n    <ion-list>\n\n        <ion-item>\n          <ion-label>Red</ion-label>\n          <ion-toggle [(ngModel)]="colors.red" (ionChange)="updatedColors()" color="red"></ion-toggle>\n        </ion-item>\n      \n        <ion-item>\n          <ion-label>Green</ion-label>\n          <ion-toggle [(ngModel)]="colors.green" (ionChange)="updatedColors()" color="green"></ion-toggle>\n        </ion-item>\n      \n        <ion-item>\n          <ion-label>Blue</ion-label>\n          <ion-toggle [(ngModel)]="colors.blue" (ionChange)="updatedColors()" color="blue"></ion-toggle>\n        </ion-item>\n      \n      </ion-list>\n</ion-content>\n\n<ion-footer class="secondColor">\n  <ion-toolbar transparent>\n    <p>Choose you color!</p>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/home/louis/projects/poolights/ionic/src/pages/on-device/on-device.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_ble__["a" /* BLE */]])
    ], OnDevicePage);
    return OnDevicePage;
}());

//# sourceMappingURL=on-device.js.map

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(219);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_ble__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(194);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/on-device/on-device.module#OnDevicePageModule', name: 'OnDevicePage', segment: 'on-device', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_ble__["a" /* BLE */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 269:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(194);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/louis/projects/poolights/ionic/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/home/louis/projects/poolights/ionic/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[196]);
//# sourceMappingURL=main.js.map