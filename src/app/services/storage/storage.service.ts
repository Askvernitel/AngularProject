import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class StorageService implements OnDestroy {
  private onSubject = new Subject<{ key: string | null; value: any }>();
  public changes = this.onSubject.asObservable().pipe(share());

  constructor() {
    this.start();
  }

  ngOnDestroy() {
    this.stop();
  }

  public getStorage() {
    let storage: { key: string; value: any }[] = [];
    for (let index = 0; index < localStorage.length; index++) {
      const key = localStorage.key(index);

      if (key) {
        storage.push({
          key,
          value: localStorage.getItem(key),
        });
      }
    }
    return storage;
  }

  public getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  public setItem(key: string, data: any): void {
    localStorage.setItem(key, data);
    this.onSubject.next({ key: key, value: data });
  }

  public clear() {
    localStorage.clear();
    this.onSubject.next({ key: null, value: null });
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
    this.onSubject.next({ key: key, value: null });
  }

  private start(): void {
    window.addEventListener('storage', this.storageEventListener.bind(this));
  }

  private storageEventListener(event: StorageEvent) {
    const { storageArea, key, newValue } = event;

    if (storageArea == localStorage) {
      this.onSubject.next({ key: key, value: newValue });
    }
  }

  private stop(): void {
    window.removeEventListener('storage', this.storageEventListener.bind(this));
    this.onSubject.complete();
  }
}
