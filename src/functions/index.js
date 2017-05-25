import AWS from 'aws-sdk';
import { wrap } from '../util';
import * as garden from './garden';
import * as sensorData from './sensorData';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const getGarden = wrap(garden.get, dynamoDB);
export const createGarden = wrap(garden.create, dynamoDB);
export const getGardenList = wrap(garden.getList, dynamoDB);

export const getSensorData = wrap(sensorData.get, dynamoDB);
export const postSensorData = wrap(sensorData.post, dynamoDB);
