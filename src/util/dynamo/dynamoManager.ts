import { DynamoDB } from 'aws-sdk';
import { APIGatewayProxyResult } from 'aws-lambda';
import { errorResponse, okResponse } from '../response';
import { BatchWriteItemInput, WriteRequest } from 'aws-sdk/clients/dynamodb';

export const saveUser = (dynamo: DynamoDB, users: WriteRequest[]): Promise<APIGatewayProxyResult> => {
	const batchData: BatchWriteItemInput = {
		RequestItems: {
			Users: users
		}
	}

	return dynamo.batchWriteItem(batchData).promise()
		.then(() => okResponse('Data saved!'))
		.catch(err => errorResponse(err, 500))
}
