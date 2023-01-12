describe("Checkbox should show", () => {
  it("Should show checkbox", () => {
    cy.visit("/components");
    cy.get('[type="checkbox"]').should("be.visible");
  });
});

describe("Should check checkbox", () => {
  it("Should check checkbox", () => {
    cy.visit("/components");
    cy.get('[type="checkbox"]').check();
  });
});
