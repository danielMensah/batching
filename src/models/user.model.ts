import { MessageBodyAttributeMap } from 'aws-sdk/clients/sqs';

export interface UserModel {
	Id?: string;
	FirstName?: string;
	LastName?: string;
	Email?: string;
}

export interface Record {
	messageId: string;
	receiptHandle: string;
	body: string;
	attributes: {
		ApproximateReceiveCount: string;
		SentTimestamp: string;
		SequenceNumber: string;
		MessageGroupId: string;
		SenderId: string;
		MessageDeduplicationId: string;
		ApproximateFirstReceiveTimestamp: string;
	},
	messageAttributes: MessageBodyAttributeMap,
	md5OfBody: string;
	eventSource: string;
	eventSourceARN: string;
	awsRegion: string;
}

export interface GatewayEvent {
	Records: Record[];
}
