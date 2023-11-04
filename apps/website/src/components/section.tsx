'use client';

import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import { cn } from '~/lib/util';

export function Section({ children, title }: PropsWithChildren<{ readonly title: string }>) {
	return (
		<Disclosure>
			{({ open }) => (
				<>
					<div className="bg-primary-foreground rounded-lg text-left text-sm font-medium">
						<Disclosure.Button className="flex w-full justify-between p-3 data-[headlessui-state=open]:border-b">
							<span className="font-semibold">{title}</span>

							<ChevronDown
								className={cn('transform transition duration-150 ease-in-out', open ? 'rotate-180' : 'rotate-0')}
								size={20}
							/>
						</Disclosure.Button>

						<Transition
							show={open}
							enter="transition duration-100 ease-out"
							enterFrom="transform scale-95 opacity-0"
							enterTo="transform scale-100 opacity-100"
							leave="transition duration-75 ease-out"
							leaveFrom="transform scale-100 opacity-100"
							leaveTo="transform scale-95 opacity-0"
						>
							<Disclosure.Panel static className="mt-2 flex w-full p-3">
								{children}
							</Disclosure.Panel>
						</Transition>
					</div>
				</>
			)}
		</Disclosure>
	);
}
