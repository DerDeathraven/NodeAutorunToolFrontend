export type scriptCommand = "EXECUTE";
export type scriptReturnCode = "OK" | "ERROR";
export type scriptComLaneMessage = {
  command: scriptCommand;
  data: any;
};

export type LogEntry = {
  time: Date;
  type: "CRASH" | "DATA" | "WARNING" | "FINISH";
  output: ArrayBuffer;
};
