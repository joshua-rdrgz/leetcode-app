import { Stack } from '@/state/stack';

describe('Stack', () => {
  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack<number>();
  });

  it('should start empty', () => {
    expect(stack.isEmpty()).toBe(true);
    expect(stack.size()).toBe(0);
  });

  it('should push items onto the stack', () => {
    stack.push(1);
    expect(stack.isEmpty()).toBe(false);
    expect(stack.size()).toBe(1);
    stack.push(2);
    expect(stack.size()).toBe(2);
  });

  it('should pop items off the stack', () => {
    stack.push(1);
    stack.push(2);
    expect(stack.pop()).toBe(2);
    expect(stack.size()).toBe(1);
    expect(stack.pop()).toBe(1);
    expect(stack.size()).toBe(0);
  });

  it('should peek at the top item without removing it', () => {
    stack.push(1);
    expect(stack.peek()).toBe(1);
    expect(stack.size()).toBe(1);
  });

  it('should clear the stack', () => {
    stack.push(1);
    stack.push(2);
    stack.clear();
    expect(stack.isEmpty()).toBe(true);
  });

  it('should return undefined on pop and peek and peekPrev for an empty stack', () => {
    expect(stack.pop()).toBeUndefined();
    expect(stack.peek()).toBeUndefined();
    expect(stack.peekPrev()).toBeUndefined();
  });

  it('should print the stack as a string', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    stack.push(1);
    stack.push(2);
    stack.push(3);
    stack.printStack();

    expect(consoleSpy).toHaveBeenCalledWith('1,2,3');
  });

  it('should peek second to last item in stack if it exists', () => {
    stack.push(10);
    stack.push(20);

    expect(stack.peekPrev()).toEqual(10);
  });
});
