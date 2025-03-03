# graphql-react-app frontend-engineering-task

RELEX-a frontend engineering task with graphQL backed react app

# Assignment: Crafting a GraphQL-backed React app

**Build an app that consumes a GraphQL API.** Either your own or one that you are familiar with. You can also pick one from here: https://github.com/APIs-guru/graphql-apis, e.g. the GitHub API (see below).

Requirements:

- It must include an input field that starts searching as you type. Try to ensure a smooth user experience and reasonable usage of the API.
- It should list the top 20 matched results below the input field in a grid where you have 2 items in a row if the available width for the search result is below 700px. If the width available is 700px or more — allow for 4 items per row.
- Every search result should have a unique persistent URL that you can browse to and see a certain search result.
- On initial load make the input field have focus.
- When you click on a search result it should become 50% transparent and if you click it again it should become non-transparent again. If the same result appears when searching for a different query it should keep the transparent state. It is OK if all search results are non-transparent after every full browser reload.
- There should be a way to reset the app to the initial state without a full browser reload.

Example API: GitHub
You could for example search GitHub for repositories that match the query “react” and the users starring them. Here is a guide to get going: https://developer.github.com/v4/guides/forming-calls/

Example query:

```graphql
query {
  search(query: "react", first: 10, type: REPOSITORY) {
    edges {
      node {
        ... on Repository {
          name
          stargazers(first: 10) {
            nodes {
              avatarUrl
            }
          }
        }
      }
    }
  }
}
```

# Expectations

Feel free to use starter kits like for example create-react-app or similar to get started. For functionality we would prefer that you use as few libraries as possible.

We would like for the project to have a reasonable code structure and a strategy for how to keep the code maintainable if the project would grow.

The look and feel is not very important but we would like to see some reasonable layout logic.

If you run out of time, and decide to take some shortcuts, please comment your reasoning and TODOs in the code or the PR description.

# What to do

1. Create a new repository and push the original assignment to it
2. Create a pull request in your new repo with your solution, write a short description of your solution and flag for any constraints and/or trade-offs in your code. Treat it as you would like to treat any PR at work
3. Ask your contact person for reviewers to assign to your PR. Hopefully you'll exchange some comments & feedback before having a follow up discussion in person or online.
