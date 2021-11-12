function dec2hex(dec: any) {
  return dec.toString(16).padStart(2, '0');
}

export function randomId(len?: number) {
  var arr = new Uint8Array((len || 10) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join('');
}
