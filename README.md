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
    markerCluster={false}
    markerOnDelete={this.markerOnDelete}
    markerOnIndex={this.markerOnIndex}
    markerOnClick={this.markerOnClick}
    markerOnDblclick={this.markerOnDblclick}
    markerOnMouseover={this.markerOnMouseover}
    markerOnMouseout={this.markerOnMouseout} 
    mapStyle="Blue Water" 
    depends={{
      CitySensor: ["reposition"],
      SearchAsMoveSensor: ["SearchAsMove"],
      MapStyleSensor: ["MapStyles"]
    }} />
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
- `markerOnDelete`: is the event which is fired when any element is deleted from the map. It has argument which contains the object which was deleted.    
- `markerOnIndex`is the event which is fired when any element is added into the map. It has argument which contains the object which was indexed.    
- `markerOnClick`, `markerOnDblclick`, `markerOnMouseover`, `markerOnMouseout` are the events which will be fired on click, doubleclick, mouse over, mouse out actions on markers.
- `mapStyle`: is the property which set the default map style. Available options for mapStyle is: `"MapBox"`, `"Blue Essence"`, `"Blue Water"`,  `"Flat Map"`,  `"Light Monochrome"`,  `"Midnight Commander"`,  `"Unsaturated Browns"`.  
- `depends`: is the property which contains the object of sensor and method, In above example on change of "CitySensor" value then it will trigger `reposition` internal method of AppbaseMap. We exposed few methods to use on changing of dependency: `reposition`, `SearchAsMove`, `MapStyles`.  

## AppbaseSearch

- `fieldName` : `string`: is the name of the field which contains the latitude and longitude of the markers for which you want to plot on the map    
- `placeholder`: `string`: is the string field which decides placeholder for the search input. Default to `Search...`    
- `isGeoSearch`: `"Boolean"`: is the boolean option for whether displaying the search field as input term search or is it geoSearch. Defaulted to `false`     
- `size`: `number`: is the number field which decides how many items needs to be displayed in the search items. Defaulted to 10.  
- `depends`: Same way as AppbaseMap we provides internal method for AppbaseSearch as well. We exposed a method to use on changing of dependency: `searchFilterByCity`.    

## AppbaseList

- `fieldName` : `string`: is the name of the field which contains the latitude and longitude of the markers for which you want to plot on the map    
- `size`: `number`: is the number field which decides how many items needs to be displayed in the List. Defaulted to 60.    
- `showCount`: `"Boolean"`: is the boolean option for whether displaying the count along with the items. Defaulted to `true`.    
- `multipleSelect`: `Boolean`: is the boolean option to select whether the only single item could be selected in the List or if it is multiple selectable. Defaulted to `true`.   
-  `sort`: `count` or `asc` or `desc`: is the property which decides on how the list should be sorted. `count` sorts the list based on the count  in the desc order. `asc` sorts the list in the ascending order of the term (Alphabetical). `desc` sorts the list in the descending order of the term. Defaulted to `count`.  
- `depends`: Same way as AppbaseMap we provides internal method for AppbaseList as well. We exposed a method to use on changing of dependency: `topicFilterByCity`.

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

## MapStyles
- `fieldName` : `string`: is the name of the field which con be used to store value.    
- `defaultSelected`: `string`: is the name of default theme.     

## SearchAsMove
- `fieldName` : `string`: is the name of the field which con be used to store value.    

## Define dependency on other sensors
Let's take an example if topics lists is depenedent on city selection (topic sensor is dependent on city sensor) then we should pass selected city value in topic sensor and get the topic list according to selected city.

To achieve this we should pass following things to topic sensor:
- `selectedSensor`: which contains all the selected sensor values.
- `sensorOnSelect`: an event which is filred on select/change of sensor value. - which is responsible to store selected values of sensors (this should be passed in both sensors - city and topic).
- `depends`: an object which contains dependent sensors
```
depends= {
    {'city': this.state.mapping.city}
}
```



## Elasticsearch Mapping

1. Close the Index:      

```
curl 'http://scalr.api.appbase.io/map_demo/_close' -X POST -d '{}' -u aT29UsiAp:e0d26007-d818-4559-8244-c3c2fbad45ad -H 'Content-Type: application/json'
```    

2. Update the settings:

```    
curl 'http://scalr.api.appbase.io/map_demo/_settings' -X PUT -d '{
  "analysis": {
    "filter": {
      "nGram_filter": {
        "type": "edge_ngram",
        "min_gram": 1,
        "max_gram": 20,
        "token_chars": [
          "letter",
          "digit",
          "punctuation",
          "symbol"
        ]
      }
    },
    "analyzer": {
      "nGram_analyzer": {
        "type": "custom",
        "tokenizer": "whitespace",
        "filter": [
          "lowercase",
          "asciifolding",
          "nGram_filter"
        ]
      },
      "body_analyzer": {
        "type": "custom",
        "tokenizer": "standard",
        "filter": [
          "lowercase",
          "asciifolding",
          "stop",
          "snowball",
          "word_delimiter"
        ]
      },
      "standard_analyzer": {
        "type": "custom",
        "tokenizer": "standard",
        "filter": [
          "lowercase",
          "asciifolding"
        ]
      },
      "whitespace_analyzer": {
        "type": "whitespace",
        "tokenizer": "whitespace",
        "filter": [
          "lowercase",
          "asciifolding"
        ]
      }
    }
  }
}' -u aT29UsiAp:e0d26007-d818-4559-8244-c3c2fbad45ad -H 'Content-Type: application/json'
```    

3. Open the Index:

```
curl 'http://scalr.api.appbase.io/map_demo/_open' -X POST -d '{}' -u aT29UsiAp:e0d26007-d818-4559-8244-c3c2fbad45ad -H 'Content-Type: application/json'
```    

4. Update the mapping: 

```
curl 'http://scalr.api.appbase.io/map_demo/_mapping/meetupdata1?ignore_conflicts=true&update_all_types=true' -X PUT -d '{
  "meetupdata1": {
    "properties": {
      "group": {
        "properties": {
          "group_city_new": {
            "type": "multi_field",
            "fields": {
              "group_city_simple": {
                "type": "string",
                "index": "not_analyzed"
              },
              "group_city_ngrams": {
                "type": "string",
                "analyzer": "nGram_analyzer",
                "search_analyzer": "whitespace_analyzer"
              }
            }
          },
          "group_city": {
            "type": "string",
            "fields": {
              "raw": { 
                "type":  "string",
                "index": "not_analyzed"
              }
            }
          },
          "group_topics": {
            "properties": {
              "topic_name_new": {
                "type": "multi_field",
                "fields": {
                  "topic_name_simple": {
                    "type": "string",
                    "index": "not_analyzed"
                  },
                  "topic_name_ngrams": {
                    "type": "string",
                    "analyzer": "nGram_analyzer",
                    "search_analyzer": "whitespace_analyzer"
                  }
                }
              }
            }
          }
        }
      },
      "venue_new": {
        "type": "multi_field",
        "fields": {
          "venue_name_simple": {
            "type": "string",
            "index": "not_analyzed"
          },
          "venue_name_ngrams": {
            "type": "string",
            "analyzer": "nGram_analyzer",
            "search_analyzer": "whitespace_analyzer"
          }
        }
        
      }
    }
    
  }
}

' -u aT29UsiAp:e0d26007-d818-4559-8244-c3c2fbad45ad -H 'Content-Type: application/json'
```
## Contributing
```     
npm install
```    

```     
npm run webpack-server
```   