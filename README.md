# About

A Hacker News Interface implemented with React, Redux Toolkit and React Router v5.

## Features

- The main page displays recent 100 news (that's why it's taking that long to load...sorry)
- On each scroll it loads 20 more news
- It automatically uploads new data every 1 minute, but if you wanna force reload it — click "reload" button
- By clicking on a note title you get redirected to the note view where you can see meta data including comments number if they exist
- On a note view page click 'go back' button to return to all news

## Additional Info

- Server starts at 3000 port
- yarn
- Ant Design as UI

## Wanna try it on your own?

### Download the dependecies

```sh
yarn install
```

### Compile and Hot-Reload for Development

```sh
yarn start
```

### Compile and Minify for Production

```sh
yarn build
```
