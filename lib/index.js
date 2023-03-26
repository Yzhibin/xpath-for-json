const getNext = (jsonPath) => {
  const [_, next, ...rest] = jsonPath.split("/");
  return ["/" + next, "/" + rest.join("/")];
};

console.log(getNext("/child::class"));
