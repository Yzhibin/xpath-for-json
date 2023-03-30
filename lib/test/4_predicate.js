import { expect } from "chai";
import { find } from "../dist";
const team = require("./json/team.json");

describe("predicates", function () {
  it("array slice, 1 param", function () {
    expect(find(team, "/child::*[1]")).deep.equal(Object.values(team).slice(1));
  });
  it("array slice, 2 params", function () {
    expect(find(team, "/child::*[0,2]")).deep.equal(
      Object.values(team).slice(0, 2)
    );
  });
});
