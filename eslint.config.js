/**
 * ESLint configuration. Prettier handles formatting (see .prettierrc).
 */
import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import vuePrettier from '@vue/eslint-config-prettier'

export default [
  {
    ignores: [
      'dist',
      'dist-node',
      'node_modules',
      '.vite',
      'coverage',
      '**/*.tsbuildinfo',
      '*.cjs',
    ],
  },
  ...defineConfigWithVueTs(
    ...pluginVue.configs['flat/recommended'],
    vueTsConfigs.recommended,
    vuePrettier
  ),
]
