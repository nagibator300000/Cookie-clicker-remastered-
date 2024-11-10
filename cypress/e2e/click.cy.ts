describe("Game stats test", () => {
  beforeEach(() => {
    cy.viewport(2560, 1440);
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

  it("unlock blocker", () => {
    cy.contains("unlock slot").click();
    cy.get("@value").should("have.text", "450");
    cy.contains("info: click on the blocker").as("notification");
    cy.get("@notification").should("be.visible").click().should("not.exist");
    cy.get(".inventory .charm:first-child").as("blocker");
    cy.get("@blocker").click().should("not.exist");
    cy.contains("unlock slot").click();
    cy.get("@notification").wait(5000).should("not.exist");
  });
});
