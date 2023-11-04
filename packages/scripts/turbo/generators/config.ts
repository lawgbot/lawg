import type { PlopTypes } from '@turbo/gen';

export default function generator(plop: PlopTypes.NodePlopAPI): void {
	plop.setGenerator('create-package', {
		description: 'Generate a new package for the Lawg Monorepo',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'The name of the new package (You can skip the `@lawgbot/` prefix)',
			},
			{
				type: 'input',
				name: 'description',
				message: 'The description of the new package.',
			},
		],
		actions: [
			(answers) => {
				if ('name' in answers && typeof answers.name === 'string' && answers.name.startsWith('@lawgbot/')) {
						answers.name = answers.name.replace('@lawgbot/', '');
					}

				if ('description' in answers && typeof answers.description === 'string') {
					answers.description = answers.description.replaceAll('"', '\\"');
				}

				return 'Config sanitized';
			},
			{
				type: 'add',
				path: `${plop.getDestBasePath()}/../{{name}}/package.json`,
				templateFile: 'templates/package.json.hbs',
			},
			{
				type: 'add',
				path: `${plop.getDestBasePath()}/../{{name}}/.gitignore`,
				templateFile: 'templates/.gitignore.hbs',
			},
			{
				type: 'add',
				path: `${plop.getDestBasePath()}/../{{name}}/.prettierignore`,
				templateFile: 'templates/.prettierignore.hbs',
			},
			{
				type: 'add',
				path: `${plop.getDestBasePath()}/../{{name}}/.prettierrc.js`,
				templateFile: 'templates/.prettierrc.js.hbs',
			},
			{
				type: 'add',
				path: `${plop.getDestBasePath()}/../{{name}}/src/index.ts`,
				template: "console.log('Hello, from @lawgbot/{{name}}');",
			},
			{
				type: 'addMany',
				destination: `${plop.getDestBasePath()}/../{{name}}`,
				templateFiles: ['templates/**'],
				globOptions: { dot: true },
				base: 'templates/default/',
				stripExtensions: ['hbs'],
			},
		],
	});
}
