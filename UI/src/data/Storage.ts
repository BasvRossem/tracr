import { LogDay } from "../types";
import { store } from "./store";

class Storage {
    selectedDate: Date = new Date();

    get day(): LogDay {
        const logs = store.getState().logger.value.logs.map(log => ({
            id: log.id,
            title: log.title,
            startTime: log.startTime,
            stopTime: log.stopTime,
            notes: log.notes
        }));
        return new LogDay(
            store.getState().logger.value.date,
            logs
        )
    }
}

export const storage = new Storage();