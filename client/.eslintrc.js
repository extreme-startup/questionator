module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    //'eslint:recommended',
    'plugin:vue/base',
    'plugin:vue/essential',
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    indent: [2, 2, { SwitchCase: 1 }],
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
};
