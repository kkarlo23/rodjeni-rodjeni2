import { login, loginSchema, logout } from "./handlers/auth.js";
import { createJob, createJobSchema, deleteJob, updateWorkingHour, updateWorkingHourSchema } from "./handlers/jobs.js";
import { getNotifications } from "./handlers/notifications.js";
import { register, registerSchema } from "./handlers/register.js";
import { changePassword, changePasswordSchema, updateUserInfo, updateUserInfoSchema } from "./handlers/users.js";
import { checkAuth } from "./middlewares.js/checkAuth.js";
import { validatePayload } from "./middlewares.js/validator.js";

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
  app.post("/job", checkAuth(repository), validatePayload(createJobSchema), createJob(repository));
  app.post(
    "/job/:jobId/update-working-hour",
    checkAuth(repository),
    validatePayload(updateWorkingHourSchema),
    updateWorkingHour(repository)
  );
  app.delete("/job/:jobId", checkAuth(repository), deleteJob(repository));
}
