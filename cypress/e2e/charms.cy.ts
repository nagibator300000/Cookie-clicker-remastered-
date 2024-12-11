const gameData = {
  count: 500,
  perClick: 10,
  periodPoints: 0,
  periodTime: 5,
  souls: 0,
};

describe("Charms test", () => {
  beforeEach(() => {
    cy.viewport(2560, 1440);
    cy.intercept("GET", "/user", { fixture: "user.json" });

    cy.intercept("POST", "/gamedata", {
      fixture: "gameStats.json",
    });
  });

  it("quick slash charm", () => {
    cy.intercept("GET", "/gamedata", {
      ...gameData,
      inventoryContent: [{ type: "quick_slash", col: 3, row: 3, id: 24 }],
    });
    cy.visit("http://localhost:1941");
    cy.get(".inventory .charm[data-charm-type=quick_slash]").should(
      "be.visible"
    );
    cy.get(".counter").as("button");
    cy.get(".geoes").as("value");
    cy.get("@value").should("have.text", "500");
    cy.get("@button").click();
    cy.get("@value").should("have.text", "515");
  });
  it("fragile force charm", () => {
    cy.intercept("GET", "/gamedata", {
      ...gameData,
      inventoryContent: [{ type: "fragile_force", col: 3, row: 3, id: 24 }],
    });
    cy.visit("http://localhost:1941");
    cy.get(".inventory .charm[data-charm-type=fragile_force]").should(
      "be.visible"
    );
    cy.get(".counter").as("button");
    cy.get(".geoes").as("value");
    cy.get("@value").should("have.text", "500");
    cy.get("@button").click();
    cy.get("@value").should("have.text", "520");
  });
  it("fury of the fallen charm", () => {
    cy.intercept("GET", "/gamedata", {
      ...gameData,
      inventoryContent: [
        { type: "fury_of_the_fallen", col: 3, row: 3, id: 24 },
      ],
    });
    cy.visit("http://localhost:1941");
    cy.get(".inventory .charm[data-charm-type=fury_of_the_fallen]").should(
      "be.visible"
    );
    cy.get(".counter").as("button");
    cy.get(".geoes").as("value");
    cy.get("@value").should("have.text", "500");
    cy.get("@button").click();
    cy.get("@value").should("have.text", "517");
  });
});
