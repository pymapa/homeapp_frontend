import { CognitoUserPool } from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';

export const USER_POOL_ID = process.env.REACT_APP_USER_POOL_ID || ''
export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID || ''
export const REGION = process.env.REACT_APP_AWS_REGION || ''


AWS.config.update({
  region: REGION
})


const poolData = {
  UserPoolId: USER_POOL_ID,
  ClientId: CLIENT_ID
}

const cognitoUserPool = new CognitoUserPool(poolData);

// export const USER_POOL_URL = `cognito-idp.ap-southeast-2.amazonaws.com/${USER_POOL_ID}`
export default cognitoUserPool;