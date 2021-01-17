import { MessageBodyAttributeMap } from 'aws-sdk/clients/sqs';
import * as faker from 'faker';

export function generateUser(): MessageBodyAttributeMap {
	return {
		Id: {
			DataType: 'String',
			StringValue: faker.random.uuid()
		},
		FirstName: {
			DataType: 'String',
			StringValue: faker.name.firstName()
		},
		LastName: {
			DataType: 'String',
			StringValue: faker.name.lastName()
		},
		Email: {
			DataType: 'String',
			StringValue: faker.internet.email()
		},
	} as MessageBodyAttributeMap
}
