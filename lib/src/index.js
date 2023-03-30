export const find = (json, jsonPath) => {
  if (typeof json === "string") {
    try {
      json = JSON.parse(json);
    } catch (e) {
      throw new Error("Failed to parse JSON");
    }
  }

  return doFind(json, jsonPath, json);
};

const doFind = (json, jsonPath, parent) => {
  if (jsonPath === "/") return json;
  if (!jsonPath) return json;

  let result = json;

  const [next, rest] = getNext(jsonPath);
  if (next.startsWith("/child::")) {
    const key = getKey(next);
    const curr = result;
    if (key === "*") {
      if (Array.isArray(result)) {
        result = result.map((x) => Object.values(x));
        result = [].concat([...result]);
      } else {
        result = Object.values(result);
      }
    } else {
      if (Array.isArray(result)) {
        result = result.map((x) => x[key]);
      } else {
        result = result[key];
      }
    }

    result = applyPredicate(result, getPredicate(next));

    return doFind(result, rest, curr);
  }

  if (next.startsWith("/descendant::")) {
    return applyPredicate(
      findDescendantByKey(result, getKey(next)),
      getPredicate(next)
    );
  }

  if (next.startsWith("/parent::")) {
    return applyPredicate(parent, getPredicate(next));
  }

  if (next.startsWith("/ancestor::")) {
    return applyPredicate(
      findAncestorsByKey(result, getKey(next)),
      getPredicate(next)
    );
  }
};

const getNext = (jsonPath) => {
  const [_, next, ...rest] = jsonPath.split("/");
  return ["/" + next, "/" + rest.join("/")];
};

const getKey = (token) => {
  const [_, keyAndPredicate] = token.split("::");
  const [key] = keyAndPredicate.split("[");
  return key;
};

const getPredicate = (token) => {
  const [_, predicate] = token.split("[");
  return predicate?.substring(0, predicate.length - 1);
};

const applyPredicate = (value, predicate) => {
  if (
    predicate &&
    Number.isInteger(Number(predicate.substring(0, 1))) &&
    Array.isArray(value)
  ) {
    const [from, to] = predicate.split(",");
    if (to) {
      return value.slice(Number(from.trim()), Number(to.trim()));
    } else {
      return value.slice(Number(from.trim()));
    }
  } else {
    return value;
  }
};

const findDescendantByKey = (obj, key) => {
  let values = [];

  if (!obj) {
    return values;
  }

  if (obj instanceof Array) {
    for (var i in obj) {
      values = [...values, ...findDescendantByKey(obj[i], key)];
    }
    return values;
  }

  if (obj[key]) {
    values.push(obj[key]);
  }

  if (typeof obj == "object") {
    for (const v of Object.values(obj)) {
      values = [...values, ...findDescendantByKey(v, key)];
    }
  }

  return values;
};

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
