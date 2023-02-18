import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import app from "./app";

const auth = getAuth(app);

const createWithEmail = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password)
    .then((data) => {
      const { user = {} } = data;
      console.log(user);
      return {
        message: "User created successfully",
        statusCode: 1200,
        status: "success",
        data: {
          accessToken: user.accessToken,
          email: user.email,
          emailVerified: user.emailVerified,
          uid: user.uid,
        },
      };
    })
    .catch((error) => {
      console.log("Failed to create user", error);
      return {
        errorCode: error.code,
        errorMessage: error.message,
        message: "User not created",
        status: "error",
        statusCode: 1500,
        data: {},
      };
    });
};

const createMethods = {
  email: createWithEmail,
  default: () => {
    return {
      message: "User Not Created",
      status: "error",
      data: {},
    };
  },
};

const create = async (email, password, method = "email") => {
  return (
    (await createMethods[method](email, password)) || createMethods.default()
  );
};

const signIn = async (email, password) => {
  //TODO: Sign In Method
  return await signInWithEmailAndPassword(auth, email, password)
    .then((data) => {
      console.log("user credential", data);
      const { user = {} } = data;
      return {
        message: "User Signed In",
        status: "success",
        data: {
          accessToken: user.accessToken,
          email: user.email,
          emailVerified: user.emailVerified,
          uid: user.uid,
        },
      };
    })
    .catch((error) => {
      console.log("Failed to create user", error);
      return {
        errorCode: error.code,
        errorMessage: error.message,
        message: "User not created",
        status: "error",
        data: {},
      };
    });
};

const signOut = () => {
  //TODO: Sign Out Method
};

const userState = async () => {
  let data = {};
  await onAuthStateChanged(auth, (user) => {
    if (!user) {
      data = { data: {}, message: "User not logged in" };
    } else {
      const { accessToken, email, emailVerified, uid } = user;
      data = {
        message: "User logged in",
        data: {
          accessToken,
          email,
          emailVerified,
          uid,
        },
      };
    }
  });
};

export { create, signIn, signOut, userState };
