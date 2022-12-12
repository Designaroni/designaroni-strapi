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

# Environment variables

## Environment bariables required for local development

- Copy `.env.example` to `.env` and add the following:
  - ```
    HOST=0.0.0.0
    PORT=1337
    APP_KEYS=['', '']
    JWT_SECRET=
    API_TOKEN_SALT=
    ADMIN_JWT_SECRET=
    ```
- Generate `APP_KEYS`, `JWT_SECRET`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET` by running Node in the terminal using `crypto.randomBytes(16).toString('base64')`.
  - `APP_KEYS` must be an array defined like `APP_KEYS=['asdf1234==', 'qwer5678==']`
  - `JWT_SECRET`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET` can be left as a string ex: `ENV_VAR=asdf1234==` without the array or string notation characters

---

## `Test` & `Production` environment specifics

- If you are deploying `test` or `production` environments of this apps configurations to **Digital Ocean Apps** you will need to configure additional environment variables. See: [Deploy Strapi to Digital Ocean App](https://www.youtube.com/watch?v=tnGqqUzzh6U)

### **Dealing with persitent images**

Without a solution for hosting persistent images `test` and `production` environments will upload media assets “locally” to your servers `public/uploads` directory which wiped during each redeploy.

- In order to maintain persistent images `config/plugins.js` & `config/middlewars.js` have been configured to use AWS S3 environment variables when the app is in `test` and `production` node environments.
- To use AWS for both `test` and `production` environments you will need to configure two different AWS S3 buckets, AWS users with IAM policies to generate the required AWS environment variables for `AWS_ACCESS_KEY_ID`,`AWS_ACCESS_SECRET`,`AWS_REGION`,`AWS_BUCKET`.
  - Basic steps to create IAM users & roles can be found here: [Amazon AWS Install Requirements and creating an IAM non-root user](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/deployment/hosting-guides/amazon-aws.html#amazon-aws-install-requirements-and-creating-an-iam-non-root-user)
    - These steps can be followed to create an account administrator, developer user, application environment specific users and user groups.
    - The application environment specific user (like `website.strapi.production.user`) will be used to generate the `AWS_ACCESS_KEY_ID`, `AWS_ACCESS_SECRET` needed in the applications environment variables.
    - Ideally you should attempt to use the AWS concept of assumed roles to grant your application access to your S3 buckets but that's a whole seperate process...
    - IAM policies can be configured for the application specific users with the minimal configuration of:
      - ```
        {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Sid": "VisualEditor0",
                    "Effect": "Allow",
                    "Action": [
                        "s3:PutObject",
                        "s3:GetObject",
                        "s3:ListBucket",
                        "s3:DeleteObject",
                        "s3:PutObjectAcl"
                    ],
                    "Resource": [
                        "arn:aws:s3:::<strapi-uploads-bucket-name>",
                        "arn:aws:s3:::<strapi-uploads-bucket-name>/*"
                    ]
                }
            ]
        }
        ```
  - Basic steps to setup AWS per enviroment can be found here: [ Configure S3 for image hosting](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/deployment/hosting-guides/amazon-aws.html#configure-s3-for-image-hosting)
    - The buckets you create for `test` & `production environments` will be used to generate the `AWS_REGION` & `AWS_BUCKET` needed in the applications environment variables.
    - create an AWS S3 bucket for uploads, something like `websiteName-strapi-production-uploads`.
    - follow the bucket settings listed in the guide
    - An additional step may be needed to allow your apps IAM user to upload by navigating to the bucket `Permissions` tab and changing `Object Ownership` to `Bucket owner preferred`
    - Repeat this process for your test environment uploads bucket.

Additional resources on deploying Strapi to other environments can be found here: [Deployment - Strapi Developer Docs](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/deployment.html)

---

## Adding the admin and content

This Strapi repo is designed to work with the [designaroni-next](https://github.com/designaroni/designaroni-next) frontend, in order to run the frontend app you will need to create a Strapi Admin user, and then add content and ensure it is published.

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

---

## Graphql API role configuration

In order to use the Graphql API you will need to configure the apps roles & permissions.

- Navigate to `Settings`
- Select `Roles` under _User & Permissions Plugin_
- Select the edit icon for the `Public` permissions
- Under the Public page _permissions_ section select the `find` checkbox for the following items:
  - Author
  - Category
  - Footer
  - Home
  - Post (Also select the `findOne` checkbox)
  - Top-level-page
- Select save to enable your localhost graphql API
- check that the API is enabled and working by navigating to http://localhost:1337/graphql and running a query as described in the `designaroni-next` `lib/api.ts` file.

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

# 🚀 Getting started with Strapi

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
