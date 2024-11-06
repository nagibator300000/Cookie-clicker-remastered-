describe("Game stats test", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.intercept("GET", "/user", { fixture: "user.json" });
    cy.intercept("GET", "/gamedata", { fixture: "gameStats.json" });
    cy.intercept("POST", "/gamedata", { fixture: "gameStats.json" });
    cy.visit("http://localhost:1941");

    cy.get(".counter").as("button");
    cy.get(".geoes").as("value");
  });

  it("simple clicks", () => {
    cy.get("@button").click();
    cy.get("@value").should("have.text", "501");
    cy.get("@button").click();
    cy.get("@value").should("have.text", "502");
  });

  it("per click upgrade", () => {
    cy.contains("per click").click();
    cy.get("@value").should("have.text", "490");
    cy.get("@button").click();
    cy.get("@value").should("have.text", "492");
  });
});
