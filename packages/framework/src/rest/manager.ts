import { URL, URLSearchParams } from 'node:url';
import { DISCORD_API_URL } from '@lawgbot/utils';
import { DISCORD_USER_AGENT } from '..';
import type { Method } from './types';

export interface RESTManagerOptions {
	readonly token: string;
	readonly userAgent?: string;
}

type RequestResponse = Record<string, any>;

export class RESTManager {
	public constructor(public options: RESTManagerOptions) {
		this.options = {
			userAgent: options.userAgent ?? DISCORD_USER_AGENT,
			token: options.token,
		};
	}

	public async get<T extends RequestResponse>(path: string, query?: Record<string, number | string | undefined>) {
		return this.request<T>('GET', path, undefined, query);
	}

	public async post<T extends RequestResponse>(
		path: string,
		body: unknown,
		query?: Record<string, number | string | undefined>,
	) {
		return this.request<T>('POST', path, body, query);
	}

	public async put<T extends RequestResponse>(
		path: string,
		body: unknown,
		query?: Record<string, number | string | undefined>,
	) {
		return this.request<T>('PUT', path, body, query);
	}

	public async patch<T extends RequestResponse>(
		path: string,
		body: unknown,
		query?: Record<string, number | string | undefined>,
	) {
		return this.request<T>('PATCH', path, body, query);
	}

	public async delete<T extends RequestResponse>(path: string, query?: Record<string, number | string | undefined>) {
		return this.request<T>('DELETE', path, undefined, query);
	}

	public async raw<T extends RequestResponse>(request: Request) {
		request.headers.set('Authorization', `Bearer ${this.options.token}`);
		if (this.options.userAgent) request.headers.set('User-Agent', this.options.userAgent);

		return this.executeRequest<T>(request);
	}

	private async executeRequest<T extends RequestResponse>(request: Request): Promise<T> {
		const response = await fetch(request, {
			keepalive: true,
		});

		if (response.status === 204 || !response.headers.get('Content-Type')?.includes('application/json')) {
			return undefined as unknown as T;
		}

		const result = await (response.json() as Promise<T>).catch((error: Error): never => {
			throw new Error(`${error.message} - ${response.status} ${response.statusText}`);
		});

		if ('errors' in result) {
			throw new Error(result.message);
		}

		return result;
	}

	private async request<T extends RequestResponse>(
		method: Method,
		path: string,
		body: unknown,
		query: Record<string, any> = {},
		init: RequestInit = {},
	) {
		const baseURL = new URL(`${DISCORD_API_URL}${path}`);
		const params = new URLSearchParams(query);

		const url = `${baseURL}${params ? `?${params}` : ''}`;

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
