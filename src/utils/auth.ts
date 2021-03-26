import {
  AuthenticationDetails,
  CognitoUser,
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
    currentUser.getSession(
      (err: Error, session: CognitoUserSession | null) => {
        if (session) {
          resolve(session)
        }
        reject(err)
      }
    );
  });
};

export const signup = async (
  email: string,
  password: string
): Promise<ISignUpResult> => {
  return new Promise<ISignUpResult>((resolve, reject) => {
    cognitoUserPool.signUp(email, password, [], [], (err, res) => {
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
        console.error("Could not change password", err);
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

export const checkSession = async (cognitoUserSession: CognitoUserSession) => {
  return cognitoUserSession.isValid();
};
