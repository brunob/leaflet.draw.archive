leaflet.draw
============

Drawing handler and control for Leaflet


What ?
------

This leaflet plugin provides two new elements for you maps :

- L.Map.Draw : enbale/disable map drawing mode of your map
- L.Control.Draw : add a drawing control bar to your map

For now, this plugin allow drawing of polygon or polyline.

How ?
------

Add a drawing control bar to the map

```
drawControl = new L.Control.Draw();
map.addControl(drawControl);
```

Enable drawing mode on a map

```
map.draw.enable();
```

A drawend event is fired when the user finish is drawing, you can listen to this event like this

```
map.on('drawend', function(e) {
	console.log(e.poly);
});
```

The poly propertie of the event represent the polyline or polygon object drawn by the user.

Where ?
------

Source code : https://github.com/brunob/leaflet.draw

Demo : http://brunob.github.com/leaflet.draw/
