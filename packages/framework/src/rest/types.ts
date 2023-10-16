interface DiscordApiError {
	[key: string]: string[];
}

export interface ErroredAPIResponse {
	code: number;
	errors: DiscordApiError;
	message: string;
}

export type Method = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';
