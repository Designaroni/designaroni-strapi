# Pre-getting started

If this is your first time running the repo locally you may need to install python version 3x in order to successfully run `yarn` which will break when installing better-sqlite3 without the right version of python:

- install [Homebrew](https://brew.sh/): `$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
  - follow the instructions printed in the terminal to add brew to your path
- install pyenv: `$ brew install pyenv`
  - further details on pyenv installation can be found here on Stackoverflow: https://stackoverflow.com/a/71957847/13986111
  - check the latest python versions here: https://www.python.org/downloads/macos/
- add pyenv shims to your path
  - ```
    #### adds python
    export PATH="$HOME/.pyenv/shims:$PATH"
    ```
- install the latest stable version of python and set it as your global python
  - `$ pyenv install 3.11.0`
  - `$ pyenv global 3.11.0`
  - test which version is installed by running `pyenv version`

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

### Adding the admin and content

This Strapi repo is designed to work with the [designaroni-next](https://github.com/designaroni/designaroni-next) frontend, in order to run the frontend app you will need to create a Strapi Admin, and then add content and ensure it is published.

- start up the app using `yarn local`
- Create your first administrator here: http://localhost:1337/admin
- Required content types to be published:
  - [Author](http://localhost:1337/admin/content-manager/collectionType/api::author.author?page=1&pageSize=10&sort=name:ASC)
    - Author will be asigned to posts later
  - [Category](http://localhost:1337/admin/content-manager/collectionType/api::author.author?page=1&pageSize=10&sort=name:ASC)
    - multple categories should be created these will be asigned to posts later
  - [Footer](https://api-test.designaroni.com/admin/content-manager/collectionType/api::footer.footer?page=1&pageSize=10&sort=daysRemaining:ASC)
    - One footer type should be created
  - [TopLevelPage](https://api-test.designaroni.com/admin/content-manager/collectionType/api::top-level-page.top-level-page?page=1&pageSize=10&sort=name:ASC)
    - example top level pages: `Trips, Journal, Builds, About, Work`
  - [Post](https://api-test.designaroni.com/admin/content-manager/collectionType/api::post.post?page=1&pageSize=10&sort=title:ASC)
    - multple posts should be created, each post should be assigned to category(s), an author, and a top level page
  - [Home](https://api-test.designaroni.com/admin/content-manager/singleType/api::home.home)

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
