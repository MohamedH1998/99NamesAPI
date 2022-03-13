import firebase from 'firebase';
import { config } from 'dotenv';

config();

const logger = console;

const {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} = process.env;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

const db = firebase.initializeApp(firebaseConfig).firestore();

export const getNamesFromDb = async () => {
  let list = [];
  try {
    const result = db.collection('Names').orderBy('id');
    const snapshot = await result.get();
    list = snapshot.docs.map((docs) => docs.data());
  } catch (err) {
    logger.error(err);
  }

  return list;
};

export const getSpecificNameFromDb = async (id) => {
  let data = [];
  try {
    const name = db.collection('Names').where('id', '==', parseInt(id, 10));
    const snapshot = await name.get();
    data = snapshot.docs.map((docs) => docs.data());
  } catch (e) {
    logger.error(e);
  }
  return data;
};

export const getNamesInRange = async (startIndx, endIndx) => {
  let data = [];

  try {
    const names = db
      .collection('Names')
      .where('id', '>=', parseInt(startIndx, 10))
      .where('id', '<=', parseInt(endIndx, 10));

    const snapshot = await names.get();

    data = snapshot.docs.map((docs) => docs.data());
  } catch (e) {
    logger.error(e);
  }

  return data;
};

export const getRandomNameFromDb = async () => {
  let data = [];
  try {
    const randomId = Math.floor(Math.random() * 100);

    const name = db
      .collection('Names')
      .where('id', '==', parseInt(randomId, 10));

    const snapshot = await name.get();

    data = snapshot.docs.map((docs) => docs.data());
  } catch (e) {
    logger.error(e);
  }
  return data;
};
