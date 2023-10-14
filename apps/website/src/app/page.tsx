import { Button } from '~/components/ui/button';
import { GITHUB_ORG_URL } from '~/util/constants';

export default function Page() {
	return (
		<div className="flex place-content-center place-items-center w-screen h-screen">
			<a href={GITHUB_ORG_URL} target="_blank" rel="noopener noreferrer">
				<Button>GitHub</Button>
			</a>
		</div>
	);
}
