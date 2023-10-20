import type { Metadata } from 'next';
import type { Command } from '~/types/command';

export const metadata: Metadata = {
	title: 'Commands',
	description: 'Check out all the commands that are available for you to use.',
};

export default async function Page() {
	const commandsData = await fetch('http://localhost:8080/api/commands', {
		next: {
			revalidate: 3_600,
		},
	});

	const { data } = await commandsData.json();

	const commandsFragment = data.map((command: Command) => {
		return <div>{command.name}</div>;
	});

	return (
		<div className="mx-auto px-4 lg:max-w-full">
			<div className="relative mx-auto gap-6 lg:max-w-full lg:flex">
				<div className="lg:sticky lg:top-23 lg:h-[calc(100vh_-_145px)]" />
				<div className="container mx-auto py-12 max-w-5xl min-w-xs w-full pb-10">
					<div className="flex flex-col gap-4">{commandsFragment}</div>
				</div>
			</div>
		</div>
	);
}
