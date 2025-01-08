import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { share } from 'rxjs/operators';

/**
 * Service to manage the local storage
 */
@Injectable({ providedIn: 'root' })
export class StorageService implements OnDestroy {
  /**
   * Subject to notify changes in the local storage
   * @private
   */
  private onSubject = new Subject<{ key: string | null; value: any }>();
  /**
   * Observable to notify changes in the local storage
   * @type {Observable<{ key: string | null; value: any }>}
   */
  public changes: Observable<{ key: string | null; value: any }> =
    this.onSubject.asObservable().pipe(share());

  /**
   * Constructor of the class
   */
  constructor() {
    this.start();
  }

  /**
   * Angular lifecycle hook for component destruction
   */
  ngOnDestroy() {
    this.stop();
  }

  /**
   * Method to get an item from the local storage
   * @param key Key of the item
   * @returns {string | null} Value of the item
   */
  public getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  /**
   * Method to set an item in the local storage
   * @param key Key of the item
   * @param data Value of the item
   */
  public setItem(key: string, data: any): void {
    localStorage.setItem(key, data);
    this.onSubject.next({ key: key, value: data });
  }

  /**
   * Method to clear the local storage
   */
  public clear() {
    localStorage.clear();
    this.onSubject.next({ key: null, value: null });
  }

  /**
   * Method to remove an item from the local storage
   * @param key Key of the item
   */
  public removeItem(key: string): void {
    localStorage.removeItem(key);
    this.onSubject.next({ key: key, value: null });
  }

  /**
   * `start` hook
   * @private
   */
  private start(): void {
    window.addEventListener('storage', this.storageEventListener.bind(this));
  }

  /**
   * Method to listen to the storage event
   * @param event Storage event
   * @private
   */
  private storageEventListener(event: StorageEvent) {
    const { storageArea, key, newValue } = event;

    if (storageArea == localStorage) {
      this.onSubject.next({ key: key, value: newValue });
    }
  }

  /**
   * `stop` hook
   * @private
   */
  private stop(): void {
    window.removeEventListener('storage', this.storageEventListener.bind(this));
    this.onSubject.complete();
  }
}
