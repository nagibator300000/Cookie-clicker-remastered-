describe("Game stats test", () => {
  beforeEach(() => {
    cy.viewport(2560, 1440);
    cy.intercept("GET", "/user", { fixture: "user.json" });
    cy.intercept("GET", "/gameData", (req) => {
      cy.readFile("cypress/fixtures/gameStats.json")
        .then((gameStats) => {
          gameStats.inventoryContent.push({
            type: "quick-slash",
            row: 3,
            col: 3,
          });
        })
        .then((data) => {
          req.reply(data);
        });
    });
    cy.intercept("POST", "/gamedata", { fixture: "gameStats.json" });
    cy.visit("http://localhost:1941");

    cy.get(".counter").as("button");
    cy.get(".geoes").as("value");
  });

  it("quick slash charm", () => {
    cy.get(".switch_shop").click();
    cy.get("[data-charm-type=quick_slash]").should("be.visible");
  });
});
