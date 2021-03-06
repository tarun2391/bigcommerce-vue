import jwt from 'jsonwebtoken';
import { getCustomer, setCustomer } from '../storage';
const { v4: uuidv4 } = require('uuid');

export const setUser = (user) => {
  if (user) {
    const {
      id,
      groupId,
      email,
      firstName,
      lastName,
      company,
      notes,
      phone,
      taxExemptCategory,
      addressCount,
      attributeCount,
      storeCredit
    } = user;
    const secureData = jwt.sign(
      {
        id,
        groupId
      },
      process.env.jwtSecret
    );
    user = {
      email,
      firstName,
      lastName,
      company,
      notes,
      phone,
      taxExemptCategory,
      addressCount: addressCount !== 0 ? addressCount : '',
      attributeCount: attributeCount !== 0 ? attributeCount : '',
      storeCredit: storeCredit[0],
      secureData
    };
  }
  setCustomer(user);
  return user;
};

export const getUser = () => {
  const user = getCustomer();
  if (typeof window !== 'undefined' && user && user !== 'null') {
    return JSON.parse(user);
  }
  return null;
};

export const getSecuredData = (secureData) => {
  const data = jwt.verify(secureData, process.env.jwtSecret);
  return data;
};

export const getCartCheckoutRedirectUrl = (url) => {
  const user = getUser();
  if (!user || typeof user?.secureData === 'undefined') {
    return url;
  } else {
    const loggedInCustomerData = getSecuredData(user.secureData);
    const dateCreated = Date.parse(new Date().toGMTString()) / 1000;

    const payload = {
      iss: process.env.apiClientId,
      iat: dateCreated,
      jti: uuidv4(),
      operation: 'customer_login',
      store_hash: process.env.storeHash,
      customer_id: loggedInCustomerData.id,
      redirect_to: url
    };

    // The JWT token must be signed by the BC API Secret
    const token = jwt.sign(payload, process.env.apiSecret, {
      algorithm: 'HS256'
    });
    const loginUrl = `${process.env.baseUrl}/login/token/${token}`;
    return loginUrl;
  }
};
