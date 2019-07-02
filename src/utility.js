export function uniqueID() {
  return parseInt((Math.random() + '').slice(2)).toString(36);
}
