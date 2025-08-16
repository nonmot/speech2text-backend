describe("Config", () => {
  it("should load API config correctly", async () => {
    process.env.PORT = "4000";
    jest.resetModules();
    const { default: config } = await import("../config/config");
    expect(config.port).toBe(4000);
  });
});
