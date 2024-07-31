import Jobs from "../store/Jobs.js";

export function toggleBookmark(id) {
  const newJobs = Jobs.jobs.map((job) => {
    if (job.id == id) {
      return {
        ...job,
        bookmarked: !job?.bookmarked,
      };
    } else {
      return job;
    }
  });

  Jobs.setJobs(newJobs);
}

export function isBookmarked(id) {

  return Jobs.jobs.some((job) => job.id == id && job.bookmarked);
}
