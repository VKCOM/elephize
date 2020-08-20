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

import { IDisposable } from './Object';

/**
 * Defines an interface for event callbacks.
 */
export interface IEventHandler<TEventArgs> {

  (sender: any, args: TEventArgs): any;

}

/**
 * Defines an interface for objects that can modify a list of event subscribers.
 */
export interface IEvent<TEventArgs> {

  /**
   * Adds a function to be called when this event is triggered.
   *
   * All event handlers are executed synchonously and in the order that they
   * were added. If an event handler can be executed asynchronously, then it
   * should use `setImmediate()` or `process.nextTick()` methods.
   *
   * @param {IEventHandler<TEventArgs>} handler
   *   The event handler to add.
   * @param {*} context
   *   The value of `this` within the event handler.
   */
  addHandler(handler: IEventHandler<TEventArgs>, context?: any): void;

  /**
   * Removes a function from the event handlers associated with this event.
   *
   * @param {IEventHandler<TEventArgs>} handler
   *   The event handler to remove.
   * @param {*} context
   *   The value of `this` within the event handler.
   */
  removeHandler(handler: IEventHandler<TEventArgs>, context?: any): void;

}

/**
 * Defines an interface for objects that need to dispatch events.
 */
export interface IEventEmitter<TEventArgs> extends IDisposable, IEvent<TEventArgs> {

  /**
   * Executes all subscribed event handlers.
   *
   * @param {*} sender
   *   The event sender.
   * @param {TEventArgs} args
   *   An object containing event arguments.
   */
  trigger(sender: any, args: TEventArgs): void;

}

/**
 * A generic event argument.
 */
export class EventArgs {

  /**
   * An event argument with no data.
   */
  public static readonly Empty = new EventArgs();

}

/**
 * Allows a providing class to implement events that an observer can subscribe
 * to. When triggered, the subscribing handler is provided with the sender and
 * any custom event arguments.
 */
export class EventEmitter<TEventArgs> implements IEventEmitter<TEventArgs> {

  /**
   * A map of subscribed event handlers and their contexts.
   */
  protected handlers: Map<IEventHandler<TEventArgs>, Set<any>> = new Map();

  /**
   * @inheritdoc
   */
  public addHandler(handler: IEventHandler<TEventArgs>, context?: any) {
    const contexts = this.handlers.get(handler);
    if (contexts === undefined) {
      let set = new Set<any>();
      set.add(context);
      this.handlers.set(handler, set);
    }
    else {
      contexts.add(context);
    }
  }

  /**
   * @inheritdoc
   */
  public removeHandler(handler: IEventHandler<TEventArgs>, context?: any) {
    const contexts = this.handlers.get(handler);
    if (contexts === undefined) {
      return;
    }
    contexts.delete(context);
    if (contexts.size === 0) {
      this.handlers.delete(handler);
    }
  }

  /**
   * @inheritdoc
   */
  public trigger(sender: any, args: TEventArgs) {
    const handlers = this.cloneHandlers();
    for (let [handler, contexts] of handlers) {
      for (let context of contexts) {
        handler.call(context, sender, args);
      }
    }
  }

  /**
   * Releases all references to event handlers.
   */
  public dispose() {
    this.handlers.clear();
  }

  /**
   * Performs a deep clone of the subscribed event handlers.
   */
  protected cloneHandlers(): Map<IEventHandler<TEventArgs>, Set<any>> {
    let handlers = new Map<IEventHandler<TEventArgs>, Set<any>>();
    for (let [handler, contexts] of this.handlers) {
      handlers.set(handler, new Set(contexts));
    }
    return handlers;
  }

}
