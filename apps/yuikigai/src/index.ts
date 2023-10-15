import 'dotenv/config';
import { logger } from '@yuikigai/framework';
import { HttpHandler } from '@yuikigai/http';

const http = new HttpHandler({ port: Number(process.env.HTTP_PORT), logger: process.env.NODE_ENV === 'development' });

try {
	await http.listen();
	logger.info(`Listening server on http://127.0.0.1:${process.env.HTTP_PORT}`);
} catch (error_) {
	const error = error_ as Error;
	logger.error(error, error.message);
}
