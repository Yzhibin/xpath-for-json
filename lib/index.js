
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

// console.log(findAncestorsByKey(json, "target")); 

function findAllElementsByKey(obj, key) {
  if (key && !(key in obj)) {
    return [];
  }

  const result = [];
  const targetObj = key ? obj[key] : obj;

  if (Array.isArray(targetObj)) {
    return targetObj;
  }

  function traverse(node) {
    if (Array.isArray(node)) {
      for (const item of node) {
        traverse(item);
      }
    } else if (typeof node === 'object' && node !== null) {
      for (const value of Object.values(node)) {
        traverse(value);
      }
    } else {
      result.push(node);
    }
  }

  traverse(targetObj);
  return result;
}

const contact = {
  firstName: "John",
  lastName: "doe",
  age: 26,
  address: {
    streetAddress: "naist street",
    city: "Nara",
    postalCode: "630-0192",
  },
  phoneNumbers: [
    {
      type: "iPhone",
      number: "0123-4567-8888",
    },
    {
      type: "home",
      number: "0123-4567-8910",
    },
  ],
};

// console.log(findAllElementsByKey(contact, "address")); 
console.log([...contact])