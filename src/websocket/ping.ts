import { Ref } from "vue";
import { getAssuredResponse } from "./getAssuredResponse";

export function startPing(inpRef: Ref<boolean>) {
  const pingAction = async () => {
    try {
      await getAssuredResponse("ping", "true");
      inpRef.value == false ? (inpRef.value = true) : "";
    } catch (err) {
      console.log(err);
      inpRef.value == true ? (inpRef.value = false) : "";
    }
  };
  pingAction;
  setInterval(pingAction, 1000);
}
