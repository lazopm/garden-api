import AWS from 'aws-sdk';
import { get, create, getList } from './garden';
import { wrap } from '../util';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const getGarden = wrap(get, dynamoDB);
export const createGarden = wrap(create, dynamoDB);
export const getGardenList = wrap(getList, dynamoDB);
