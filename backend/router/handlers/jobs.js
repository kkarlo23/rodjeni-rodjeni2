import Joi from "joi";

function mapWorkingHours(workingHours) {
  const workingHoursMap = {};
  for (const workingHour of workingHours) {
    if (!workingHoursMap[workingHour.day]) workingHoursMap[workingHour.day] = {};
    workingHoursMap[workingHour.day][workingHour.hour] = {
      available: workingHour.available,
      emergency: workingHour.emergency,
    };
  }

  return workingHoursMap;
}

export function getJob(repository) {
  return async (req, res) => {
    const query = req.query;
    const { session } = req;
    const { user_id } = session;
    const { jobId } = req.params;

    // create job
    const job = await repository.jobs.getJobById(jobId);

    const workingHours = await repository.workingHours.getWorkingHoursByJobId(job.id);

    const jobFull = { ...job, working_hours: mapWorkingHours(workingHours) };

    return res.status(200).send(jobFull);
  };
}

export const searchJobsSchema = Joi.object({
  category_id: Joi.number().integer().positive().optional(),
  county_id: Joi.number().integer().positive().optional(),
  municipality_id: Joi.number().integer().positive().optional(),
  keyword: Joi.string().optional(),
  user_id: Joi.number().integer().positive().optional(),
});

export function searchJobs(repository) {
  return async (req, res) => {
    const query = req.query;

    // create job
    const jobs = await repository.jobs.searchJobs({
      category_id: query.category_id,
      county_id: query.county_id,
      municipality_id: query.municipality_id,
      keyword: query.keyword,
      user_id: query.user_id,
    });

    return res.status(200).send(jobs);
  };
}

export const createJobSchema = Joi.object({
  description: Joi.string().min(3).required(),
  category_id: Joi.number().integer().positive().required(),
  municipality_id: Joi.number().integer().positive().required(),
});

export function createJob(repository) {
  return async (req, res) => {
    const { session, body } = req;
    const { user_id } = session;

    // create job
    const job = await repository.jobs.createJob({
      user_id: user_id,
      description: body.description,
      category_id: body.category_id,
      municipality_id: body.municipality_id,
    });

    const workingHours = await repository.workingHours.createWorkingHours(job.id);

    const jobFull = { ...job, working_hours: mapWorkingHours(workingHours) };

    return res.status(201).send(jobFull);
  };
}

export const addReviewSchema = Joi.object({
  score: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().optional(),
});

export function addReviewToJob(repository) {
  return async (req, res) => {
    const { session, body } = req;
    const { user_id } = session;
    const { jobId } = req.params;

    // create job
    const review = await repository.reviews.createReview({
      job_id: jobId,
      score: body.score,
      comment: body.comment,
    });

    // TODO: add notifications

    return res.status(201).send(review);
  };
}

export function deleteJob(repository) {
  return async (req, res) => {
    const { session } = req;
    const { user_id } = session;
    const { jobId } = req.params;

    const job = await repository.jobs.getJobById(jobId);

    if (job.user_id !== user_id) return res.sendStatus(403);

    await repository.workingHours.deleteWorkingHoursByJobId(job.id);
    await repository.jobs.deleteJobById(job.id);

    // TODO: add notifications

    return res.sendStatus(200);
  };
}

export const updateWorkingHourSchema = Joi.object({
  day: Joi.number().integer().positive().required(),
  hour: Joi.number().integer().positive().required(),
  available: Joi.boolean().required(),
  emergency: Joi.boolean().required(),
});

export function updateWorkingHour(repository) {
  return async (req, res) => {
    const { body } = req;
    const { jobId } = req.params;
    const { user_id } = session;

    const job = await repository.jobs.getJobById(jobId);

    if (job.user_id !== user_id) return res.sendStatus(403);

    const updated = await repository.workingHours.updateWorkingHour({
      jobId,
      day: body.day,
      hour: body.hour,
      available: body.available,
      emergency: body.emergency,
    });

    if (!updated) return res.sendStatus(202);
    return res.sendStatus(200);
  };
}
