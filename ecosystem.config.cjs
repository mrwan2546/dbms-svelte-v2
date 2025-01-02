module.exports = {
	apps: [
		{
			name: 'Coffee store',
			script: './build/index.js',
			watch: true,
			env: {
				BODY_SIZE_LIMIT: '5M'
			}
		}
	]
};
