import { logger } from '@yuikigai/framework';
import { HttpHandler } from '@yuikigai/http';

const http = new HttpHandler({ port: 3_000 });

try {
	await http.listen();
	logger.info('Listening on port 3000');
} catch (error) {
	const error_ = error as Error;
	logger.error(error, error_.message);
}
