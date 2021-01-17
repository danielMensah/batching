import { APIGatewayProxyResult } from 'aws-lambda';
import { prepareDataToSave } from '../../util/transformer';
import { saveUser } from '../../util/dynamo/dynamoManager';
import { GatewayEvent } from '../../models/user.model';
import * as AWS from 'aws-sdk';

AWS.config.update({ region: 'eu-west-2' })

const dynamo = new AWS.DynamoDB({ apiVersion: '2012-11-05', region: process.env.REGION })

const receivebullhorndata = async (event: GatewayEvent): Promise<APIGatewayProxyResult> => {
	const usersRawData = event.Records
		.filter(r => r.body === 'user')
		.map(r => r.messageAttributes)

	const users = prepareDataToSave(usersRawData)

	return saveUser(dynamo, users)
}

export default receivebullhorndata
