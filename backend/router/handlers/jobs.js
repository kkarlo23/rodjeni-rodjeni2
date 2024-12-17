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
