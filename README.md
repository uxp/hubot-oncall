# Hubot: hubot-oncall

[![Build Status](https://travis-ci.org/uxp/hubot-oncall.svg?branch=master)](https://travis-ci.org/uxp/hubot-oncall)

## On Call Rotations

Let Hubot keep track of your OnCall rotation so you don't have to.

## Installation

Add **hubot-oncall** to your `package.json` file:

```json
"dependencies": {
	"hubot-oncall": "^0.1.0"
}
```

as well as your `external-scripts.json`:

```json
[
	...
	"hubot-oncall",
	...
]
```

## Usage

Supports various query grammar:
```
hubot who's oncall?              - Get the oncall user for today
hubot who is oncall tomorrow     - Get the oncall user for tomorrow
hubot who was oncall yesterday?  - Get yesterday's oncall user
hubot who's oncall Sunday?       - Get the oncall user for Sunday
hubot whos oncall on friday      - Get the oncall user for the coming Friday
hubot who was oncall last monday - Get last Monday's oncall user
```

