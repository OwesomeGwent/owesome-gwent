export default function delay(ms = 3000) {
  return new Promise(res => setTimeout(res, ms));
}
