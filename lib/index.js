
function findDescendantByKey(obj, key) {
  let values = [];

  if (!obj) {
    return values;
  }

  if (obj instanceof Array) {
    for (var i in obj) {
      values = [...values, ...findValuesByKey(obj[i], key)];
    }
    return values;
  }

  if (obj[key]) {
    values.push(obj[key]);
  }

  if (typeof obj == "object") {
    for (const v of Object.values(obj)) {
      values = [...values, ...findValuesByKey(v, key)];
    }
  }

  return values;
}
/*
const json = {
  foo: "bar",
  baz: {
    name: "baz",
  },
};

console.log(findValuesByKey(json, "name"));
*/

function findAncestorsByKey(obj, key, ancestors = [], allAncestors = []) {
  if (!obj || typeof obj !== "object") {
    return allAncestors;
  }

  for (const [currentKey, value] of Object.entries(obj)) {
    if (currentKey === key) {
      allAncestors.push(ancestors);
    }

    if (typeof value === "object") {
      findAncestorsByKey(value, key, [...ancestors, currentKey], allAncestors);
    }
  }

  return allAncestors;
}

const json = {
  foo: {
    bar: {
      target: "value",
    },
  },
  another: {
    level: {
      target: "another_value",
    },
  },
};

console.log(findAncestorsByKey(json, "target")); 