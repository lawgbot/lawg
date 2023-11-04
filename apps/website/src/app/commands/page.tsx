import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Commands',
	description: 'Check out all the commands that are available for you to use.',
};

export default async function Page() {
	return (
		<div className="flex min-h-screen flex-col space-y-6">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae perspiciatis error facilis quaerat inventore
			numquam temporibus omnis, nemo aliquam dolore. Deserunt modi eligendi voluptatum, laboriosam sit neque perferendis
			ratione illo.
		</div>
	);
}
