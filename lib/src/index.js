export const find = (json, jsonPath) => {
  if (jsonPath === "/") return json;

  if (typeof json === "string") {
    try {
      json = JSON.parse(json);
    } catch (e) {
      throw new Error("Failed to parse JSON");
    }
  }

  if (!jsonPath) return json;

  let result = json;

  const [next, rest] = getNext(jsonPath);
  if (next.startsWith("/child::")) {
    const key = getKey(next);
    if (Array.isArray(result)) {
      result = result.map((x) => x[key]);
    } else {
      result = result[key];
    }
    return find(result, rest);
  } else if (next.startsWith("/descendant::")) {
    result = findDescendantByKey(result, getKey(next));
  }

  return result;
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
