const firebase = require('../db');

const firestore = firebase.firestore();

/**
 * gets all names from the database
 * @param {Request} req Request object
 * @param {Response} res Response object
 */
const getAllNames = async (_, res) => {
  try {
    const names = await firestore.collection('Names').orderBy('id');
    const snapshot = await names.get();
    const list = snapshot.docs.map((docs) => docs.data());
    res.send(list);
  } catch (e) {
    res.status(400).send('Something went wrong with retrieving all the names');
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
      res
        .status(400)
        .send('A name with that id does not seem to exist unfortunately');
    } else {
      res.send(data);
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
};

/**
 * gets a range of names from the database
 * @param {Request} req Request object
 * @param {Response} res Response object
 */
const getRange = async (req, res) => {
  try {
    const { id } = req.params;

    const { id2 } = req.params;

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
        message: 'A name with that id does not seem to exist.',
        status: 404,
      });
    } else {
      // format of response should be { name: 'english name', arabicName: 'arabic', status: 200 }
      res.status(200).json(data);
    }
  } catch (e) {
    res.status(400).send(e.message);
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
      res.send(data);
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
};

module.exports = {
  getAllNames,
  getSpecificName,
  getRandomName,
  getRange,
};
