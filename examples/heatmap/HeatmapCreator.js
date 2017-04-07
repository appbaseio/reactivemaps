module.exports = {
	/* Create grid bounds on the map, called from Map.js on map initialization. */
	createGridLines: function(mapBounds, opacity) {
		var llOffset =  0.00666666666666667*3;
		var gridCenterPointsArray = [];

		// north, south, east, and west coordinates of the map.
		var north = mapBounds.getNorthEast().lat();
		var south = mapBounds.getSouthWest().lat();
		var east = mapBounds.getNorthEast().lng();
		var west = mapBounds.getSouthWest().lng();

		// defines the size of the grid sides.
		var topLat = Math.ceil(north / llOffset) * llOffset;
		var rightLong = Math.ceil(east / llOffset) * llOffset;
		var bottomLat = Math.floor(south / llOffset) * llOffset;
		var leftLong = Math.floor(west / llOffset) * llOffset;

		// generates each grid's coordinates
		for (var latitude = bottomLat; latitude <= topLat+3*llOffset; latitude += llOffset) {
			if(latitude >= topLat + llOffset){
				leftLong += 2*llOffset;
				rightLong -= llOffset;
			}
			for(var longitude = leftLong+llOffset; longitude<= rightLong; longitude += llOffset) {
				var upLeftCoord = {
					lat: latitude + llOffset/2,
					lng: longitude - llOffset/2
				};
				var upRightCoord= {
					lat: latitude + llOffset/2,
					lng: longitude + llOffset/2
				};
				var lowLeftCoord= {
					lat: latitude - llOffset/2,
					lng: longitude - llOffset/2
				};
				var lowRightCoord= {
					lat: latitude - llOffset/2,
					lng: longitude + llOffset/2
				};

				// initial default color when map loads and grids are created
				var color = "#00ffffff";
				var opacity = opacity;

				// grid object representing its center and other properties
				var gridCenterObject = {
					lat: latitude,
					long: longitude,
					location: new google.maps.LatLng(latitude, longitude),
					upLeftCoord: upLeftCoord,
					upRightCoord: upRightCoord,
					lowLeftCoord: lowLeftCoord,
					lowRightCoord: lowRightCoord,
					boundaries: [[upLeftCoord.lat, upLeftCoord.lng], [upRightCoord.lat, upRightCoord.lng], [lowRightCoord.lat, lowRightCoord.lng], [lowLeftCoord.lat, lowLeftCoord.lng]],
					surgePrice: 0.0,
					color: color,
					opacity: opacity,
					cell: this.createCell(opacity, color, upLeftCoord, upRightCoord, lowRightCoord, lowLeftCoord)
				};
				gridCenterPointsArray.push(gridCenterObject);
			}
		}
		return gridCenterPointsArray;
	},

	createCell: function(opacity, color, upLeftCoord, upRightCoord, lowRightCoord, lowLeftCoord) {
		// bounds for the cell polygon
		var polyCoords = [
			upLeftCoord,
			upRightCoord,
			lowRightCoord,
			lowLeftCoord
		];

		// cell properties
		var cellProps = {
			paths: polyCoords,
			strokeColor: color,
			strokeOpacity: opacity,
			strokeWeight: 1,
			fillColor: color,
			fillOpacity: opacity
		};
		// console.log(opacity, color);

		return cellProps;
	},

	isInside: function(point, vs) {
		var x = point[0], y = point[1];
		var inside = false;
		for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
				var xi = vs[i][0], yi = vs[i][1];
				var xj = vs[j][0], yj = vs[j][1];

				var intersect = ((yi > y) != (yj > y))
						&& (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
				if (intersect) inside = !inside;
		}
		return inside;
	},

	fillColor: function(polygonAllData) {
		polygonAllData = polygonAllData.map((polygon) => {
			let cellProp = detectColor(polygon.markers.length);
			polygon.color = cellProp.color;
			polygon.opacity = cellProp.opacity;
			polygon.cell = this.createCell(polygon.opacity, polygon.color, polygon.upLeftCoord, polygon.upRightCoord, polygon.lowRightCoord, polygon.lowLeftCoord);
			return polygon.cell;
		});
		return polygonAllData;

		function detectColor(markers) {
			let polygon = {};
			// colors and labels according to the surge price measures
			if(markers < 1){
				polygon.color = "#00ffffff";
				polygon.opacity = 0.0;
			}
			else if(markers < 2){
				polygon.color = "#ec891d";
				polygon.opacity = 0.50;
			}
			else if(markers < 3){
				polygon.color = "#ff0000";
				polygon.opacity = 0.50;
			}
			else{
				polygon.color = "#4c0000";
				polygon.opacity = 0.50;
			}
			return polygon;
		}
	}

}
