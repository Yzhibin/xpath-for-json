import { expect } from "chai";
const JSONPath = require("../dist");
import { find } from "../dist";

describe("npm library basics", function () {
  describe("should work with commonJS require", function () {
    expect(JSONPath.find).is.a("function");
  });
  describe("should work with import", function () {
    expect(find).is.a("function");
  });
});

describe("should takes in JSON string or JS Object", function () {
  describe("should work when JSON is a JSON string", function () {
    expect(find('{"foo":"bar"}')).is.a("object");
  });

  describe("should work when JSON is a JS object", function () {
    expect(find({ foo: "bar" })).is.a("object");
  });

  describe("should throw error if JSON is a string but cannot be parsed", function () {
    expect(() => find('{foo: "bar"}')).to.throw("Failed to parse JSON");
  });
});
