import js from '@eslint/js';
import json from '@eslint/json';
import importPlugin from 'eslint-plugin-import';
import node from 'eslint-plugin-n';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  {
    ignores: ['eslint.config.mjs']
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    extends: [js.configs.recommended, importPlugin.flatConfigs.recommended, node.configs['flat/recommended-module']],
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.mjs', '.cjs']
        }
      }
    }
  },
  { files: ['**/*.json'], plugins: { json }, language: 'json/json', extends: ['json/recommended'] },
  { files: ['**/*.jsonc'], plugins: { json }, language: 'json/jsonc', extends: ['json/recommended'] }
]);
