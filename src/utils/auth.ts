import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserSession,
  ISignUpResult,
} from "amazon-cognito-identity-js";
import cognitoUserPool from "../cognitoConfig";

export const getCurrentUser = (): CognitoUser | null => {
  return cognitoUserPool.getCurrentUser();
};

export const getCognitoUser = (Username: string): CognitoUser => {
  const userPool = {
    Username,
    Pool: cognitoUserPool,
  };
  return new CognitoUser(userPool);
};

export const getUserSession = (
  currentUser: CognitoUser
): Promise<CognitoUserSession> => {
  return new Promise<CognitoUserSession>((resolve, reject) => {
    currentUser.getSession((err: Error, session: CognitoUserSession | null) => {
      if (session) {
        resolve(session);
      }
      reject(err);
    });
  });
};

export const getUserAttributes = async (
  user: CognitoUser
): Promise<CognitoUserAttribute[]> => {
  return new Promise((resolve, reject) => {
    user.getUserAttributes((err, res) => {
      if (res) {
        resolve(res);
      }
      reject(err);
    });
  });
};

export const signup = async (
  name: string,
  family_name: string,
  email: string,
  password: string
): Promise<ISignUpResult> => {
  return new Promise<ISignUpResult>((resolve, reject) => {
    const userAttributes: CognitoUserAttribute[] = [];
    userAttributes.push(
      new CognitoUserAttribute({
        Name: "name",
        Value: name,
      })
    );
    userAttributes.push(
      new CognitoUserAttribute({
        Name: "family_name",
        Value: family_name,
      })
    );
    cognitoUserPool.signUp(email, password, userAttributes, [], (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        if (res) {
          resolve(res);
          console.log(res);
        }
      }
    });
  });
};

export const confirmRegistration = (
  verificationCode: string,
  cognitoUser: CognitoUser
): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    cognitoUser.confirmRegistration(verificationCode, true, (err, res) => {
      if (err) {
        console.error("Could not confirm registration", err);
        reject(err);
      }
      console.log(res);
      resolve();
    });
  });
};

export const signIn = async (
  Username: string,
  Password: string
): Promise<CognitoUserSession> => {
  const authenticationDetails = new AuthenticationDetails({
    Username,
    Password,
  });

  const cognitoUser = getCognitoUser(Username);

  return new Promise<CognitoUserSession>((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (res) => {
        console.log(res);
        resolve(res);
      },
      onFailure: (err) => {
        console.log(err);
        reject(err);
      },
    });
  });
};

export const signOut = (cognitoUser: CognitoUser) => {
  cognitoUser.signOut();
};

export const changePassword = (
  cognitoUser: CognitoUser,
  oldPassword: string,
  newPassword: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    cognitoUser.changePassword(oldPassword, newPassword, (err, res) => {
      if (err) {
        console.error("Could not change password", err);
        reject(err);
      }
      console.log(res);
      resolve();
    });
  });
};

export const isValidSession = (cognitoUserSession: CognitoUserSession) => {
  return cognitoUserSession.isValid();
};
