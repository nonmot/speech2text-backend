
describe('Config', () => {
  it('should load API config correctly', () => {
    process.env.PORT = '4000';
    jest.resetModules();
    const config = require('../config/config').default;
    expect(config.port).toBe(4000);
  })
})

