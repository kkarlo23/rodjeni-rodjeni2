
import {
  faEnvelope,
  faLock,
  faUser,
  faEye,
  faPhone,
  faSignature,
  faEyeSlash,
  faClose,
  faCalendar,
  faCode
} from "@fortawesome/free-solid-svg-icons";
import { routes } from "../routes";

export const forms = {
    login: {
        header: {
            title: "Login",
          },
          formFields: [
            {
              id: 1,
              frontendSlug: "username",
              placeholder: "Enter your username...",
              name: "username",
              type: "text",
              required: true,
              fieldIcon: faEnvelope
            },
            {
              id: 2,
              frontendSlug: "password",
              placeholder: "Enter your password...",
              name: "password",
              type: "password",
              required: true,
              fieldIcon: faLock,
              typeIcons: {
                password: faEyeSlash,
                text: faEye
              }
            },
          ],
          button: {
            title: "Log In",
                  type: "submit"
          },
          link: 
            {
              label: "Not Registered?",
              labelWithLink: "Create an account!",
              linkRoute: "/registration",
            },
    },
    registration: {
        header: {
            title: "Registration",
          },
          formFields: [
            {
                id: 1,
                frontendSlug: "username",
                placeholder: "Enter your username...",
                name: "username",
                type: "text",
                required: true,
                fieldIcon: faUser
              },
              {
                id: 2,
                frontendSlug: "email",
                placeholder: "Enter your email...",
                name: "email",
                type: "email",
                required: true,
                fieldIcon: faEnvelope
              },
              {
                id: 3,
                frontendSlug: "password",
                placeholder: "Enter your password...",
                name: "password",
                type: "password",
                required: true,
                inputType: "textInput",
                fieldIcon: faLock,
                typeIcons: {
                  password: faEyeSlash,
                  text: faEye
                }
              },
              {
                id: 4,
                frontendSlug: "confirmPassword",
                placeholder: "Confirm your password...",
                name: "confirmPassword",
                type: "password",
                required: true,
                fieldIcon: faLock,
                typeIcons: {
                  password: faEyeSlash,
                  text: faEye
                }
              },
              {
                id: 5,
                frontendSlug: "fullName",
                placeholder: "Enter your full name...",
                name: "fullName",
                type: "text",
                required: true,
                fieldIcon: faSignature
              },
              {
                id: 6,
                frontendSlug: "phone",
                placeholder: "Enter your phone number...",
                name: "phone",
                type: "number",
                required: true,
                fieldIcon: faPhone
              },
          ],
          button: {
            title: "Register",
            type: "submit"
          },
          link:
            {
              label: "Already have an account?",
              labelWithLink: "Log In!",
              linkRoute: "/login",
            }
    },
    jobs: {
      header: {
        logo: {
             icon: faCode
        },
        buttons: [
          {
            id: 1,
            frontendSlug: "createJob",
            title: "Create Job",
            openModal: true
          },
          {
            id: 2,
            frontendSlug: "profile",
            title: "Profile",
            openModal: true
          },
          {
            id: 3,
            frontendSlug: "logout",
            title: "Logout",
          }
        ]
      },
      calendarButton: {
        title: "Open Calendar",
        icon: faCalendar
      },
      filter: {
        inputs: [
          {
            id: 1,
            frontendSlug: "zupanija",
            title: "Županija",
            type: "select",
            options: [

            ]
          },
          {
            id: 2,
            frontendSlug: "grad",
            title: "Grad",
            type: "select",
            options: [

            ]
          },
          {
            id: 3,
            frontendSlug: "kategorija",
            title: "Kategorija",
            type: "select",
            options: [

            ]
          },
          {
            id: 4,
            frontendSlug: "keyword",
            title: "Keyword",
            type: "text",
          }
        ]
      },
      calendar: {
        closeIcon: faClose
      },
      createJob: {
        closeIcon: faClose
      },
      profile: {
        closeIcon: faClose
      }
    }
}