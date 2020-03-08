import { Observable, BehaviorSubject, zip } from 'rxjs';
import { IStore } from '../interfaces/istore.interface';

export enum ModeState {
  Untouched,
  Updated,
  Created,
  Deleted,
}

const cloneData = <T>(data: T) => Object.assign({}, data);

export abstract class AbstractStoreSingle<T> extends BehaviorSubject<T> implements IStore<T>{

  protected data: T;;
  protected originalData: T;
  protected abstract readonly updateObservableFactory: (pk: any, data: T) => Observable<any>;
  protected abstract readonly deleteObservableFactory: (pk: any) => Observable<any>;
  protected abstract readonly createObservableFactory: (data: T) => Observable<any>;
  protected abstract readonly getObservableFactory: () => Observable<T>;
  protected mode: ModeState = ModeState.Untouched;

  constructor(public PK: keyof T, public initial: T = null) {
    super(initial);
  }

  get hasChanges(): boolean { return this.mode != ModeState.Untouched }

  public load = (): void => {
    this.getObservableFactory()
    .subscribe(data => {
      this.data = data;
      this.originalData = cloneData(data);
      super.next(data);
      this.changeMode(ModeState.Untouched);
      });
  }

  public set(x : T){
    this.originalData = cloneData(x);
    this.data = x;

    super.next(x);
    this.changeMode(ModeState.Untouched);
  }

  public create(item: T): void {
    this.originalData = cloneData(this.data);
    this.data = item;

    super.next(this.data);
    this.changeMode(ModeState.Created)
  }

  public update(item: T): void {
    this.originalData = cloneData(this.data);
    this.data = item;

    super.next(this.data);
    this.changeMode(ModeState.Updated)
  }

  public remove(item: T): void {
    this.originalData = cloneData(this.data);
    this.data = null;

    super.next(this.data);
    this.changeMode(ModeState.Deleted)
  }

  public cancelChanges(): void {
    this.data = this.originalData;
    this.originalData = cloneData(this.originalData);

    super.next(this.data);
    this.changeMode(ModeState.Untouched)
  }

  public saveChanges = () => {
    let task: Observable<any>;

    switch (this.mode) {
      case ModeState.Updated: task = this.updateObservableFactory(this.PK, this.data);
        break;

      case ModeState.Deleted: task = this.deleteObservableFactory(this.PK);
        break;

      case ModeState.Created: task = this.createObservableFactory(this.data);
        break;

      default: return;
    }

    task.subscribe(() => this.changeMode(ModeState.Untouched));
  }

  protected changeMode(mode: ModeState): void {
    this.mode = mode;
  }
}

