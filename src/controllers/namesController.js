import {
  getNamesFromDb,
  getNamesInRange,
  getRandomNameFromDb,
  getSpecificNameFromDb,
} from '../../db.js';
import createLogger from '../utils/logger.js';

const logger = createLogger('names-service-controller');

// TODO: Add internal logger in catch blocks

/**
 * gets all names from the database
 * @param {Request} _ Request object (un-used)
 * @param {Response} res Response object
 */
export const getAllNames = async (_, res) => {
  try {
    logger.warn('attempting to get results from database');
    const result = await getNamesFromDb();

    if (!result) {
      logger.error('could not find names from database');
      res.status(400).json({
        message: 'Something went wrong retrieving all the names',
        status: 400,
      });
      return;
    }

    logger.info('returning names from database');
    res.status(200).json(result);
    logger.info('Successfully returned results');
  } catch (e) {
    logger.error(e);
    res.status(500).json({
      message: 'Something went seriously wrong getting all the names.',
      status: 500,
    });
  }
};

/**
 * gets a specific name from the database
 * @param {Request} req Request object
 * @param {Response} res Response object
 */
export const getSpecificName = async (req, res) => {
  try {
    const { id } = req.params;
    logger.warn('attempting to get results from database');
    const data = await getSpecificNameFromDb(id);

    if (data.length === 0) {
      logger.error(`A name with the given id of ${id} does not exist`);
      res.status(404).json({
        message: 'A name with that id does not seem to exist.',
        status: 404,
      });
    } else {
      logger.info('returning name from database');
      res.status(200).json(data);
      logger.info('Successfully returned results');
    }
  } catch (e) {
    logger.error(e);
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
export const getRange = async (req, res) => {
  try {
    const { id, id2 } = req.params;

    logger.warn('attempting to get results from database');
    const data = await getNamesInRange(id, id2);

    if (Number(id) > Number(id2)) {
      logger.error('Starting range cannot be larger than ending range');
      res.status(400).json(
        JSON.stringify({
          message: 'Start id cannot be larger than end id.',
          status: 400,
        }),
      );
    } else if (data.length === 0) {
      logger.error('could not find names within the given range');
      res.status(404).send().json({
        message: 'Names do not seem to exist within the given range of ids.',
        status: 404,
      });
    } else {
      logger.info('returning names from database');
      res.status(200).json(data);
      logger.info('Successfully returned results');
    }
  } catch (e) {
    logger.error(e);
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
export const getRandomName = async (_, res) => {
  try {
    logger.warn('attempting to get results from database');
    const data = await getRandomNameFromDb();

    if (data.length === 0) {
      logger.error('could not return a random name from the database.');
      res.status(404).json({
        message: 'No names exist.',
        status: 404,
      });
    } else {
      logger.info('returning a random name from database');
      res.status(200).json(data);
      logger.info('Successfully returned results');
    }
  } catch (e) {
    res
      .status(400)
      .json({ message: 'Something seems to have gone wrong.', status: 400 });
  }
};
