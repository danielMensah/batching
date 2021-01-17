import { APIGatewayProxyResult } from 'aws-lambda';
import { AWSError } from 'aws-sdk';

export function okResponse(data: string): APIGatewayProxyResult {
	return {
		statusCode: 200,
		body: data
	}
}

export function errorResponse(error: AWSError, statusCode?: number): APIGatewayProxyResult {
	return {
		statusCode: statusCode || error.statusCode,
		body: error.message
	}
}
