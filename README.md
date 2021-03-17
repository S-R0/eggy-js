
# EggyJS

**EggyJS** is a Javascript micro Library for simple, lightweight toast popups. The goal of this library was to create something that meets the following criteria

  

* Dependency-less

* Lightweight

* Quick and efficient

* As minimal as possible, but still ticking all boxes

  

## Current Version

1.2.0

*For more detailed release notes, see `releases.md`*

## Install

  

Eggy JS can be installed one of the following ways

  

### NPM

To install via NPM run the following

```

npm i @s-r0/eggy-js

```

then import the module using

```javascript

import { Eggy } from  '@s-r0/eggy-js';

```

  

### Manually

Manual installation can be done by simply downloading this library and including the build `eggy.js` file. Once downloaded and placed in your directory, import the module like so.

  

```javascript

import { Eggy } from  '{{path_to_eggy.js}}';

```

EggyJS builds the basic CSS required and adds it to the DOM when initialised, **so there is no need to link the provided CSS files.**

  

## Important Information when using

For EggyJS to behave as expected, the following must be met when using

  

* EggyJS resolves a promise, but when its first initialised it checks to see if a `div` in the requested position exists first before building. This is done so that there are no traces of `HTML` or `CSS` on the page when its loaded, to avoid any speed issues. To run multiple EggyJS toasts **in the same position** it must be done synchronously. The first instance of EggyJS must be resolved before trying to add another toast **in the same position**. Failure to run multiple at the same time synchronously will provide in 2 toasts being stacked directly on top of each other, making only 1 visible.

  
  

## Basic Usage

  

Eggy has the default options of showing a success toast with the title `Success!` and the message `Task complete successfully!`, so you can get a standard toast popup simply by running

```javascript

Eggy()

```

But if you want to edit the simple basics of the EggyJS, the most common options to edit are `title`, `message` and `type`. For example

```javascript

Eggy({
    title:  'Whoops!',
    message:  'You done burnt your eggs!',
    type:  'error'
})

```

  

## Options

  

Param | Type | Default | Details

------------ | ------------- | ------------- | -------------

title | `string/boolean` | `'Success'` | The title that gets displayed at the top of the notification. Can be removed by providing `false`.

message | `string/boolean` | `'Task complete successfully!'` | The main message inside the notification. Can be removed by providing `false`.

position | `string` | `'top-right'` | Options avaiable are `'top-right'`, `'top-left'`, `'bottom-right'` and `'bottom-left'`

type | `string` | `'success'` | Options available are `'success'`, `'warning'`, `'info'` and `'error'`

duration | `integer` | `5000` | Duration of the toast notification in milliseconds

styles | `boolean` | `true` | Enable the provided styling for the notifications. If set to `false`, the basic animation and positioning styles will still be applied, but no 'theme' styles will be added.

progressBar | `boolean` | `true` | Enable progress bars. The progress bars will be animated and the duration matches the duration of each individual eggy popup. The **html only** for the progress bar will be added if `styles` is set to `false`, so custom styling can be applied.

  
  

### Callbacks

Calling eggy returns a promise containing the toast `HTMLElement`, so callbacks can be used to modify the toast once its initialised. For example, if we wanted to add a custom class to the toast, we could write

```javascript

Eggy().then((eggytoast) => {
    eggytoast.classList.add('sunny-side-up');
})

```
or if youd prefer `async/await`
```javascript
let eggytoast = await Eggy();
eggytoast.classList.add('sunny-side-up');
```

  

### Stacking

EggyJS will automatically stack if a toast has already been initialised in the specified position. For example

```javascript

await  Eggy({title:  'Top right 1'});
await  Eggy({title:  'Top right 2'});
await  Eggy({title:  'Top left 1', position:  'top-left'});
await  Eggy({title:  'Top left 2', position:  'top-left'});

```

Will build 2 stacked in the top left, and 2 stacked in the top right. Stacking toasts in the same position must be done **synchronously**, please see **Important Information** above.

  
  
  
  

## Editing EggyJS

  

Eggys resources are managed via npm scripts. To edit EggyJS, simply clone this repository and run the command `npm run watch`, then make whatever changes required in the `src` directory. Once complete, run `npm run prod` to build for production.

  

### Javascript

Edit the file `src/eggy.js` to edit the core functionality.

  

### CSS/ScSS

EggyJS comes with the `scss` files used to build the styles. To make your changes, simply edit the `scss` files.

  

If you decide you want to make changes to the core styles or theme, then make any changes to the `eggy.scss` and `theme.scss` files in the `src/scss` directory, once complete run `npm run prod` and eggy will replace inserted string replacers in the JS with your output css. EggyJs builds the styles and appends them on the page **only once first initialised** to avoid any page load or speed issues. The only thing thats loaded on the page initially is the module itself.
  

*Alternatively you can just disable the styles when using EggyJS using the `styles` option and then add your own css to your page as you see fit.*

### Icons

To edit the icons, change the SVG files in the `src/img` directory and run `npm run prod` once complete. 

*Please note, be careful to watch for any extra classes that have been added to the svg files, make sure to include them in your new icons if you want eggy to perform as expected*
  
  

## Authors

**Sam Rutter**

  

## Copyright

Copyright © 2021 Samgraphic

  

## License

EggyJS is under the MIT License