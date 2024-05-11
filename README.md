<p align="center" style="font-size: 26px">
	<b>Typescript Boilerplate for alt:V with React - v5.0.1</b>
</p>
<p align="center">
	<img src="https://thumbs.gfycat.com/FabulousFlawlessLamb-size_restricted.gif" width="350" title="hover text">
</p>

<p align="center">
	<sup>Super Fast Compilation</sup>
</p>

> [!IMPORTANT]  
> This boilerplate will no longer be updated.
> Consider using [Rebar Framework](https://rebarv.com/) for more up-to-date practices, and a plugin system.

# Features

A simple Typescript Boilerplate that builds incredibly fast using the [SWC Library](https://github.com/swc-project/swc).

- Auto Refresh Server
- Auto Compile TypeScript Files
- Auto Download Resources
- Single Resource Code Support
- Fastest Auto Reconnect Time on Recompile
- Built-in React for WebViews

# Installation

* [Install NodeJS 18+](https://nodejs.org/en/download/current/)
* [Install GIT](https://git-scm.com/downloads)

## Clone the Repository

Use the command below in any terminal, command prompt, etc.

```sh
git clone https://github.com/Stuyk/altv-typescript-react
```

## Install the Repository

Use the command below in any terminal, command prompt, etc.

```sh
cd altv-typescript-react
npm install
```

## Download Server Files

Use the command below in any terminal, command prompt, etc. This will download all necessary server files from an additional package used by this project.

```sh
npm run update
```

## Start Production Server (Windows)

Run this command to run the server in production mode.

```
npm run windows
```

## Start Production Server (Linux)

Run this command to run the server in production mode.

```
npm run linux
```

## Start Developer Server

Run this command to run the server in development mode.

This will automatically reconnect your alt:V Client if you have `debug` mode turned on.

```
npm run dev
```

## WebView Previews
If you need to modify the WebView and want to work out of the browser, use the following command.

```
npm run react-dev
```

## End Server Runtime

Use the key combination `ctrl + c` to kill your server in your terminal, command prompt, etc.

## How to Add Mods, and New Resources

Always add your already compiled resources & mods into the `resources` folder.
