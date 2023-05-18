import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { PushService } from './services/push.service';
import { IonicStorageModule } from '@ionic/storage-angular';
// import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    // IonicStorageModule.forRoot({
    //   driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB],
    // }),
    IonicStorageModule.forRoot(),
  ],
  providers: [
    OneSignal,
    StatusBar,
    SplashScreen,
    PushService,
    // { provide: OneSignal },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
