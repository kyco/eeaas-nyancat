# Nyancat

This is an easter egg to be used with the "eeaas" package.


## Installation

```javascript
yarn add eeaas
yarn add eeaas-nyancat
```

Once installed you can import the easter egg and enable it.


## Usage

```javascript
import Eeaas from 'eeaas';
import Nyancat from 'eeaas-nyancat';

Eeaas.register(Nyancat); // Register nyancat
Eeaas.enable(); // Enable all easter eggs, or alternatively use `Eeaas.Eggs.Nyancat.enable()` to only enable nyancat
```

To test if it works type "nyan" while the app is running. You should be presented with nyancat flying though the night sky following your cursor. Use the "esc" key to cancel the game.


## Custom keylisteners

To use different keylisteners change the `startTrigger` and/or `stopTrigger` attributes on the Nyancat object.

```javascript
import Eeaas from 'eeaas';
import Nyancat from 'eeaas-nyancat';

Nyancat.startTrigger = 'secretstring';
Nyancat.stopTrigger = ['esc', 'stop'];

Eeaas.register(Nyancat);
Eeaas.enable();
```

Now, typing "secretstring" will launch the game. Cancel the game by pressing the "esc" key or typing "stop".


## Custom start and/or stop trigger methods

To write your own custom methods you'll have to overwrite the `enable` and `disable` attributes on the Nyancat object as well as the relevant "trigger" attributes.

Example: You want to trigger the game only when a button is clicked

Add a button to your markup:
```
<button id="nyancat-trigger-button">Nyancat trigger</button>
```

Update the `enable`, `disable` and `startTrigger` attributes:
```javascript
import Eeaas from 'eeaas';
import Nyancat from 'eeaas-nyancat';

Object.assign(Nyancat, {
  enable() {
    this.startTrigger();
  },

  disable() {
    document.getElementById('nyancat-trigger-button').removeEventListener('click', this.start);
    this.stop();
  },

  startTrigger() {
    // The button needs to be in the DOM by the time this code runs
    document.getElementById('nyancat-trigger-button').addEventListener('click', this.start);
  }
});

Eeaas.register(Nyancat);
Eeaas.enable();
```
