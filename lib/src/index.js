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
    result = result[key];
    return find(result, rest);
  } else {
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
