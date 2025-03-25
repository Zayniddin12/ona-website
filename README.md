# `Ona Website`

Then, you should write frontend framework which is used in this project. For example, you can write Vue 3, Nuxt 2 or Nuxt 3 and then, you can continue with programming language or CSS frameworks and so on.

### Technology:

- Nuxt 3
- TypeScript
- Tailwind CSS
- Node `v16.19.0`

We can have SSR and SSG projects. If we enable SSR then, you should write `Mode: SSR`, otherwise `Mode: SSG`

### MODE: SSR

It would be great, if you give an instruction for building project and deploying it for DevOps.

## Production build

```bash
yarn
yarn install
yarn build
pm2 restart <id>
```

## Development Server

Start the development server on http://localhost:3000

```bash
yarn dev
```

## Storybook development

```bash
yarn storybook
```

## Storybook production

```bash
yarn build:storybook
```
