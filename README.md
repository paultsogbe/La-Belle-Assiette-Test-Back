# Project dependencies

- `nodejs`
- `mongodb`
- `npm` / `yarn`


# Install projects

Clone API and front project

Install node modules in `front` and `API`

```bash
yarn install
```

# Run react
In your `front` repository run :
```
yarn start
```

# Start API
You will need mongodb service start.

Then In your `API` repository run :
```
yarn dev
```

# Subjects :

Now you are ready to start.

Please read all the subjects before starting.

You can choose one use case, no need to do both.
(one subject is probably already long enough)

If you want to do all of them, as you want :)

## Use case 1

We need to improve chef interface
- add an image on the chef profile page (API + react)
(you can just add an url to the image think to add a default image)
- add suppression of chef (API + react)
- add edit chef feature (API + react)
- sort chef list by `firstname` then `name`

## Use case 2
We need to add a menu page
- Create a route named “Menus”
- Add page with a form for add menu :
  - a menu has a name, a starter, a plate, and a dessert.
  - add a select to associate a chef to the menu (API + react)
  - submit need to save menu in mongodb (API + react)
- display a list of menus sort by name (API + react)
(list needs be a card of menu displaying all menu information)
- add suppression of a menu (API + react)

Have fun !

If you don't have enough, you can add an image by menu and add menu edition feature

