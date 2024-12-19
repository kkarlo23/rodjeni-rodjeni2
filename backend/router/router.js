import { login, loginSchema, logout } from "./handlers/auth.js";
import { getCategories } from "./handlers/categories.js";
import { getCounties } from "./handlers/counties.js";
import {
  addReviewSchema,
  addReviewToJob,
  createJob,
  createJobSchema,
  deleteJob,
  getJob,
  searchJobs,
  searchJobsSchema,
  updateWorkingHour,
  updateWorkingHourSchema,
} from "./handlers/jobs.js";
import { getMunicipalities } from "./handlers/municipalities.js";
import { getNotifications } from "./handlers/notifications.js";
import { register, registerSchema } from "./handlers/register.js";
import { completeReservation, createReservation, createReservationSchema, updateReservationStatus } from "./handlers/reservations.js";
import { changePassword, changePasswordSchema, updateUserInfo, updateUserInfoSchema } from "./handlers/users.js";
import { checkAuth } from "./middlewares.js/checkAuth.js";
import { validatePayload, validateQuery } from "./middlewares.js/validator.js";

export async function createRouter(app, repository) {
  // auth
  app.post("/login", validatePayload(loginSchema), login(repository));
  app.post("/logout", checkAuth(repository), logout());

  // users
  app.get("/notifications", checkAuth(repository), getNotifications(repository));
  app.post("/register", validatePayload(registerSchema), register(repository));
  app.post("/change-password", checkAuth(repository), validatePayload(changePasswordSchema), changePassword(repository));
  app.post("/update-info", checkAuth(repository), validatePayload(updateUserInfoSchema), updateUserInfo(repository));
  // app.post("/delete-account", checkAuth(repository), deleteUser(repository)); // TODO: add later

  // jobs
  app.get("/job/search", checkAuth(repository), validateQuery(searchJobsSchema), searchJobs(repository));
  app.get("/job/:jobId", checkAuth(repository), getJob(repository));
  app.post("/job", checkAuth(repository), validatePayload(createJobSchema), createJob(repository));
  app.post(
    "/job/:jobId/update-working-hour",
    checkAuth(repository),
    validatePayload(updateWorkingHourSchema),
    updateWorkingHour(repository)
  );
  app.delete("/job/:jobId", checkAuth(repository), deleteJob(repository));
  app.post("/job/:jobId/add-review", checkAuth(repository), validatePayload(addReviewSchema), addReviewToJob(repository));

  // reservations
  app.post("/reservation", checkAuth(repository), validatePayload(createReservationSchema), createReservation(repository));

  app.post("/reservation/:reservationId/accept", checkAuth(repository), updateReservationStatus(repository, true));
  app.post("/reservation/:reservationId/deny", checkAuth(repository), updateReservationStatus(repository, false));
  app.post("/reservation/:reservationId/complete", checkAuth(repository), completeReservation(repository));

  app.get("/counties", checkAuth(repository), getCounties(repository));
  app.get("/municipalities", checkAuth(repository), getMunicipalities(repository));
  app.get("/categories", checkAuth(repository), getCategories(repository));
}
