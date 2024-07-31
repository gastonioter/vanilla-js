export async function loadJobs(query) {
  const res = await fetch(
    `https://bytegrad.com/course-assets/js/2/api/jobs?search=${query}`
  );

  const data = await res.json();

  return data;
}

export function findJobById() {
  const cache = {};

  return async function (id) {
    if (cache[id]) return cache[id];

    const res = await fetch(
      `https://bytegrad.com/course-assets/js/2/api/jobs/${id}`
    );

    if (!res.ok) {
      return false;
    }
    const { jobItem: job } = await res.json();

    console.log(job);

    cache[id] = job;

    return cache[id];
  };
}
