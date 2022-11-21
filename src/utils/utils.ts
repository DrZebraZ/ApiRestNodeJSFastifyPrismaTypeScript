export async function getDateNow(): Promise<Date>{
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const hours = date.getHours()
  const min = date.getMinutes()
  const seconds = date.getSeconds()
  const milliseconds = date.getMilliseconds()
  let now = new Date(Date.UTC(year, month, day, hours, min, seconds, milliseconds));
  return now;
}



//((now.getDate()))+"-"+"now.getMonth()"+"-"+now.getFullYear()+ "T"+((now.getHours()-3))+":"+now.getMinutes()+":"+now.getSeconds+":"+now.getMilliseconds();