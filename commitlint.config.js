export default {
	extends: ['@commitlint/config-conventional'],
	parserPreset: {
		parserOpts: {
			headerPattern: /^(?:\p{Emoji_Presentation}|\p{Emoji}\uFE0F?)\s*(\w+)(?:\(([^)]+)\))?:\s*(.+)$/u,
			headerCorrespondence: ['type', 'scope', 'subject']
		}
	},
	rules: {
		'type-enum': [
			2,
			'always',
			[
				'feat',
				'fix',
				'docs',
				'style',
				'refactor',
				'perf',
				'test',
				'build',
				'ci',
				'chore',
				'revert',
				'arch',
				'config',
				'lint'
			]
		],
		'subject-case': [2, 'always', 'lower-case'],
		'subject-full-stop': [2, 'never', '.'],
		'header-max-length': [2, 'always', 50]
	}
};
