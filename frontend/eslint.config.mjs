import nx from '@nx/eslint-plugin';
import baseConfig from '../eslint.config.mjs';

export default [
  ...baseConfig,
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  {
    // Nx 自動生成ファイル — プロジェクトコードではないため除外
    ignores: ['**/nx-welcome.ts'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // --- セレクター・命名規則 ---
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
      '@angular-eslint/component-class-suffix': 'error',
      '@angular-eslint/directive-class-suffix': 'error',

      // --- ライフサイクル ---
      '@angular-eslint/use-lifecycle-interface': 'error',
      '@angular-eslint/no-empty-lifecycle-method': 'error',
      '@angular-eslint/no-async-lifecycle-method': 'error',
      '@angular-eslint/no-conflicting-lifecycle': 'error',
      '@angular-eslint/no-lifecycle-call': 'error',
      '@angular-eslint/sort-lifecycle-methods': 'error',
      '@angular-eslint/require-lifecycle-on-prototype': 'error',

      // --- Signal / Reactivity ---
      '@angular-eslint/computed-must-return': 'error',
      '@angular-eslint/no-uncalled-signals': 'error',
      '@angular-eslint/prefer-signals': 'error',
      '@angular-eslint/prefer-signal-model': 'error',

      // --- コンポーネント品質 ---
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',
      '@angular-eslint/consistent-component-styles': 'error',
      '@angular-eslint/use-component-selector': 'error',
      '@angular-eslint/use-component-view-encapsulation': 'error',
      '@angular-eslint/relative-url-prefix': 'error',

      // --- Input / Output ---
      '@angular-eslint/no-attribute-decorator': 'error',
      '@angular-eslint/prefer-output-emitter-ref': 'error',
      '@angular-eslint/prefer-output-readonly': 'error',

      // --- メタデータ ---
      '@angular-eslint/no-duplicates-in-metadata-arrays': 'error',
      '@angular-eslint/no-queries-metadata-property': 'error',
      '@angular-eslint/no-pipe-impure': 'error',
      '@angular-eslint/no-forward-ref': 'error',

      // --- DI ---
      '@angular-eslint/use-injectable-provided-in': 'error',
      '@angular-eslint/no-implicit-take-until-destroyed': 'error',
    },
  },
  {
    files: ['**/*.html'],
    rules: {
      // --- 型安全性 ---
      '@angular-eslint/template/no-any': 'error',
      '@angular-eslint/template/no-negated-async': 'error',
      '@angular-eslint/template/no-non-null-assertion': 'error',
      // NOTE: no-call-expression は Signal の () 呼び出しと衝突するため除外

      // --- テンプレート品質 ---
      '@angular-eslint/template/no-duplicate-attributes': 'error',
      '@angular-eslint/template/no-interpolation-in-attributes': 'error',
      '@angular-eslint/template/no-empty-control-flow': 'error',
      '@angular-eslint/template/no-inline-styles': 'error',
      '@angular-eslint/template/use-track-by-function': 'error',
      '@angular-eslint/template/prefer-self-closing-tags': 'error',
      '@angular-eslint/template/prefer-ngsrc': 'error',
      '@angular-eslint/template/prefer-contextual-for-variables': 'error',

      // --- アクセシビリティ補強 ---
      '@angular-eslint/template/button-has-type': 'error',
      '@angular-eslint/template/no-positive-tabindex': 'error',
    },
  },
];

