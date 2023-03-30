import { expect } from "chai";
import { find } from "../dist";
const team = require("./json/team.json");

describe("nodetest, other than by key name", function () {
  it("child should recognise wildcard nodetest", function () {
    expect(find(team, "/child::*")).deep.equal(Object.values(team));
  });
});
