import { format as tempoFormat } from "@formkit/tempo";

export default (dateInput, format) => {
   let date = dateInput instanceof Date ? dateInput : new Date(dateInput)
   return tempoFormat({ date, format, tz: "Asia/Ho_Chi_Minh" });
}