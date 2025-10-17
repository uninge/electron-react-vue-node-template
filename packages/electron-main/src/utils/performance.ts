import { PerformanceObserver, performance, PerformanceEntry } from 'node:perf_hooks';

let observer: PerformanceObserver | null = null;
let observerList: PerformanceEntry[] = [];

export function performanceStart(): void {
  observer = new PerformanceObserver((list) => {
    observerList.push(...list.getEntries());
  });
  observer.observe({ entryTypes: ['mark', 'measure'] });
}

export function performanceEnd(): void {
  if (observer) {
    observer.disconnect();
    performance.clearMarks();
    observer = null;
    observerList = [];
  }
}

export function mark(name: string): void {
  performance.mark(name);
}

export function measure(name: string, startMark: string, endMark: string): void {
  performance.measure(name, startMark, endMark);
}

export function getMarks(): PerformanceEntry[] {
  return observerList;
}

export function clearMarks(): void {
  performance.clearMarks();
}
