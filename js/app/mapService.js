/**
 * Created with JetBrains WebStorm.
 * User: saychinu
 * Date: 7/16/13
 * Time: 11:36 PM
 * To change this template use File | Settings | File Templates.
 */


serviceModule.factory('mapService',function(){
    console.log('In map  service');
    var mapObject;
    var DEFAULT_PROJECTION  = new OpenLayers.Projection("EPSG:4326");
    var markers = new OpenLayers.Layer.Markers("Markers");
    var map ={
        initialize:function(elementName,latitide,longitude,zoomlevel){
            var INITIAL_COORDINATES = new OpenLayers.LonLat(latitide, longitude);
            //Initialize Map
            mapObject = new OpenLayers.Map(elementName);
            //Wire up Open Street Map API
            var osm = new OpenLayers.Layer.OSM.TransportMap();
            //Add OSM to map
            mapObject.addLayers([osm]);
            mapObject.addControl(new OpenLayers.Control.LayerSwitcher());
            //Center the Map to Pune
            mapObject.setCenter(INITIAL_COORDINATES.transform(DEFAULT_PROJECTION,mapObject.getProjectionObject()), zoomlevel);
            //Add Marker Layer
            mapObject.addLayer(markers);
        },
        addMarker:function(data,clickHandler){
            console.log("constructing a marker at lat:"+data.latitude+" and lon:"+data.longitude);
            var size = new OpenLayers.Size(32, 37);
            var offset = new OpenLayers.Pixel(-(size.w / 2), -size.h);
            var icon = new OpenLayers.Icon('../resources/images/marker-icon-48.png', size, offset);
            icon.setOpacity(1.0);
            var coordinates = new OpenLayers.LonLat(data.longitude,data.latitude);
            coordinates.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
            var marker = new OpenLayers.Marker(coordinates, icon);
            /*marker.events.register("mouseout", marker,function () {
                console.log("Out the marker " + this.id + " at place " + this.lonlat);
                this.inflate(1.1);
            });*/
            marker.events.register("click", marker,function(){
                clickHandler(this);
            });
            markers.addMarker(marker);
        },
        removeMarker:function(data){
            console.log("removing markers at lat:"+data.latitude+" and lon:"+data.longitude);
            console.log(markers);
            _.each(markers,function(marker){
                console.log("removing markers at lat:"+marker.map.layerContainerOrigin.lat);
            });
            markers.clearMarkers();
        },
        setCenter:function(lonlat){
            console.log('moving center at '+lonlat);
            mapObject.centerLayerContainer(lonlat);
        },
        zoomIn:function(){
            mapObject.zoomIn();
        }
    }
    return map;

});