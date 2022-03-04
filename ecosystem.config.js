/* eslint-disable camelcase */
module.exports = {
	apps: [
		{
			name: 'baktz'
			, exec_mode: 'cluster'
			, instances: 'max'
			, cwd: '/opt/baktz/current'
			, env: {
				NODE_APP_INSTANCE: 'production'
				, NODE_CONFIG_DIR: '/opt/baktz/current/config'
				, NODE_ENV: 'production'
				, NODE_PATH: '/opt/baktz/current'
				, NUXT_PORT: 3030
			}
			, script: './.output/server/index.mjs'
		}
	]
}
