import getJSON from "../utils/getJSON";

export function ApiServices(URL) {
  async function fetchResources(resource) {
    try {
      const data = getJSON(`${URL}/${resource}`);
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async function fetchResourceById(resource, id) {
    try {
      const data = getJSON(`${URL}/${resource}/${id}`);
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async function post(body) {}

  return {
    fetchResources,
    fetchResourceById,
    post,
  };
}
