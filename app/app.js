// actuators
import ReactiveMap from './actuators/ReactiveMap';
import GeoDistanceSlider from './sensors/GeoDistanceSlider';
import GeoDistanceDropdown from './sensors/GeoDistanceDropdown';
import PlacesSearch from './sensors/PlacesSearch';
import reactivebase from '@appbaseio/reactivebase';

var combineObj = {
	ReactiveMap: ReactiveMap,
	GeoDistanceSlider: GeoDistanceSlider,
	GeoDistanceDropdown: GeoDistanceDropdown,
	PlacesSearch: PlacesSearch
};

for(let component in reactivebase) {
	combineObj[component] = reactivebase[component];
}

module.exports = combineObj;
