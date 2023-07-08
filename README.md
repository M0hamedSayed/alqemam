# AlqemamTask

### Hi!

I build this workspace with monorepo concept using [`NX`](https://nx.dev/)

## Project Structure :

**🔀 apps :**

```bash
├── apps
│   ├── frontend
│   └── backend
```

**🔀 Shareable Packages :**

```bash
├── libs
│   ├── express-errors
│   └── shared
```

**express-errors :**

> handle custom errors

**shared :**

> handle shareable types between backend and frontend

### Packages Using :

> ## Global:

`husky` , `pnpm` , `commitizen` , `lint-staged` , `cz-conventional-changelog` , `devmoji`

### Node Package:

`passport`, `nodemailer , i18n-iso-countries` , `cookie-parser` , `bcrypt` , `helmet` , `i18n-iso-countries` , `express` , `express-validator` , `sequelize` , `morgan` , `winston`

### Angular Package:

`tailwindcss` , `ngPrime` , `ng-angular-popup` ,`ngx-intl-tel-input`

## Run App :

**🔀 Before start :**

> install pnpm and nx

```bash
npm install -g pnpm
npm install --global nx@latest
```

> create env file with our configuration follow env-config,ts in ./common/config folder

### Angular App :

```
nx serve frontend
```

### Node App :

```
nx serve backend
```

For more Instructions visit [`NX`](https://nx.dev/)

## Featurs:

### task1 :

1. sign up with user data
2. send eamil verification
3. verifiy email before login
4. login with email and password
5. login with facebook
6. send welcome mail

> using third-party validation on front , back and db

> logging sys

> handle if user signup with email and facebook with same email

> apply routes guards in front depends on user is authanticated or not

### task2 :

1. create table
2. sorting table
3. search on table
