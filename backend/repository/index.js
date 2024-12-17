import { Jobs } from "./jobs.js";
import { Notifications } from "./notifications.js";
import { Sessions } from "./sessions.js";
import { Users } from "./users.js";
import { WorkingHours } from "./workingHours.js";

export function createRepository(db) {
  return {
    users: new Users(db),
    jobs: new Jobs(db),
    sessions: new Sessions(db),
    notifications: new Notifications(db),
    workingHours: new WorkingHours(db),
  };
}
