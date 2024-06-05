export default async function getJSON(URL) {
  try {
    console.log(URL);

    const res = await fetch(URL);

    if (!res.ok) throw new Error("Network Error");
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(e);
  }
}
