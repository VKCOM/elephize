/**
 * Copyright 2017 Matt Acosta
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/**
 * The global Node.js process (if available).
 */
declare var process: any;  // NodeJS.Process

/**
 * The global performance variable (if available).
 */
declare var performance: any;  // Performance

/**
 * Provides methods to measure an elapsed time period.
 */
export class Stopwatch {

  protected _elapsed: number = 0.0;

  protected _isRunning: boolean = false;

  protected timestamp: number = 0.0;

  /**
   * Creates a new `Stopwatch` object.
   */
  constructor() {
    // Do nothing.
  }

  /**
   * The total elapsed time, in milliseconds.
   */
  public get elapsed(): number {
    return this._elapsed;
  }

  /**
   * Indicates if the stopwatch is currently measuring an elapsed time period.
   */
  public get isRunning(): boolean {
    return this._isRunning;
  }

  /**
   * Resets the elapsed time and stops the timer.
   */
  public reset() {
    this._elapsed = 0.0;
    this._isRunning = false;
  }

  /**
   * Resets the elapsed time and starts the timer.
   */
  public restart() {
    this._elapsed = 0.0;
    this._isRunning = true;
    this.timestamp = this.getTimestamp();
  }

  /**
   * Starts the timer.
   */
  public start() {
    if (!this._isRunning) {
      this._isRunning = true;
      this.timestamp = this.getTimestamp();
    }
  }

  /**
   * Stops the timer and measures the elapsed time since starting.
   */
  public stop() {
    if (this._isRunning) {
      const stop = this.getTimestamp();
      this._elapsed = this._elapsed + (stop - this.timestamp);
      this._isRunning = false;
    }
  }

  /**
   * Gets a timestamp with at least millisecond resolution.
   */
  protected getTimestamp(): number {
    if (typeof process !== 'undefined' && typeof process.nextTick === 'function') {
      return Stopwatch.fromNodeTime(process.hrtime());
    }
    else if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
      return performance.now();
    }
    else {
      // This method is subject to external factors such as NTP adjustments, or
      // even a user manually changing their system clock.
      return Date.now();
    }
  }

  /**
   * Converts a Node.js high-resolution timestamp to milliseconds.
   */
  protected static fromNodeTime(time: [number, number]): number {
    return (time[0] * 1000) + (time[1] / 1000000);
  }

}
