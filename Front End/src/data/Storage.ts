export class Storage {
    private static instance: Storage = undefined;

    private constructor() { }

    static getInstance(): Storage {
        if (!Storage.instance) Storage.instance = new Storage();
        return Storage.instance;
    }

    selectedDate: Date = new Date();
}