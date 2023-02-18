import { createContext } from "react";

const UserContext = createContext({
  status: "no-session",
  data: {},
});

export default UserContext;
