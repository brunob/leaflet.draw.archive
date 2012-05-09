L.Map.Draw = L.Handler.extend({
	
	options: {
		icon: new L.DivIcon({
			iconSize: new L.Point(8, 8),
			className: 'leaflet-div-icon leaflet-editing-icon'
		})
	},
	
	initialize: function (map, type, options) {
		this._map = map;
		this.setType(type);
		L.Util.setOptions(this, options);
	},
	
	addHooks: function () {
		if(this._type == 'polygon')
			this._poly = new L.Polygon([]);
		else
			this._poly = new L.Polyline([]);
		
		this._initMarkers();
		this._map.addLayer(this._markerGroup);
		this._map.addLayer(this._poly);
		this._map.on('click', this._drawPoly);
	},

	removeHooks: function () {
		this._map.removeLayer(this._markerGroup);
		delete this._markerGroup;
		delete this._markers;
		delete this._poly;
		this._map.off('click', this._drawPoly);
	},

	setType: function (type) {
		this._type = type;
		return this._type;
	},

	_initMarkers: function () {
		if (!this._markerGroup) {
			this._markerGroup = new L.LayerGroup();
		}
		
		this._markers = [];
		
		var latlngs = this._poly._latlngs,
		    i, len, marker;

		for (i = 0, len = latlngs.length; i < len; i++) {
			marker = this._createMarker(latlngs[i], i);
			this._markers.push(marker);
		}
	},
	
	_createMarker: function (latlng) {
		var marker = new L.Marker(latlng, {
			icon: this.options.icon
		});
		
		marker.on('click', this._map.draw.disable, this);
		
		this._markerGroup.addLayer(marker);

		return marker;
	},
	
	_drawPoly: function (e) {
		this.draw._poly.addLatLng(e.latlng);
		this.draw._markerGroup.clearLayers();
		this.draw._initMarkers();
	}
});

L.Map.addInitHook('addHandler', 'draw', L.Map.Draw);