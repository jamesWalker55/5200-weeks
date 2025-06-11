export function toDateNumber(d: Date) {
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

export function toDate(d: number) {
  return new Date(year(d), month(d) - 1, day(d));
}

export function year(d: number) {
  return Math.floor(d / 10000);
}

export function month(d: number) {
  return Math.floor(d / 100) % 100;
}

export function day(d: number) {
  return d % 100;
}

export function today() {
  return toDateNumber(new Date());
}

export function addDays(d: number, days: number): number {
  const date = toDate(d);
  date.setDate(date.getDate() + days);
  return toDateNumber(date);
}
