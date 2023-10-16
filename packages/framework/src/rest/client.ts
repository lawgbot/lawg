import { URL } from 'node:url';
import { DISCORD_USER_AGENT } from '..';
import type { Method, ErroredAPIResponse } from './types';

export interface APIClientOptions {
	readonly token: string;
	readonly userAgent?: string;
}

export class RESTClient {
	public constructor(public options: APIClientOptions) {
		this.options = {
			userAgent: options.userAgent ?? DISCORD_USER_AGENT,
			token: options.token,
		};
	}

	public async get<T extends Record<string, any>>(path: string, query?: Record<string, number | string | undefined>) {
		return this.request<T>('GET', path, undefined, query);
	}

	public async post<T extends Record<string, any>>(
		path: string,
		body: unknown,
		query?: Record<string, number | string | undefined>,
	) {
		return this.request<T>('POST', path, body, query);
	}

	public async put<T extends Record<string, any>>(
		path: string,
		body: unknown,
		query?: Record<string, number | string | undefined>,
	) {
		return this.request<T>('PUT', path, body, query);
	}

	public async patch<T extends Record<string, any>>(
		path: string,
		body: unknown,
		query?: Record<string, number | string | undefined>,
	) {
		return this.request<T>('PATCH', path, body, query);
	}

	public async delete<T extends Record<string, any>>(
		path: string,
		query?: Record<string, number | string | undefined>,
	) {
		return this.request<T>('DELETE', path, undefined, query);
	}

	public async raw<T extends Record<string, any>>(request: Request) {
		request.headers.set('Authorization', `Bearer ${this.options.token}`);
		if (this.options.userAgent) request.headers.set('User-Agent', this.options.userAgent);

		return this.executeRequest<T>(request);
	}

	private async executeRequest<T extends Record<string, any>>(request: Request): Promise<T> {
		const response = await fetch(request, {
			keepalive: true,
		});

		if (response.status === 204 || !response.headers.get('Content-Type')?.includes('application/json')) {
			return undefined as unknown as T;
		}

		const result = await (response.json() as Promise<T>).catch((error: Error): ErroredAPIResponse => {
			return {
				code: response.status,
				errors: {
					'0': [error.message],
				},
				message: 'Local client error',
			};
		});

		if ('errors' in result) {
			throw new Error(result.message);
		}

		return result;
	}

	private async request<T extends Record<string, any>>(
		method: Method,
		path: string,
		body: unknown,
		query: Record<string, number | string | undefined> = {},
		init: RequestInit = {},
	) {
		const url = new URL(`https://discord.com/api/v10${path}`);

		for (const [key, value] of Object.entries(query)) {
			if (value) {
				url.searchParams.append(key, value.toString());
			}
		}

		const headers = new Headers({
			...init?.headers,
			Authorization: `Bot ${this.options.token}`,
		});

		if (this.options.userAgent) headers.set('User-Agent', this.options.userAgent);

		if (body !== undefined) {
			if (method === 'GET') {
				throw new Error('Cannot send a GET request with a body');
			}

			headers.set('Content-Type', 'application/json');
		}

		const request = new Request(url, {
			method,
			body: body ? JSON.stringify(body) : null,
			headers,
			...init,
		});

		return this.executeRequest<T>(request);
	}
}
