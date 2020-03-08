import { Observable, BehaviorSubject, zip, forkJoin } from 'rxjs';
import { IStore } from '../interfaces/istore.interface';

const itemIndex = <T, K extends keyof T>(item: T, data: T[], idField: K): number => {
  for (let idx = 0; idx < data.length; idx++)
    if (data[idx][idField] === item[idField])
      return idx;

  return -1;
}

const cloneData = <T>(data: T[]) => data.map(item => Object.assign({}, item));

export abstract class AbstractDataService<T> extends BehaviorSubject<T[]> implements IStore<T>{

  protected data: T[] = [];
  protected originalData: T[] = [];
  protected createdItems: T[] = [];
  protected updatedItems: T[] = [];
  protected deletedItems: T[] = [];

  protected abstract readonly updateObservableFactory: (data: T[]) => Observable<any>;
  protected abstract readonly deleteObservableFactory: (pks: any[]) => Observable<any>;
  protected abstract readonly createObservableFactory: (data: T[]) => Observable<any>;
  protected abstract readonly getObservableFactory: () => Observable<T[]>;


  constructor(public PK: keyof T) {
    super([]);
  }

  get hasChanges(): boolean { return Boolean(this.deletedItems.length || this.updatedItems.length || this.createdItems.length) }

  public load() {
    if (this.data.length) {
      return super.next(this.data);
    }

    this.getObservableFactory()
      .subscribe(data => {
        this.data = data;
        this.originalData = cloneData(data);
        super.next(data);
      });
  }

  public set(x: T[]): void {
    this.reset();
    
    this.data = x;
    this.originalData = cloneData(this.originalData);
    super.next(this.data);
  }

  public create(item: T): void {
    this.createdItems.push(item);
    this.data.unshift(item);

    super.next(this.data);
  }


  public update(item: T): void {
    if (!this.isNew(item)) {
      const index = itemIndex(item, this.updatedItems, this.PK);

      if (index > -1) this.updatedItems.splice(index, 1, item);
      else this.updatedItems.push(item);

    } else {
      const index = this.createdItems.indexOf(item);
      this.createdItems.splice(index, 1, item);
    }
  }

  public remove(item: T): void {
    let index = itemIndex(item, this.data, this.PK);
    this.data.splice(index, 1);

    index = itemIndex(item, this.createdItems, this.PK);
    if (index >= 0) {
      this.createdItems.splice(index, 1);
    } else {
      this.deletedItems.push(item);
    }

    index = itemIndex(item, this.updatedItems, this.PK);
    if (index >= 0) {
      this.updatedItems.splice(index, 1);
    }

    super.next(this.data);
  }

  private isNew(item: T): boolean {
    return !item[this.PK];
  }

  public saveChanges(): void {
    if (!this.hasChanges) return;

    const completed = [];

    if (this.deletedItems.length) {
      completed.push(this.deleteObservableFactory(this.deletedItems.map(x => x[this.PK])));
    }

    if (this.updatedItems.length) {
      completed.push(this.updateObservableFactory(this.updatedItems));
    }

    if (this.createdItems.length) {
      completed.push(this.createObservableFactory(this.createdItems));
    }

    zip(...completed).subscribe(this.reset);
  }

  public cancelChanges(): void {
    this.reset();

    this.data = this.originalData;
    this.originalData = cloneData(this.originalData);
    super.next(this.data);
  }

  public assignValues(target: T, source: T): void {
    Object.assign(target, source);
  }

  protected reset() {
    this.data = [];
    this.deletedItems = [];
    this.updatedItems = [];
    this.createdItems = [];
  }
}

