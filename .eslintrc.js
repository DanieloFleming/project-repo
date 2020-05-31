module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    'plugin:vue/recommended',
    '@vue/standard'
  ],

  parserOptions: {
    parser: 'babel-eslint'
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    semi: ['error', 'always'],
    complexity: ['error', 7],
    // Vue specific rules
    'vue/no-v-html': 0,
    'vue/max-attributes-per-line': 0,
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    'vue/singleline-html-element-content-newline': ['error', {
      ignoreWhenNoAttributes: false
    }],
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'never'
    }],
    'vue/html-self-closing': ['error', {
      html: {
        normal: 'never',
        void: 'always'
      }
    }],
    'vue/multiline-html-element-content-newline': ['error', {
      ignoreWhenEmpty: false
    }],
    'vue/no-unused-components': 'off',
    'vue/v-on-style': ['error'],
    'vue/v-bind-style': ['error'],
    'vue/require-v-for-key': 0
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    },
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
};
