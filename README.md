[![Join the chat at https://gitter.im/appbaseio/reactivemaps](https://badges.gitter.im/appbaseio/reactivemaps.svg)](https://gitter.im/appbaseio/reactivemaps?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) ![Build Status Image](https://img.shields.io/badge/build-passing-brightgreen.svg) [![Code Climate](https://codeclimate.com/github/appbaseio/reactivemaps/badges/gpa.svg)](https://codeclimate.com/github/appbaseio/reactivemaps)

A React components library for building maps that update in realtime.

![](https://i.imgur.com/PqRqJDz.png)

## TOC

1. **[Reactive Maps: Intro](#1-reactive-maps-intro)**   
2. **[Features](#2-features)**  
3. **[Component Playground](#3-component-playground)**
4. **[Live Examples](#4-live-examples)**  
5. **[Installation](#5-installation)**
6. **[Getting Started](#6-getting-started)**  
7. **[Docs Manual](#7-docs-manual)**
8. **[Developing Locally](#8-developing-locally)**  
9. **[Acknowledgements](#9-acknowledgements)**

<br>

## 1. Reactive Maps: Intro

Reactivemaps is a React based components library for building realtime maps. It is built on top of the appbase.io realtime DB service and ships with 20+ components for Lists, Dropdowns, Numeric Range, Sliders, Data Search, Places Search, Distance Slider and Dropdowns, Calendars, Feeds and Maps.

The library is conceptually divided into two parts:  

1. Sensor components and
2. Actuator components.

Each sensor component is purpose built for applying a specific filter on the data. For example:

* A `SingleList` sensor component applies an exact match filter based on the selected item.
* A `RangeSlider` component applies a numeric range query based on the values selected from the UI.

One or more sensor components can be configured to create a combined query context to render the results via an actuator.

**ReactiveMaps** comes with two actuators: `ReactiveMap` and `ReactiveList`. The former displays the filtered data from individual sensor components on a map interface while latter displays the filtered data on a simple list interface.

## 2. Features

### Design

* The sensor / actuator design pattern allows creating complex UIs where any number of sensors can be chained together to reactively update an actuator (or even multiple actuators).
* The library handles the transformation of the UI interactions into database queries. You only need to include the components and associate each with a DB field.
* Built in live updates - Actuators can be set to update results even when the underlying data changes in the DB.
* Comes with a cleanly namespaced styles API that allows extending the existing component styles without hassle.
* Built in `light` and `dark` UI themes. 


### Ease of Use

* [Can be installed with NPM](https://opensource.appbase.io/reactivemaps/manual/v1.0.0/getting-started/Installation.html),
* Can be run in browser without including any NPM or bundlers (gulp, webpack, etc.), see a demo [here](https://github.com/appbaseio-apps/reactivemaps-starter-app#try-in-browser-without-npm),
* Works out of the box with Materialize CSS and comes with a polyfill CSS for Bootstrap. Compatibility for other frameworks can be added too.


## 3. Component Playground

Try the live component playground at [playground](https://opensource.appbase.io/reactivemaps/playground). Look out for the knobs section in the playground part of the stories to tweak each prop and see the udpates.


## 4. Live Examples

A set of examples inspired by real world apps built with the ReactiveMaps library.

- [examples/now](https://opensource.appbase.io/reactivemaps/examples/now) - A checkins based discovery experience.
- [examples/meetupblast](https://opensource.appbase.io/reactivemaps/examples/meetupblast/) - A live feed of meetup RSVPs displayed on a map.
- [examples/heatmap](https://opensource.appbase.io/reactivemaps/examples/heatmap/) - A hetmap example using polygons on a map.
- [examples/earthquake](https://opensource.appbase.io/reactivemaps/examples/earthquake/) - A historical visualization of earthquake data across the globe.
- [examples/transport](https://opensource.appbase.io/reactivemaps/examples/transport/) - A simulated transport example of buses in San Francisco.
- [examples/events](https://opensource.appbase.io/reactivemaps/examples/events/) - An example of the events exposed by the library.

You can check all of them on the [examples page](https://opensource.appbase.io/reactivemaps/examples/).

## 5. Installation

Follow the installation guide from the official docs [here](https://opensource.appbase.io/reactivemaps/manual/v1.0.0/getting-started/Installation.html).

You can try out the library live without any installation via the [interactive tutorial](https://opensource.appbase.io/reactivemaps/onboarding/).

## 6. Getting Started

Follow the getting started guide to build a Hello Maps! app from the official docs [here](https://opensource.appbase.io/reactivemaps/manual/v1.0.0/getting-started/Start.html).


## 7. Docs Manual

The official docs for the library are at [https://opensource.appbase.io/reactivemaps/manual](https://opensource.appbase.io/reactivemaps/manual).

The components are divided into two sections:
* Generic UI components are at [https://opensource.appbase.io/reactivemaps/manual/v1.0.0/components](https://opensource.appbase.io/reactivemaps/manual/v1.0.0/components/).
* Map based UI components are at [https://opensource.appbase.io/reactivemaps/manual/v1.0.0/map-components](https://opensource.appbase.io/reactivemaps/manual/v1.0.0/map-components/).
* Each component's styles API is mentioned in a separate **CSS Styles API** section. See here for [SingleList](https://opensource.appbase.io/reactivemaps/manual/v1.0.0/components/SingleList.html#-singlelist-css-styles-api).
* You can read more about the Styles API here - https://opensource.appbase.io/reactivemaps/manual/v1.0.0/getting-started/StyleGuide.html.


## 8. Developing Locally

```
git clone https://github.com/appbasieo/reactivemaps
npm install
```

Start the development server on port `8012`.

```
npm start
```

Examples can be accessed at [https://localhost:8012/examples](https://localhost:8012/examples).  

You can also start the component playground on port `9009` with

```
npm run storybook
```

By adding the `manual` submodule, you can access the docs locally.

```
git submodule init
cd manual && git submodule update
```

Once added, the docs manual can be accessed at [http://localhost:8012/manual](http://localhost:8012/manual).

## 9. Acknowledgements

Cross-browser testing supported via [BrowserStack ![](https://i.imgur.com/yeYJhJJ.png)](https://browserstack.com).
