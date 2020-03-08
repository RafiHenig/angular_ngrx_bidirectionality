export interface IStore<T>{
    load : () => void;
    update : (x: T) => void;
    remove : (x: T) => void;
    create : (x: T) => void;
    set : (x : T | T[]) => void;
    cancelChanges : () => void;
    saveChanges : () => void;
}