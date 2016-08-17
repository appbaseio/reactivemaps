# Realtime React Map library

## Using it

Include the map library in your html file with your key    
``` javascript    
<script type="text/javascript" src="http://maps.google.com/maps/api/js?key=Your_key_here"></script>
```    

Then to use it include the Appbase Map library    
``` javascript    
import {AppbaseMap} from './AppbaseMap'
```     

and then use the AppbaseMap component    
``` javascript    
<AppbaseMap
  config={config}
  fieldName="venue"
  defaultZoom={13}
  defaultCenter={{ lat: 37.74, lng: -122.45 }}
  historicalData={true}
  onDelete={this.onDelete}
  onIndex={this.onIndex} />
```    

- **config** is the object which contains username, password, type of Appbase
``` javascript    
{
  "appname": "map-demo",
  "username": "mgVijsReD",
  "password": "d67f1d62-26c5-49cb-b8b3-c6e2a6f04e74",
  "type": "demo"
}
```     

- `fieldName` : `string`: is the name of the field which contains the latitude and longitude of the markers for which you want to plot on the map    
- `historicalData`: `Boolean`: is the boolean field which on true, shows the old results and on false, will only run searchstream(). Defaulted to `true`    
- `searchComponent`: `"appbase"` or `"google"`: is the option for displaying the searchComponent in the Google maps. If `appbase` is selected, then searchField needs to be specified. Defaulted to `google`.    
- `searchField`: `String`: is the name of the field on which Appbase location search will be enables.    
-  `markerCluster`: `Boolean`: is the property which decides on clustering the markers. Defaulted to `true`     
- `onDelete`: is the event which is fired when any element is deleted from the map. It has argument which contains the object which was deleted.    
- `onIndex`is the event which is fired when any element is added into the map. It has argument which contains the object which was indexed.        

## AppbaseSearch

- `fieldName` : `string`: is the name of the field which contains the latitude and longitude of the markers for which you want to plot on the map    
- `placeholder`: `string`: is the string field which decides placeholder for the search input. Default to `Search...`    
- `isGeoSearch`: `"Boolean"`: is the boolean option for whether displaying the search field as input term search or is it geoSearch. Defaulted to `false`     
- `size`: `number`: is the number field which decides how many items needs to be displayed in the search items. Defaulted to 10.    

## AppbaseList

- `fieldName` : `string`: is the name of the field which contains the latitude and longitude of the markers for which you want to plot on the map    
- `size`: `number`: is the number field which decides how many items needs to be displayed in the List. Defaulted to 60.    
- `showCount`: `"Boolean"`: is the boolean option for whether displaying the count along with the items. Defaulted to `true`.    
- `multipleSelect`: `Boolean`: is the boolean option to select whether the only single item could be selected in the List or if it is multiple selectable. Defaulted to `true`.   
-  `sort`: `count` or `asc` or `desc`: is the property which decides on how the list should be sorted. `count` sorts the list based on the count  in the desc order. `asc` sorts the list in the ascending order of the term (Alphabetical). `desc` sorts the list in the descending order of the term. Defaulted to `count`.    

## AppbaseSlider

- `fieldName` : `string`: is the name of the field which contains the latitude and longitude of the markers for which you want to plot on the map    
- `minThreshold`: `number`: is the number field which decides the minimum threshold value for the slider. Defaulted to 0.    
- `maxThreshold`: `number`: is the number field which decides the maximum threshold value for the slider. Defaulted to 20.    
- `values`: `Object`: is the object which has property min and max which tells the default selected value.     

```   
values: {
  min: 0,
  max: 20,
}
```     

## Contributing
```     
npm install
```    

```     
npm run webpack-server
```   