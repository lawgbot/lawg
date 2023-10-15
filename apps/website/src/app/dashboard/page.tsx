import { getAuthenticatedToken } from '~/lib/discord';

export default function Page() {
	const token = getAuthenticatedToken();

	return (
		<div>
			<h1>Dashboard</h1>
			<p>Token: {token}</p>
		</div>
	);
}
