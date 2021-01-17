import { MessageBodyAttributeMap, SendMessageRequest } from 'aws-sdk/clients/sqs';
import { APIGatewayProxyResult } from 'aws-lambda';
import { errorResponse, okResponse } from '../response';
import { SQS } from 'aws-sdk';

export const sendBatch = (sqs: SQS, data: MessageBodyAttributeMap, type: string): Promise<APIGatewayProxyResult> => {
	const message: SendMessageRequest = {
		MessageAttributes: data,
		MessageBody: type,
		QueueUrl: process.env.SQS_URL
	}

	const newSQSMessage = sqs.sendMessage(message).promise()

	return newSQSMessage
		.then(() => okResponse('Message sent!'))
		.catch(reason => errorResponse(reason, 500))
}
