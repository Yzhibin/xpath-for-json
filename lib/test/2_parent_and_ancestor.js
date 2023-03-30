import { expect } from "chai";
import { find } from "../dist";
const team = require("./json/team.json");

describe("parent and ancestors", function () {
  it("should find one's parent", function () {
    expect(find(team, "/child::class/parent::")).deep.equal(team);
  });

  it("should find one's ancestors", function () {
    expect(find(team, "/ancestor::code")).deep.equal([["class"]]);
  });
});
