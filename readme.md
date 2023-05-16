# 🦑 Shoggoth 🦑

A powerful npm package for managing AI-powered backends, featuring a multitude of masks, tools, and models.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Features

- 👺 Masks -> Create a multitude of personas for your LLM, call and manage each at will.
- 🔧 Tools -> Default tool integration. Create your own custom tools and let the shoggoth sort it's
uses and outputs
- 🧠 Models -> Configure different models to use on your backend, calling the right model for each job.
- 💬 Convos -> Manage the conversations history, keeping the token count inside the limits of the model API.
- 🦑 Shoggoth -> Manage all the masks, tools, models and convos. Provides a simple interface to send messages, parse answers and activate tools. Provide hooks for interactions in your backend.

## Installation

Install the package using npm:

```bash
npm install shoggoth
```

## Usage

Shoggoth provides the base objects for a simple implementation. You should extend the base classes to customize the shoggoth to your needs.

Below is a simple example using the built-in classes:

```js
const { Mask, Convo, GPT3_5, Shoggoth } = require('shoggoth');

Convo.convo.push('What is a shoggoth?');

let answer = Shoggoth.sendConvo(Mask, Convo, Model);

console.log(answer);
```

## API Documentation

Please refer to the Github Wiki:

[shoggoth docs](https://github.com/lhemerly/shoggoth/wiki)

## Examples

In construction

## Contributing

Anyone is welcome to contribute.

Please follow the guideline below:

1 - Open an issue first. Any pull request should be througly discussed before being implemented.

2 - Fork the repository.

3 - Create a new branch with the name of the feature or fix.

4 - Make your changes.

5 - Write tests for your changes.

6 - Open a pull request. The pull request will only be reviewed if it pass the the linter, prettier and tests.

## License

[ISC](https://choosealicense.com/licenses/isc/)
