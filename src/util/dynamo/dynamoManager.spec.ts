import * as AWSMock from "aws-sdk-mock";
import * as AWS from "aws-sdk";
import {expect} from 'chai'
import { saveUser } from './dynamoManager';
import { generateUser } from '../dataGenerator';
import { prepareDataToSave } from '../transformer';

describe('dynamoManager', () => {
	it('should check saveUser existence', () => {
		expect(typeof saveUser).equals('function')
	});

	it('should save user', async () => {
		AWSMock.setSDKInstance(AWS)
		AWSMock.mock('DynamoDB', 'batchWriteItem', (params, callback) => {
			callback(null, "successfully put item in database")
		})

		const dynamo = new AWS.DynamoDB({ apiVersion: '2012-11-05', region: process.env.REGION })

		const record = generateUser()

		const transformedRecord = prepareDataToSave([record])

		const response = await saveUser(dynamo, transformedRecord)

		expect(response.statusCode).equal(200)
		expect(response.body).equal('Data saved!')

		AWSMock.restore('DynamoDB')
	});
})
