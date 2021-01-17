import { UserModel } from '../models/user.model';
import { MessageBodyAttributeMap } from 'aws-sdk/clients/sqs';
import { WriteRequest } from 'aws-sdk/clients/dynamodb';

export const userTransformer = (records: MessageBodyAttributeMap[]): UserModel[] => {
	const rawData = records.map(r => r.messageAttributes)

	const users: UserModel[] = []

	rawData.forEach(rawUser => {
		let user: UserModel = {}

		for (let key in rawUser) {
			if (rawUser.hasOwnProperty(key)) {
				user[key] = rawUser[key].StringValue
			}
		}

		users.push(user)
	})

	return users
}

export const prepareDataToSave = (records: MessageBodyAttributeMap[]): WriteRequest[] => {
	return records.map(r => {
			let data: WriteRequest = {
				PutRequest: {
					Item: {}
				}
			}

			for (let key in r) {
				if (r.hasOwnProperty(key)) {
					if (data.PutRequest.Item[key] === undefined) {
						data.PutRequest.Item[key] = {}
					}

					data.PutRequest.Item[key].S = r[key].StringValue
				}
			}

			return data
		}
	)
}


