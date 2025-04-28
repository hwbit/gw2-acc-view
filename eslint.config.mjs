// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    tseslint.configs.stylistic,
    // tseslint.configs.recommendedTypeChecked,
    // tseslint.configs.stylisticTypeChecked,
    {
        rules: {
            // Note: you must disable the base rule as it can report incorrect errors
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "no-explicit-any": "off",
            "@typescript-eslint/no-explicit-any": "off"
        }
    }
);