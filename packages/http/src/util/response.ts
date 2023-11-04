export function ok<T>(data: T) {
	return {
		success: true,
		data,
	};
}

export function error(message: string, code: string) {
	return {
		success: false,
		error: {
			message,
			code,
		},
	};
}

export function internalError() {
	return {
		success: false,
		error: {
			message: 'Internal server error',
			code: 'internal_server_error',
		},
	};
}

export function notFound() {
	return {
		success: false,
		error: {
			code: 'not_found',
			message: 'Route does not exist',
		},
	};
}

export function noPermission() {
	return {
		success: false,
		error: {
			code: 'no_permission',
			message: 'You do not have permission to access this resource',
		},
	};
}
