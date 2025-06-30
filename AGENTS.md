When creating components that require styling, use styled components with object styles.

```tsx
const StyledComponent = styled.div(({ theme }) => ({
  background: theme.colors.background,
}))
```

Also before creating new components, check if a suitable component already exists (e.g. `Button` or `Label`). If you need it slightly different, but still similar, update the existing component with additional props/styles/adjustments.

Use the container / component pattern. E.g. access the store in the container and pass the data to the component as props.

When selecting data from the redux store, create selectors in a selectors.ts file and consume them in hooks. See `src/theme` for examples.

Create state slices in the `src/<feature>/featureSlice.ts` file (as seen in `src/theme/themeSlice.ts`).
