import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '~/lib/util';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from './ui/navigation-menu';

export function MainNav() {
	const pathname = usePathname();

	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<Link href="/commands" legacyBehavior passHref>
						<NavigationMenuLink
							className={cn(
								'transition-colors hover:text-foreground/80',
								pathname === '/commands' ? 'text-foreground' : 'text-foreground/60',
								navigationMenuTriggerStyle(),
							)}
						>
							Commands
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
