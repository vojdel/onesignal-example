import { EventEmitter, Injectable } from '@angular/core';
import OneSignal, { OneSignalPlugin } from 'onesignal-cordova-plugin';
import OSNotification from 'plugins/onesignal-cordova-plugin/dist/OSNotification';
import { Storage } from '@ionic/storage-angular'; // Guardar los Mensajes

@Injectable({
  providedIn: 'root',
})
export class PushService {
  userId = '';
  public message: OSNotification[] = [
    // {
    //   title: 'titulo',
    //   body: 'mensaje',
    //   date: new Date(),
    // },
  ];

  pushListener = new EventEmitter<OSNotification>();

  constructor(private storage: Storage) {
    this.storage.create();
    this.loadNotifications();
  }

  async getMessage() {
    await this.loadNotifications();

    return [...this.message];
  }

  OneSignalInit(): void {
    // TODO: Documentación : https://documentation.onesignal.com/docs/sdk-reference
    // TODO: REST API: https://documentation.onesignal.com/reference/create-notification#create-notification
    // Uncomment to set OneSignal device logging to VERBOSE
    // OneSignal.setLogLevel(6, 0);

    // NOTE: Update the setAppId value below with your OneSignal AppId.
    OneSignal.setAppId('63b5b61a-fddf-4aad-b5de-a53bf79986eb');

    // Se ejecuta antes de mostrar una notificación mientras la aplicación está enfocada
    OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent) => {
        console.log('notification recibida: ');
        console.log(
          JSON.stringify(notificationReceivedEvent.getNotification())
        );
        this.getNotification(notificationReceivedEvent.getNotification());

        notificationReceivedEvent.complete(
          notificationReceivedEvent.getNotification()
        );
      }
    );

    // Cuando se presiona el mensaje
    OneSignal.setNotificationOpenedHandler(async (jsonData) => {
      this.getNotification(jsonData.notification);
      console.log('notificationOpenedCallback: ');
      console.log(jsonData);
    });

    // Prompts the user for notification permissions.
    // Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 7) to better communicate to your users what notifications they will get.
    OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
      console.log('User accepted notifications: ' + accepted);
    });

    // obtener id del suscriptor
    OneSignal.getDeviceState((device) => {
      this.userId = device.userId;
      console.log(this.userId);
    });
  }

  async getNotification(notification: OSNotification): Promise<void> {
    await this.loadNotifications();

    const pushExist = this.message.find(
      (msg) => msg.notificationId === notification.notificationId
    );

    console.log(pushExist);

    if (pushExist) return;

    this.message.unshift(notification);
    this.pushListener.emit(notification);
    this.saveNotifications();
  }

  saveNotifications() {
    this.storage.set('message', this.message);
  }

  async loadNotifications() {
    // clean storage
    // this.storage.clear();
    this.message = (await this.storage.get('message')) || [];

    return this.message;
  }

  async cleanMessages() {
    await this.storage.clear();
    this.message = [];
    this.saveNotifications();
  }
}
