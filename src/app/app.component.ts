import { Component } from '@angular/core';
import { PushService } from './services/push.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
// import { OneSignal } from 'onesignal-ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private pushService: PushService,
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen // private oneSignal: OneSignal
  ) {
    platform.ready().then(() => {
      // statusBar.styleDefault();
      // splashScreen.hide();
      pushService.OneSignalInit();
    });
  }
}
