import getJSON from "../utils/getJSON";

export function ApiServices(URL) {
  async function fetchResources(resource) {
    const res = await fetch(`${URL}/${resource}`);
    const data = await res.json();

    if (!res.ok) throw new Error(res.description);

    return data;
  }

  async function fetchResourceById(resource, id) {
    const res = await fetch(`${URL}/${resource}/${id}`);
    const data = await res.json();

    if (!res.ok) throw new Error(res.description);

    return data;
  }

  return {
    fetchResources,
    fetchResourceById,
  };
}
