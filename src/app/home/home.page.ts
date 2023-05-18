import { ApplicationRef, Component, OnInit } from '@angular/core';
import { PushService } from '../services/push.service';
import OSNotification from 'plugins/onesignal-cordova-plugin/dist/OSNotification';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  mensajes: OSNotification[] = [];

  constructor(
    public pushService: PushService,
    private applicationRef: ApplicationRef
  ) {}

  async ngOnInit() {
    //
    this.pushService.pushListener.subscribe((notification) => {
      this.mensajes.unshift(notification);
      this.applicationRef.tick(); // forzar actualización del componente
    });
  }

  // mientras es en suspenso la aplicación
  async ionViewWillEnter() {
    console.log('Will Enter - Cargar Mensajes');
    this.mensajes = await this.pushService.getMessage();
  }

  async cleanMessages() {
    this.pushService.cleanMessages();
    this.mensajes = [];
  }
}
