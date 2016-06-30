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

- **fieldName** is the name of the field which contains the latitude and longitude of the markers for which you want to plot on the map    
- **historicalData** is the boolean field which on true, shows the old results and on false, will only run searchstream()     
- **onDelete** is the event which is fired when any element is deleted from the map. It has argument which contains the object which was deleted.    
- **onIndex**is the event which is fired when any element is added into the map. It has argument which contains the object which was indexed.        

## Contributing
```     
npm install
```    

```     
npm run webpack-server
```   