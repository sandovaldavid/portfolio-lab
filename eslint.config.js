// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';

export default tseslint.config(
	{
		files: ['**/*.ts'],
		extends: [
			eslint.configs.recommended,
			...tseslint.configs.recommended,
			...tseslint.configs.stylistic,
			...angular.configs.tsRecommended,
		],
		processor: angular.processInlineTemplates,
		rules: {
			'@angular-eslint/directive-selector': [
				'error',
				{
					type: 'attribute',
					prefix: 'app',
					style: 'camelCase',
				},
			],
			'@angular-eslint/component-selector': [
				'error',
				{
					type: 'element',
					prefix: 'app',
					style: 'kebab-case',
				},
			],
			'no-console': ['error', { allow: ['warn', 'error'] }],
			'@typescript-eslint/no-explicit-any': 'error',
		},
	},
	{
		files: ['src/app/shared/**/*.ts'],
		rules: {
			'no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							group: ['@entities/*', '@features/*', '@widgets/*'],
							message:
								'shared cannot import from entities, features, or widgets (FSD boundary).',
						},
					],
				},
			],
		},
	},
	{
		files: ['src/app/entities/**/*.ts'],
		rules: {
			'no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							group: ['@features/*', '@widgets/*'],
							message: 'entities cannot import from features or widgets (FSD boundary).',
						},
					],
				},
			],
		},
	},
	{
		files: ['src/app/features/**/*.ts'],
		rules: {
			'no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							group: ['@widgets/*'],
							message: 'features cannot import from widgets (FSD boundary).',
						},
					],
				},
			],
		},
	},
	{
		files: ['src/app/shared/lib/keyboard-shortcuts/keyboard-shortcuts.ts'],
		rules: {
			'no-console': 'off',
		},
	},
	{
		files: ['**/*.html'],
		extends: [
			...angular.configs.templateRecommended,
			...angular.configs.templateAccessibility,
		],
		rules: {},
	}
);
