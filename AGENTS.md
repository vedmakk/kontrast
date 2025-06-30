When creating components that require styling, use styled components with object styles.

```tsx
const StyledComponent = styled.div(({ theme }) => ({
  background: theme.colors.background,
}))
```

Also before creating new components, check if a suitable component already exists (e.g. `Button` or `Label`). If you need it slightly different, but still similar, update the existing component with additional props/styles/adjustments.
