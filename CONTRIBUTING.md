# Contributing to GraphQL React App

Thank you for considering contributing to our project! We welcome contributions that help improve the functionality, maintainability, and performance of the application.

## Getting Started

1. **Fork the repository** and clone it to your local machine.
2. **Install dependencies** using `npm install` or `yarn install`.
3. **Run the development server** with `npm run dev` or `yarn dev`.
4. **Run tests** using `npm test` to ensure everything is working as expected.

## Guidelines

- **Use as few libraries as possible** to achieve the desired functionality.
- **Maintain a reasonable code structure** to ensure the project is scalable and maintainable.

## TODOs and Areas for Improvement

- **Mock Context Provider:** Consider implementing a mock context provider for `TransparentProvider` in tests to avoid using placeholder children like `<div />`.
- **CSS Improvements:** Review and refactor CSS for better maintainability and to ensure consistent styling across components.
- **Error Handling:** Implement comprehensive error handling for API calls in `useSearch` and `useMediaDetail` hooks.
- **Performance Optimization:** Investigate potential performance optimizations, such as memoizing expensive calculations or using `React.memo` for components that do not need to re-render frequently.
- **Accessibility:** Conduct an accessibility audit to ensure the application is accessible to all users, including those using screen readers.

## Pull Request Process

1. Ensure that your code follows the project's coding standards and passes all tests.
2. Update the `README.md` and other relevant documentation if necessary.
3. Submit your pull request, providing a clear description of the changes and any relevant issues or TODOs.

We appreciate your contributions and look forward to collaborating with you!
