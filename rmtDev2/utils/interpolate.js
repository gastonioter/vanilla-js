export function interpolate(str, params) {
  let names = Object.keys(params);
  let values = Object.values(params);
  return new Function(...names, `return \`${str}\`;`)(...values);
}
