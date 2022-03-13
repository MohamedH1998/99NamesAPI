const firebase = require('../db');

const firestore = firebase.firestore();

// TODO: Add internal logger in catch blocks

/**
 * gets all names from the database
 * @param {Request} _ Request object (un-used)
 * @param {Response} res Response object
 */
const getAllNames = async (_, res) => {
  try {
    const names = await firestore.collection('Names').orderBy('id');
    const snapshot = await names.get();
    const list = snapshot.docs.map((docs) => docs.data());
    res.status(200).json(list);
  } catch (e) {
    res.status(400).json({
      message: 'Something went wrong with retrieving all the names',
      status: 400,
    });
  }
};

/**
 * gets a specific name from the database
 * @param {Request} req Request object
 * @param {Response} res Response object
 */
const getSpecificName = async (req, res) => {
  try {
    const { id } = req.params;
    const name = await firestore
      .collection('Names')
      .where('id', '==', parseInt(id, 10));
    const snapshot = await name.get();
    const data = snapshot.docs.map((docs) => docs.data());
    if (data.length === 0) {
      res.status(404).json({
        message: 'A name with that id does not seem to exist.',
        status: 404,
      });
    } else {
      res.status(200).json(data);
    }
  } catch (e) {
    res
      .status(400)
      .json({ message: 'Something seems to have gone wrong.', status: 400 });
  }
};

/**
 * gets a range of names from the database
 * @param {Request} req Request object
 * @param {Response} res Response object
 */
const getRange = async (req, res) => {
  try {
    const { id, id2 } = req.params;

    const name = await firestore
      .collection('Names')
      .where('id', '>=', parseInt(id, 10))
      .where('id', '<=', parseInt(id2, 10));

    const snapshot = await name.get();

    const data = snapshot.docs.map((docs) => docs.data());

    if (Number(id) > Number(id2)) {
      res.status(400).json(
        JSON.stringify({
          message: 'Start id cannot be larger than end id.',
          status: 400,
        }),
      );
    } else if (data.length === 0) {
      res.status(404).send().json({
        message: 'Names do not seem to exist within the given range of ids.',
        status: 404,
      });
    } else {
      res.status(200).json(data);
    }
  } catch (e) {
    res
      .status(400)
      .json({ message: 'Something seems to have gone wrong.', status: 400 });
  }
};

/**
 * get random name from firebase
 * @param {Request} _ request object (un-used)
 * @param {Response} res response object
 */
const getRandomName = async (_, res) => {
  try {
    const randomId = Math.floor(Math.random() * 100);

    const name = await firestore
      .collection('Names')
      .where('id', '==', parseInt(randomId, 10));

    const snapshot = await name.get();

    const data = snapshot.docs.map((docs) => docs.data());

    if (data.length === 0) {
      res.status(404).json({
        message: 'A name with that id does not seem to exist.',
        status: 404,
      });
    } else {
      res.status(200).json(data);
    }
  } catch (e) {
    res
      .status(400)
      .json({ message: 'Something seems to have gone wrong.', status: 400 });
  }
};

module.exports = {
  getAllNames,
  getSpecificName,
  getRandomName,
  getRange,
};
