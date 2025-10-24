# Development Setup

This document outlines the development environment setup for the iHome Real Estate project.

## Code Formatting & Linting

### Prettier Configuration

- **Config file**: `.prettierrc`
- **Ignore file**: `.prettierignore`
- **Auto-format on save**: Enabled in VS Code/Cursor

### ESLint Configuration

- **Config file**: `eslint.config.mjs`
- **Integrates with Prettier**: Yes
- **TypeScript support**: Yes

### Available Scripts

```bash
# Format all files
npm run format

# Check formatting without fixing
npm run format:check

# Lint all files
npm run lint

# Lint and auto-fix
npm run lint:fix

# Format only staged files (for git hooks)
npm run format:staged
```

## VS Code/Cursor Setup

### Required Extensions

Install the recommended extensions from `.vscode/extensions.json`:

1. **Prettier - Code formatter** (`esbenp.prettier-vscode`)
2. **ESLint** (`dbaeumer.vscode-eslint`)
3. **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
4. **TypeScript Importer** (`pmneo.tsimporter`)
5. **Auto Rename Tag** (`formulahendry.auto-rename-tag`)
6. **Path Intellisense** (`christian-kohler.path-intellisense`)

### Auto-Formatting on Save

The following settings are configured in `.vscode/settings.json`:

- ✅ **Format on save**: Enabled
- ✅ **Default formatter**: Prettier
- ✅ **ESLint auto-fix on save**: Enabled
- ✅ **Organize imports on save**: Enabled
- ✅ **Trim trailing whitespace**: Enabled
- ✅ **Insert final newline**: Enabled

## Code Style Guidelines

### General Rules

- Use **2 spaces** for indentation
- Use **double quotes** for strings
- Use **semicolons** at the end of statements
- Use **trailing commas** in objects and arrays
- Use **LF** line endings
- **80 character** line width limit

### TypeScript/React Rules

- Use **functional components** with TypeScript
- Use **interface** for object types
- Use **const assertions** where appropriate
- Use **destructuring** for props and state
- Use **arrow functions** for event handlers

### Import Organization

- **External libraries** first
- **Internal modules** second
- **Relative imports** last
- **Type-only imports** with `type` keyword

## Git Hooks (Optional)

To set up pre-commit hooks for automatic formatting:

```bash
# Install husky and lint-staged
npm install --save-dev husky lint-staged

# Add to package.json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,css,md}": [
      "prettier --write"
    ]
  }
}
```

## Troubleshooting

### Prettier Not Working

1. Check if Prettier extension is installed and enabled
2. Verify `.prettierrc` configuration
3. Check VS Code settings for `editor.defaultFormatter`

### ESLint Not Working

1. Check if ESLint extension is installed and enabled
2. Verify `eslint.config.mjs` configuration
3. Check if TypeScript is properly configured

### Format on Save Not Working

1. Check VS Code settings in `.vscode/settings.json`
2. Verify file associations in settings
3. Check if Prettier is set as default formatter for the file type

## Project Structure

```
├── .vscode/                 # VS Code/Cursor settings
│   ├── settings.json        # Editor configuration
│   └── extensions.json      # Recommended extensions
├── .prettierrc              # Prettier configuration
├── .prettierignore          # Prettier ignore patterns
├── .editorconfig            # Editor configuration
├── eslint.config.mjs        # ESLint configuration
└── package.json             # NPM scripts
```
