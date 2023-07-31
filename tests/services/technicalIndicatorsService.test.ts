import technicalIndicatorsService from "../../src/services/technicalIndicatorsService";

describe("Calculate moving averages", () => {
  it("should return correct moving averages", async () => {
    // Arrange
    const close = { price: 5, date: new Date() };
    const closes = [close, close, close];

    // Act
    const result = technicalIndicatorsService.movingAverages(closes, 2);

    // Assert
    expect(result.length).toBe(2);
    expect(result[0].value).toBe(5);
  });
});

describe("Calculate exponential moving averages", () => {
  it("should return correct exponential moving averages", async () => {
    // Arrange
    const close1 = { price: 22.22, date: new Date() };
    const close2 = { price: 22.15, date: new Date() };
    const close3 = { price: 22.39, date: new Date() };
    const close4 = { price: 22.38, date: new Date() };
    const closes = [
      close1,
      close1,
      close1,
      close1,
      close1,
      close1,
      close1,
      close1,
      close1,
      close1,
      close2,
      close3,
      close4,
    ];

    // Act
    const result = technicalIndicatorsService.exponentialMovingAverages(
      closes,
      10
    );

    // Assert
    expect(result.length).toBe(3);
    expect(result[0].value).toBe(22.207272727272724);
    expect(result[1].value).toBe(22.24049586776859);
    expect(result[2].value).toBe(22.265860255447027);
  });
});
