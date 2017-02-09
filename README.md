# ReactiveMaps

[![Join the chat at https://gitter.im/appbaseio/reactivemaps](https://badges.gitter.im/appbaseio/reactivemaps.svg)](https://gitter.im/appbaseio/reactivemaps?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A React components library for building maps that update in realtime.

![](https://i.imgur.com/PqRqJDz.png)

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

ReactiveMaps uses Google Maps underneath. You should include this script in your app's <head> element with an API key to get access to 25,000 daily map views*.

```javascript    
<script type="text/javascript" src="http://maps.google.com/maps/api/js?key=Your_key_here"></script>
```    

### Installation

``` javascript
npm install --save @appbaseio/reactivemaps
```

And then import the components

```javascript    
import {
  SingleList,
  ReactiveBase,
  ReactiveMap
} from '@appbaseio/reactivemaps';
```     

Besides importing the components, there is a single CSS file that should be added in your app's &lt;head&gt; element along with a CSS framework of your choice. We have tested with Materialize and Bootstrap while building reactivemaps.

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css">
<link rel="stylesheet" href="node_modules/@appbaseio/reactivemaps/dist/css/style.min.css">
```

### Building a Simple App

```javascript
  <ReactiveBase 
    app="map-demo"
    username="mgVijsReD"
    password="d67f1d62-26c5-49cb-b8b3-c6e2a6f04e74"/>
```

where
- **app** is the app name of the appbase.io app,
- **username** is the app's access username,
- **password** is the app's access password.

username:password form the credentials to access an [appbase.io](https://appbase.io) app. Follow the steps as shown in the gif for fetching the app credentials.

![App creation GIF](https://i.imgur.com/Y6HiHnJ.gif)

Additionally, you can also pass **type** and **theme** props. **type** determines the scope of data to be accessed within the app, it defaults to the entire app. **theme** determines the overall look and feel. Available themes include `rbc-blue`, `rbc-green`, `rbc-red`, `rbc-orange`, `rbc-yellow` and `rbc-dark`.

### Adding Components

Adding `SingleList` and `ReactiveMap` component inside your React component's render() method should look something like this.

```javascript
  <ReactiveBase ... >
    <div class="row">
      <div class="col-xs-6">
        <SingleList
          title="SingleList Sensor"
          componentId="SingleListSensor"
          appbaseField="group.group_city"
          size={50}
          showSearch={true}
        />
      </div>
      <div class="col-xs-6">
        <ReactiveMap
          title="ReactiveMap Actuator"
          componentId="ReactiveMapActuator"
          appbaseField="venue"
          actuate={{
            "SingleListSensor": { "operation": "must" }
          }}
        />
      </div>
    </div>
  </ReactiveBase>
```

If you don't already have a React app, we recommend checking out the [starter app](https://github.com/appbaseio-apps/reactivemaps-starter-app) for getting started with ReactiveMaps.

## Developing Locally

```
npm install
```

Start the development server on port `8012`:

```
npm start
```

Examples can be accessed at http://localhost:8012/examples.  

Docs can be accessed at http://localhost:8012/manual.

You can also run storybook (aka component playground) on port `9009` with

```
npm run storybook
```
