# Component Library

This module is linked locally to the main project. After making changes make sure to run `pnpm build` and update the dependency in the main project using `pnpm update component-lib`

## Storybook

Run `pnpm start` for a local storybook instance

## Theme

The applications theme is provided via a [SCSS file](src/_theme.scss). It provides the color scheme as well as some text styles.

Use colors:
```scss
@use '~component-lib/build/_theme' as *;

.selector {
  background-color: color('primary');
}
```

Use text style:
```scss
@use '~component-lib/build/_theme' as *;

.selector {
  @include font('subtitle');
}
```

## Components

- [Badge](src/components/Badge)
- [Button](src/components/Button)
- [FilterCheckbox](src/components/FilterCheckbox)
- [FilterDropdown](src/components/FilterDropdown)
- [FilterSearchBar](src/components/FilterSearchBar)
- [Profile](component-lib/src/components/Profile)
- [SummonerIcon](src/components/SummonerIcon)
