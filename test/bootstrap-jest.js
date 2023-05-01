if (!process.env.LOG) {
  global.console.log = jest.fn();
  global.console.error = jest.fn();
}
