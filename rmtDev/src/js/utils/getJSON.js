export default async function getJSON(URL) {
  try {
    const res = await fetch(URL);
    if (!res.ok) throw new Error("Network Error");
    const data = await response.json();
    return data;
  } catch (e) {
    throw new Error(e);
  }
}
