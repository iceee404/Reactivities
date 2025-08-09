import { makeAutoObservable } from "mobx";

export default class CounterStore {
  title = "Counter Store";
  count = 0;
  events: string[] = [`Initial count is ${this.count}`];

  constructor() {
    // makeObservable(this, {
    //   count: observable,
    //   increment: action,
    //   decrement: action,
    // });
    makeAutoObservable(this);
  }

  increment = (amount = 1) => {
    this.count += amount;
    this.events.push(`Incremented by ${amount} to ${this.count}`);
  };

  decrement = (amount = 1) => {
    this.count -= amount;
    this.events.push(`Decremented by ${amount} to ${this.count}`);
  };

  get eventCount() {
    return this.events.length;
  }
}
