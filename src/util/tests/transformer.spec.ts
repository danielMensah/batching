import { expect } from 'chai'
import { generateUser } from '../dataGenerator';
import { prepareDataToSave } from '../transformer';

describe('transformer', () => {
	it('should prepare user data', () => {
		const user = generateUser()

		const transformedData = prepareDataToSave([user])[0]

		for (let key in transformedData.PutRequest.Item) {
			if (transformedData.PutRequest.Item.hasOwnProperty(key)) {
				expect(transformedData.PutRequest.Item[key].S).equal(user[key].StringValue)
			}
		}
	});
})
