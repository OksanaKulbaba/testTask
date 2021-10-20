
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Data } from './modal-create-data/modal-create-data.component';

interface FullData extends Data {
  profit: number;
  id: number;
}

@Injectable({ providedIn: 'root' })
export class SaveDate {
  public baseDates: [Data];

  baseDate: Subject<Data> = new Subject<Data>();

  public createFullData(Date): FullData {
    return null;
  }

}
