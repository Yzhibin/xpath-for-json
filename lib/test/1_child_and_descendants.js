import { expect } from "chai";
import { find } from "../dist";
const team = require("./json/team.json");

describe("child and desendants", function () {
  it("should find a child by name", function () {
    expect(find(team, "/child::class")).deep.equal(team.class);
  });

  it("should find a descendant by chaining child", function () {
    expect(find(team, "/child::class/child::code")).deep.equal(team.class.code);
  });

  it("should be able to find key of array", function () {
    expect(find(team, "/child::students/child::name")).deep.equal([
      "Michael",
      "Shiyi",
      "Wenjun",
      "Zhibin",
    ]);
  });
});
