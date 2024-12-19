export const routes = {
    client: {
        root: "/",
        login: "/login",
        registration: "/registration",
        jobs: "/jobs",
    },
    server: {
        root: "http://localhost:3000",
        auth: {
          login: "/login",
          logout: "/logout"
        },
        users: {
            notifications: "/notifications",
            register: "/register",
            changePassword: "/change-password",
            updateInfo: "/update-info"
        },
        jobs: {
          job: "/job",
          updateWorkingHour: "/update-working-hour",
          addReview: "/add-review"
        },
        reservations: {
            reservation: "/reservation",
            accept: "/accept",
            deny: "/deny",
            complete: "/complete",
        },
        filter: {
            counties: "/counties",
            municipalities: "/municipalities",
            categories: "/categories"
        }
    }
}