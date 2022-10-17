import { defineStore } from "pinia";
import {
  LogEntry,
  scriptComLaneMessage,
} from "../Model/Server-Client-Coms/scripts";
import { socket } from "../websocket/socket";
export type executionStates = {
  activeScript: string;
  scriptLog: LogEntry[];
  scriptRunning: boolean;
  scriptError: boolean;
  globalLog: { [key: string]: LogEntry[] };
};
export const useExecutionStore = defineStore("execution", {
  state: (): executionStates => ({
    activeScript: "",
    scriptLog: [],
    scriptError: false,
    scriptRunning: false,
    globalLog: {},
  }),
  getters: {
    getLog() {
      return this.scriptLog;
    },
    getLastLogEntry(): string {
      return this.scriptLog.pop();
    },
    getNormalizedGlobalLogs(): LogEntry[] {
      let retArr: LogEntry[] = [];
      for (const key in this.globalLog) {
        retArr = [...retArr, ...this.globalLog[key]];
      }
      return retArr;
    },
  },
  actions: {
    executeScript(script: string) {
      if (!this.activeScript) this.activeScript = script;
      if (this.activeScript != script) this.scriptLog = [];

      socket.emit(
        "scriptComLane",
        {
          command: "EXECUTE",
          data: script,
        } as scriptComLaneMessage,
        (err: any) => {
          throw new Error(err);
        }
      );
      const activeListner = socket.on("scriptOut", (returnData: LogEntry) => {
        this.scriptRunning = true;
        this.activeScript = script;
        this.scriptLog.push(returnData);
        if (!returnData.isOld) {
          switch (returnData.type) {
            case "CRASH":
              this.scriptError = true;
            case "FINISH":
              this.scriptRunning = false;
              activeListner.off();
          }
        }
      });
    },
  },
});
