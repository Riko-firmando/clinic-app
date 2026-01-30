import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./app/router";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "./lib/apollo-client";
import "./index.css";
import { AuthProvider } from "./app/context/AuthContext";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>,
);
