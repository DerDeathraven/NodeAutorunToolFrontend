import { socket } from "./socket";

export async function getAssuredResponse(
  channel: string,
  message: string,
  i = 0
) {
  try {
    const answer = await Promise.race([
      promTimeout(),
      socketRequest(channel, message),
    ]);
    return answer;
  } catch (err) {
    if (i == 4) throw new Error("4 tries failed");
    console.log(`[${channel}]Timeout retrying in 2s...`);
    await timeout(2000);
    return getAssuredResponse(channel, message, i + 1);
  }
}
function promTimeout() {
  return new Promise<boolean>((resolve, reject) => {
    setTimeout(() => {
      reject();
    }, 2000);
  });
}
function socketRequest(channel: string, message: string) {
  return new Promise((resolve) => {
    socket.emit(channel, message, (f) => {
      resolve(f);
    });
  });
}
function timeout(time: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
