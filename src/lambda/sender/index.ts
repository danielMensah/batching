import * as AWS from 'aws-sdk';
import { APIGatewayProxyResult } from 'aws-lambda';
import { sendBatch } from '../../util/sqs/sqsManager';
import { generateUser } from '../../util/dataGenerator';

AWS.config.update({ region: 'eu-west-2' })

const sqs = new AWS.SQS({ apiVersion: '2012-11-05' })

const sendbullhorndata = async (): Promise<APIGatewayProxyResult> => {
	const user = generateUser()

	return sendBatch(sqs, user, 'user')
}

export default sendbullhorndata
