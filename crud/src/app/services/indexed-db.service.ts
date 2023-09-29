import { Injectable } from '@angular/core';

@Injectable()
export class IndexedDbService {
  private databaseName = 'dbTaches';
  private objectStoreName = 'taches';

  private db!: IDBDatabase;

  constructor() {
    this.openDatabase();
  }

  private openDatabase() {
    const request = indexedDB.open(this.databaseName, 1);

    request.onsuccess = (event) => {
      this.db = request.result;
    };

    request.onupgradeneeded = (event) => {
      this.db = request.result;
      this.createObjectStore();
    };
  }

  private createObjectStore() {
    if (!this.db.objectStoreNames.contains(this.objectStoreName)) {
      this.db.createObjectStore(this.objectStoreName);
    }
  }

  public storeData(key: string, value: any) {
    const transaction = this.db.transaction([this.objectStoreName], 'readwrite');
    const objectStore = transaction.objectStore(this.objectStoreName);

    const request = objectStore.put(value, key);

    request.onsuccess = (event) => {
      console.log('Données stockées avec succès');
    };

    request.onerror = (event) => {
      console.error('Erreur lors du stockage des données');
    };
  }

  public retrieveData(key: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const transaction = this.db.transaction([this.objectStoreName]);
      const objectStore = transaction.objectStore(this.objectStoreName);

      const request = objectStore.get(key);

      request.onsuccess = (event) => {
        resolve(request.result);
      };

      request.onerror = (event) => {
        reject('Erreur lors de la récupération des données');
      };
    });
  }

  public deleteData(key: string) {
    const transaction = this.db.transaction([this.objectStoreName], 'readwrite');
    const objectStore = transaction.objectStore(this.objectStoreName);

    const request = objectStore.delete(key);

    request.onsuccess = (event) => {
      console.log('Données supprimées avec succès');
    };

    request.onerror = (event) => {
      console.error('Erreur lors de la suppression des données');
    };
  }

  public getAllData(): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      const transaction = this.db.transaction([this.objectStoreName]);
      const objectStore = transaction.objectStore(this.objectStoreName);
      const request = objectStore.getAll();

      request.onsuccess = (event) => {
        resolve(request.result);
      };

      request.onerror = (event) => {
        reject('Error retrieving data');
      };
    });
  }
}
