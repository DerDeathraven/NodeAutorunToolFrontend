import { socket } from "./socket";

export async function getAssuredResponse(
  channel: string,
  message: string,
  i = 0
) {
  try {
    const answer = await Promise.race([
      timeout(2000, false),
      socketRequest(channel, message),
    ]);
    return answer;
  } catch (err) {
    if (i == 4) throw new Error("4 tries failed");
    console.log(`[${channel}]Timeout retrying in 2s...`);
    await timeout(2000, true);
    return getAssuredResponse(channel, message, i + 1);
  }
}
function socketRequest(channel: string, message: string) {
  return new Promise((resolve) => {
    socket.emit(channel, message, (f) => {
      resolve(f);
    });
  });
}
function timeout(time: number, res: boolean) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      res ? resolve() : reject();
    }, time);
  });
}
