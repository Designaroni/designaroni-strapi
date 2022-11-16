# 🚀 Getting started with Strapi

### `Environment variables`

Copy .env.example to .env

```
HOST=0.0.0.0
PORT=1337
APP_KEYS=['', '']
JWT_SECRET=
API_TOKEN_SALT=
ADMIN_JWT_SECRET=
```

Generate `APP_KEYS`, `JWT_SECRET`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET` by running Node in the terminal and using `crypto.randomBytes(16).toString('base64')`.

- `APP_KEYS` must be an array defined like `APP_KEYS=['asdf1234==', 'qwer5678==']`
- `JWT_SECRET`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET` can be left as `ENV_VAR=asdf1234==` without the array or string characters

---

# Custom `yarn` commands for this project

### `local`

Same command as `develop` used for local development to start and run the Strapi application. Used in parity with the local development command used to start [designaroni-next](https://github.com/designaroni/designaroni-next)

### `strapi`

Provides access to the Strapi CLI, @see: https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html

### `updateStrapi`

Runs several `yarn upgrade` commands, used for updating all required Strapi NPM modules.

# Default Strapi `yarn` commands for this project

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-build)

```
npm run build
# or
yarn build
```

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project. Find the one that suits you on the [deployment section of the documentation](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/deployment.html).

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://docs.strapi.io) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>
