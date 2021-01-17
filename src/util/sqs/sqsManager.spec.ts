import * as AWSMock from "aws-sdk-mock";
import * as AWS from "aws-sdk";
import { expect } from 'chai';
import { SendMessageRequest } from 'aws-sdk/clients/sqs';
import { generateUser } from '../dataGenerator';
import { sendBatch } from './sqsManager';

describe('sqsManager', () => {

	it('should check sendBatch existence', () => {

		expect(typeof sendBatch).equals('function')

	});

	it('should mock sendMessage', async () => {
		AWSMock.setSDKInstance(AWS)
		AWSMock.mock('SQS', 'sendMessage', (params: SendMessageRequest, callback: Function) => {
			callback(null, params)
		})

		const sqs = new AWS.SQS({ apiVersion: '2012-11-05' })

		const data = generateUser()

		const response = await sendBatch(sqs, data, 'test')

		expect(response.body).to.equal('Message sent!')
	});
})
