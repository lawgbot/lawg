import { getAuthenticatedToken, getAuthenticatedUser } from '~/lib/discord';

export default async function Page() {
	const token = getAuthenticatedToken();
	const user = await getAuthenticatedUser(token);
	console.log(user);

	return (
		<section className="flex min-h-screen w-full flex-col">
			<div className="container flex flex-col items-center justify-center gap-8 py-8 md:flex-row" />
		</section>
	);
}
