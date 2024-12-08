const gameData = {
  count: 500,
  perClick: 1,
  periodPoints: 0,
  periodTime: 5,
  souls: 0,
};

describe("Game stats test", () => {
  beforeEach(() => {
    cy.viewport(2560, 1440);
    cy.intercept("GET", "/user", { fixture: "user.json" });
    cy.intercept("POST", "/gamedata", { fixture: "gameStats.json" });
    cy.visit("http://localhost:1941");

    cy.get(".counter").as("button");
    cy.get(".geoes").as("value");
  });

  it("quick slash charm", () => {
    const newGameData = {
      ...gameData,
      inventoryContent: [{ type: "quick-slash", row: 1, col: 1 }],
    };
    cy.intercept("GET", "/gameData", { body: newGameData });
    cy.get(".switch_shop").click();
    cy.get("[data-charm-type=quick_slash]").should("be.visible");
  });
});
