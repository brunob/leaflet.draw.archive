L.Control.Draw = L.Control.extend({
	options: {
		position: 'topright',
		drawMarker: true,
		drawPolyline: true,
		drawPolygon: true,
		drawRectangle: true
	},

	onAdd: function (map) {
	var drawName = 'leaflet-control-draw', //TODO
		barName = 'leaflet-bar',
		partName = barName + '-part',
		container = L.DomUtil.create('div', drawName + ' ' + barName),
		buttons = [];

		if(this.options.drawMarker) buttons.push(this._createButton('Draw a marker', drawName + '-marker ' + partName, container, this._drawMarker, map.draw));
		if(this.options.drawPolyline) buttons.push(this._createButton('Draw a polyline', drawName + '-polyline ' + partName, container, this._drawPolyline, map.draw));
		if(this.options.drawPolygon) buttons.push(this._createButton('Draw a polygon', drawName + '-polygon ' + partName, container, this._drawPolygon, map.draw));
		if(this.options.drawRectangle) buttons.push(this._createButton('Draw a rectangle', drawName + '-rectangle ' + partName, container, this._drawRectangle, map.draw));
		
		// Add in the top and bottom classes so we get the border radius
		L.DomUtil.addClass(buttons[0], partName + '-top');
		L.DomUtil.addClass(buttons[buttons.length - 1], partName + '-bottom');
		
		return container;
	},

	_createButton: function (title, className, container, fn, context) {
		var link = L.DomUtil.create('a', className, container);
		link.href = '#';
		link.title = title;

		L.DomEvent
			.addListener(link, 'click', L.DomEvent.stopPropagation)
			.addListener(link, 'click', L.DomEvent.preventDefault)
			.addListener(link, 'click', fn, context);

		return link;
	},

	_drawMarker: function () {
		this.setType('marker');
		this.enable();
	},
	
	_drawPolyline: function () {
		this.setType('polyline');
		this.enable();
	},
	
	_drawPolygon: function () {
		this.setType('polygon');
		this.enable();
	},
	
	_drawRectangle: function () {
		this.setType('rectangle');
		this.enable();
	}	
	
});

L.Map.addInitHook(function () {
	if (this.options.drawControl) {
		this.drawControl = new L.Control.Draw();
		this.addControl(this.drawControl);
	}
});