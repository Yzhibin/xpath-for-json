import { expect } from "chai";
import { find } from "../dist";
const team = require("./json/team.json");

describe("child and desendants", function () {
  describe("should find a child by name", function () {
    expect(find(team, "/child::class")).deep.equal(team.class);
  });

  describe("should find a descendant by chaining child", function () {
    expect(find(team, "/child::class/child::code")).deep.equal(team.class.code);
  });
});
