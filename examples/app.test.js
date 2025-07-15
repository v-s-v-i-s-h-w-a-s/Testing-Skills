// Sample app.test.js file for the GitHub Actions course
const { add, subtract, multiply, divide } = require('./app');

test('add function adds two numbers correctly', () => {
  expect(add(2, 3)).toBe(5);
});

test('subtract function subtracts two numbers correctly', () => {
  expect(subtract(5, 2)).toBe(3);
});

test('multiply function multiplies two numbers correctly', () => {
  expect(multiply(3, 4)).toBe(12);
});

test('divide function divides two numbers correctly', () => {
  expect(divide(10, 2)).toBe(5);
});

test('divide function throws error on division by zero', () => {
  expect(() => divide(10, 0)).toThrow('Division by zero');
});
