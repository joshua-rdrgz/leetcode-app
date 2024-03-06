export class Stack<T> {
  private items: T[] = [];

  /** Adds an item to the top of the stack */
  push(item: T): void {
    this.items.push(item);
  }

  /** Removes and returns the top item from the stack */
  pop(): T | undefined {
    return this.items.pop();
  }

  /** Returns the top item from the stack without removal */
  peek(): T | undefined {
    return !this.isEmpty() ? this.items[this.size() - 1] : undefined;
  }

  /** Returns the second to top item from stack without removal */
  peekPrev(): T | undefined {
    const hasPrev = this.size() >= 2;
    return hasPrev ? this.items[this.size() - 2] : undefined;
  }

  /** Returns the number of items in the stack */
  size(): number {
    return this.items.length;
  }

  /** Returns true if the stack is empty, otherwise false */
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  /** Clears the stack */
  clear(): void {
    this.items = [];
  }

  /** Prints the stack as a string, useful for debugging */
  printStack(): void {
    console.log(this.items.toString());
  }
}
