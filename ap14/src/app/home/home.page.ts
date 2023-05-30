import { Component, Input } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { Database, getDatabase, ref, set } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';
import { ToastController } from '@ionic/angular';

type Product = {
  name: string;
  price: string;
  description: string;
};

const firebaseConfig = {
  apiKey: '<Credentials here>',
  authDomain: '<Credentials here>',
  projectId: 'desco-app',
  storageBucket: '<Credentials here>',
  messagingSenderId: '<Credentials here>',
  appId: '<Credentials here>',
  measurementId: '<Credentials here>',
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const analytics = getAnalytics(app);
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  db: Database;
  @Input() product: Product;
  constructor(private toastController: ToastController) {
    this.db = db;
    this.product = {
      name: '',
      description: '',
      price: '',
    };
  }

  save() {
    set(ref(this.db, 'products'), this.product).then(() => {
      this.presentToast('bottom');
    });
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Produto cadastrado com sucesso !',
      duration: 1500,
      position,
    });

    await toast.present();
  }
}
