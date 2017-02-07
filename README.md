# ReactiveMaps

[![Join the chat at https://gitter.im/appbaseio/reactivemaps](https://badges.gitter.im/appbaseio/reactivemaps.svg)](https://gitter.im/appbaseio/reactivemaps?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A React components library for building maps that update in realtime.

## Playground

Try the live playground at https://opensource.appbase.io/reactivemaps/playground.

## Examples

- [examples/now](https://opensource.appbase.io/reactivemaps/examples/now)
- [examples/meetupblast](https://opensource.appbase.io/reactivemaps/examples/meetupblast/)
- [examples/heatmap](https://opensource.appbase.io/reactivemaps/examples/heatmap/)
- [examples/earthquake](https://opensource.appbase.io/reactivemaps/examples/earthquake/)
- [examples/transport](https://opensource.appbase.io/reactivemaps/examples/transport/)
- [examples/list](https://opensource.appbase.io/reactivemaps/examples/list/)
- [examples/events](https://opensource.appbase.io/reactivemaps/examples/events/)

## Using it

Include the map library in your html file with your key

```javascript    
<script type="text/javascript" src="http://maps.google.com/maps/api/js?key=Your_key_here"></script>
```    

### Installation

``` javascript
npm install --save @appbaseio/reactivemaps
npm install --save @appbaseio/reactivebase
```

And then import the components

``` javascript    
import {
  ReactiveMap
} from 'reactivemaps';

import {
  DataSearch,
  RangeSlider,
  SingleList,
  ReactiveBase
} from 'reactivebase';
```     

ReactiveMaps provides components specific to the map interface. It comes `GeoDistanceSlider`, `GeoDistanceDropdown`, `PlacesSearch` and `ReactiveMap`.

ReactiveBase provides components that are generic in nature. Amongst many others, `ReactiveBase`, `DataSearch`, `RangeSlider`, and `SingleList` components belong to ReactiveBase.

## Description

### ReactiveBase

``` javascript
  <ReactiveBase 
    app="map-demo"
    username="mgVijsReD"
    password="d67f1d62-26c5-49cb-b8b3-c6e2a6f04e74"/>
```

where
- **app** is the app name of the appbase.io app,
- **username** is the app's access username,
- **password** is the app's access password.

username:password form the credentials to access an appbase.io app.

Additionally, you can also pass **type** and **theme** props. **type** determines the scope of data to be accessed within the app, it defaults to the entire app. **theme** determines the overall look and feel. Available themes include `rbc-blue`, `rbc-green`, `rbc-red`, `rbc-orange`, `rbc-yellow` and `rbc-dark`.


## Developing Locally

```
npm install && bower install
```

Start the development server on port `8012`:

```
npm start
```

<<<<<<< HEAD
Run Storybook on port `9009`
=======
Run Storybook on port `9009`:
>>>>>>> a4d74bdd586b44918e27ad968211eefa76db0cc2

```
npm run storybook
```
