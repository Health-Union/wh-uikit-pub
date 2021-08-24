# WEGO Health React UI Kit

## Introduction

This package serves as a set of common components/primitives/utilities that can be used for current/future WEGO Health projects.
Installation is relatively straightforward providing you have the correct access rights to the repo.

## Installation

To add this library to other projects use following command.

```
yarn add wegohealth/wh-uikit --network-concurrency 1
```

If this fails you may need to clear your Yarn cache:

```
yarn cache clean
```

### Running locally

To test this library locally for development purposes, run the following commands in the local install directory:

```
yarn && yarn start
```

### Keeping up to date

This package is tagged with dated releases and you should ensure that your project that imports it uses the correctly tagged version.

```JavaScript
{
        ...
        "dependencies": {
                ...
                "wh-uikit": "wegohealth/wh-uikit#v2020.01.13",
                ...
        }
        ...
}
```

## Usage

### Usage of Components

Components can be imported as follows:

```JavaScript
import { ChipList } from 'wh-uikit';

<ChipList />
```

### Usage of utility functions

All utility functions are exported under one object named utils:

```JavaScript
import { utils } from 'wh-uikit';

utils.getRelativeTimeString(moment());
```

## Creating a new Component

First, start by creating a new folder under the `wh-uikit/src` folder. Create the following files:

```
{componentName}.mdx
{componentName}.spec.js
index.js
```

Insert your code in the index.js file, create some tests in the associated spec file and fill in the `.mdx` file with the correct markdown/docz code needed to render the file in the docz service (see other completed components for the general structure you will need to use).

Lastly, ensure that you export the new component in the `wh-uikit/src/index.js` file as otherwise users will not be able to include the component as a discreet import in their own projects. You can skip this step if you are only using the component internally within the UI kit and don't need users to be able to directly import it.
