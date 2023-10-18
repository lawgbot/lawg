'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Github, LogIn, X } from 'lucide-react';
import Link from 'next/link';
import { useNav } from '~/contexts/nav';
import { GITHUB_ORG_URL } from '~/util/constants';
import { Button } from './ui/button';

export function MobileNav() {
	const { opened, setOpened } = useNav();

	return (
		<Transition
			show={opened}
			enter="transition duration-100 ease-out"
			enterFrom="transform translate-x-full"
			enterTo="transform translate-x-0"
			leave="transition duration-100 ease-out"
			leaveFrom="transform translate-x-0"
			leaveTo="transform translate-x-full"
		>
			<Dialog className="relative z-50" open={opened} onClose={() => setOpened(false)}>
				<Dialog.Panel className="fixed top-0 flex h-screen w-full bg-background flex-col pb-2">
					<header className="flex w-full flex-col place-items-center place-content-center py-4">
						<div className="container flex place-items-center place-content-between px-2">
							<Link className="flex h-12 place-items-center place-content-center" href="/">
								<h2 className="text-xl font-bold uppercase text-foreground">yuikigai</h2>
							</Link>
							<div className="flex place-items-center place-content-center gap-2">
								<Button variant="ghost" onClick={() => setOpened((open) => !open)}>
									<X size={24} />
								</Button>
							</div>
						</div>
					</header>
					<div className="flex gap-2 border-b border-border p-4">
						<Link href="/dashboard" className="w-full flex justify-center">
							<Button variant="ghost">
								<LogIn className="mr-2 h-5 w-5" /> <span className="text-lg font-medium">Dashboard</span>
							</Button>
						</Link>
					</div>
					<div className="relative flex h-full flex-col overflow-y-auto overflow-x-hidden">
						<ul className="flex flex-col gap-4">
							<li />
						</ul>
					</div>
					<div className="flex flex-col items-center justify-center gap-6 border-t bg-background py-4 text-center">
						<div className="inline-flex items-center justify-center gap-2">
							<Link target="_blank" rel="noopener noreferer" href={GITHUB_ORG_URL}>
								<Button variant="outline">
									<Github size={20} />
								</Button>
							</Link>
						</div>
					</div>
				</Dialog.Panel>
			</Dialog>
		</Transition>
	);
}
