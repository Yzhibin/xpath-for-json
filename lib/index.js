
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

const json = {
  foo: "bar",
  baz: {
    name: "baz",
  },
};

console.log(findValuesByKey(json, "name"));
