export async function loadJobs(query) {
  const res = await fetch(
    `https://bytegrad.com/course-assets/js/2/api/jobs?search=${query}`
  );

  const data = await res.json();

  return data;
}

export async function findJobById(id) {
  const res = await fetch(
    `https://bytegrad.com/course-assets/js/2/api/jobs/${id}`
  );

  const { jobItem: job } = await res.json();
  return job;
}
