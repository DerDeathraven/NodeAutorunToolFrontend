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
};
export const useExecutionStore = defineStore("execution", {
  state: (): executionStates => ({
    activeScript: "",
    scriptLog: [],
    scriptError: false,
    scriptRunning: false,
  }),
  getters: {
    getLog() {
      return this.scriptLog;
    },
    getLastLogEntry(): string {
      return this.scriptLog.pop();
    },
  },
  actions: {
    executeScript(script: string) {
      socket.emit(
        "scriptComLane",
        {
          command: "EXECUTE",
          data: script,
        } as scriptComLaneMessage,
        () => {
          this.activeScript = script;
          this.scriptLog = [];
          this.scriptRunning = true;
        }
      );
      const activeListner = socket.on("scriptOut", (returnData: LogEntry) => {
        console.log(returnData);
        this.scriptLog.push(returnData);
        switch (returnData.type) {
          case "CRASH":
            this.scriptError = true;
          case "FINISH":
            this.scriptRunning = false;
            activeListner.off();
        }
      });
    },
  },
});
