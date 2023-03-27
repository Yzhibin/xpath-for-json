export const find = (json, jsonPath) => {
  if (jsonPath === "/") return json;

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
    if (Array.isArray(result)) {
      result = result.map((x) => x[key]);
    } else {
      result = result[key];
    }
    return doFind(result, rest, curr);
  }

  if (next.startsWith("/descendant::")) {
    return findDescendantByKey(result, getKey(next));
  }

  if (next.startsWith("/parent::")) {
    return parent;
  }
};

const getNext = (jsonPath) => {
  const [_, next, ...rest] = jsonPath.split("/");
  return ["/" + next, "/" + rest.join("/")];
};

const getKey = (token) => {
  const [_, key] = token.split("::");
  return key;
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
