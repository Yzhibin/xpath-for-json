import { expect } from "chai";
import { find } from "../dist";
const team = require("./json/team.json");

describe("child and desendants", function () {
  it("should find one's parent", function () {
    expect(find(team, "/child::class/parent::")).deep.equal(team);
  });
});
