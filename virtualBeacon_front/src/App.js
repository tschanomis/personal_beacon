import { useState } from 'react';
import { CookiesProvider } from "react-cookie";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './screens/Home';
import Dashboard from './screens/Dashboard';
import PasswordReset from './components/PasswordReset';

import Map from './components/Map';
import Stats from './components/Stats';

import './App.css';

export default function App() {

  const [manageAppAlert, setManageAppAlert] = useState({ alert: false, message: 'default' })

  const handleAlert = (msg) => {
    setManageAppAlert({ ...manageAppAlert, alert: true, message: msg })
    setTimeout(() => {
      setManageAppAlert({ ...manageAppAlert, alert: false })
    }, 2000);
  }

  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          path: "",
          element: <Home alert={handleAlert} />
        },
        {
          path: "password",
          element: <PasswordReset alert={handleAlert} />,
        },
        {
          path: "dashboard",
          element: <Dashboard alert={handleAlert} />,
          // loader: ({ request }) =>
          //   fetch("/api/dashboard.json", {
          //     signal: request.signal,
          //   }),
          children: [
            {
              path: "",
              element: <Map />
            },
            {
              path: "import",
              element: <>import</>
            },
            {
              path: "stats",
              element: <Stats />
            }
          ]
        },
        // {
        //   element: <AuthLayout />,
        //   children: [
        //     {
        //       path: "login",
        //       element: <Login />,
        //       loader: redirectIfUser,
        //     },
        //     {
        //       path: "logout",
        //       action: logoutUser,
        //     },
        //   ],
        // },
      ],
    },
  ]);

  return (
    <div className="App">
      <div>
        <CookiesProvider>
          <RouterProvider router={router} />
          {/* <Router>
            <Routes>
              <Route path="/dashboard" element={<Dashboard alert={handleAlert} />} />
              <Route path="/password" element={<PasswordReset alert={handleAlert} />} />
              <Route exact path="/" element={<Home alert={handleAlert} />} />
            </Routes>
          </Router> */}
        </CookiesProvider>
      </div>
      {manageAppAlert.alert && <div className="App-alert">{manageAppAlert.message}</div>}
    </div>
  );
}