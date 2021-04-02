import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Account.scss";

interface AttributesProps {
  userAttributes: CognitoUserAttribute[];
}

const findAttribute = (userAttributes: CognitoUserAttribute[], Name: string) => (
  userAttributes.find((attr) => attr.Name === Name)
)

const Attributes = ({ userAttributes }: AttributesProps) => {
  const name = findAttribute(userAttributes, 'name')?.Value;
  const familyName = findAttribute(userAttributes, 'family_name')?.Value
  const email = findAttribute(userAttributes, 'email')?.Value
  return (
    <div className="account__name">
      <h3>{name} {familyName}</h3>
      <p>{email}</p>
    </div>
    );
};

const Account = () => {
  const { userAttributes } = useContext(AuthContext);
  return (
    <div className="account layout__content ">
      <h1>Account info</h1>
      {userAttributes && <Attributes userAttributes={userAttributes} />}
    </div>
  );
};

export default Account;
