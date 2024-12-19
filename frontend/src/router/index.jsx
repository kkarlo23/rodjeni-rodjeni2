import { createBrowserRouter } from 'react-router';

import React from 'react';

import { routes } from '../routes';

import Form from '../components/form';
import Error from '../components/error';
import Jobs from "../components/jobs"


export const router = createBrowserRouter([
  {
    path: routes?.client?.login,
    element: <Form component={"login"}/>,
  },
  {
    path: routes?.client?.registration,
    element: <Form component={"registration"}/>,
  },
  {
    path: routes?.client?.jobs,
    element: <Jobs/>
  },
  {
    path: "*",
    element: <Error />,
  },
]);