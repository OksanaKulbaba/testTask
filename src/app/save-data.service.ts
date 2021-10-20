import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Data} from './modal-create-data/modal-create-data.component';

export interface FullData extends Data {
  profit: number;
  id: number;
}

interface DayResult {
  date: Data;
  balance: number;
}
interface ResultByDateSubject {
  data: {data: number[], label: string}[];
  labels: string[];
}


@Injectable({ providedIn: 'root' })
export class SaveDataService {
  private savedDataset: Array<FullData>;
  private balance =  0;
  private resultByDate: Array<DayResult> = [];
  private resultByDateSubject: ResultByDateSubject = {
    data: [{data: [], label: 'Balance'}],
    labels: []
  };

  public savedDateSet$: BehaviorSubject<Array<FullData>> = new BehaviorSubject<Array<FullData>>([]);
  public balance$: BehaviorSubject<number> = new BehaviorSubject<number>(this.balance);
  public resultByDate$: BehaviorSubject<ResultByDateSubject> = new BehaviorSubject<ResultByDateSubject>(this.resultByDateSubject);

  public addTrade(data: Data): void {
    this.savedDataset = this.savedDateSet$.getValue();
    const fullDate = {
     ...data,
     id: this.savedDataset[this.savedDataset?.length - 1]?.id + 1 || 1,
     profit: data.exitPrice - data.entryPrice,
   };
    this.savedDataset.push(fullDate);
    this.savedDateSet$.next(this.savedDataset);
    this.calcResultByDate();
    this.calculateEditedResult(fullDate);
  }

  public calcResultByDate(): void {
    this.savedDataset = this.savedDateSet$.getValue();
    const uniqDates = this.savedDataset.filter((item, i, ar) => ar.findIndex(v => v.exitDate === item.exitDate) === i)
      .map(d => d.exitDate)
      .sort();
    this.resultByDate = [];
    for (const uniqDate of uniqDates) {
    this.resultByDate.push(
      {
      date: uniqDate,
      balance:  this.savedDataset.filter( item => item.exitDate === uniqDate).reduce((acc, current) => acc + current.profit, 0)
    });
    }
    this.resultByDateSubject =
      { data: [{data: [], label: 'Balance'}],
      labels: [] };
    for (const balance of this.resultByDate) {
      this.resultByDateSubject.data[0].data.push(balance.balance);
      this.resultByDateSubject.labels.push(balance.date.toString());
    }
    this.resultByDate$.next(this.resultByDateSubject);

  }

  public editData(fullData: FullData): void {
    this.savedDataset = this.savedDateSet$.getValue();
    const foundIndex = this.savedDataset.findIndex(x => x.id === fullData.id);
    this.savedDataset[foundIndex] = {
      ...fullData,
      profit: fullData.exitPrice - fullData.entryPrice
    };
    this.calcResultByDate();
    this.calculateEditedResult(fullData);
    this.savedDateSet$.next(this.savedDataset);

  }

  public calculateEditedResult(trade: FullData): void {
    this.balance = this.balance$.getValue() + trade.profit;
    this.balance$.next(this.balance);
  }

}
