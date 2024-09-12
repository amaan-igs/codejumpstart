# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [V 1.0.1] - 2024-09-12

### Added

- Backwards Compatibility: Updated the engines.vscode property to support VS Code version 1.89.0 (April 2024) and later. This change ensures the extension remains functional for users who haven't upgraded to the latest versions of VS Code (August 2024 or later).

### Fixed

-Issue Fixes: Fixed compatibility issues encountered by users on older versions of VS Code, ensuring smooth operation for non-upgraded environments.

---

## [V 1.0.0] - 2024-09-11

### Added

- Initial release of CodeJumpstart extension.
- Boilerplate templates for:
  - Node.js
  - Python
  - C/C++
  - Vue.js + JavaScript
  - HTML/CSS/JS
- Integration with Vue Router for Vue.js boilerplate.
- Command to initialize new projects via the VS Code Command Palette.
- Automatically generated project structure including essential files like `.gitignore`, `README.md`, and `package.json`.

### Fixed

- Resolved issues with Vue Router integration in the Vue.js boilerplate.

---

## [Unreleased]

### Added

- Feature for customizable templates in future releases.
