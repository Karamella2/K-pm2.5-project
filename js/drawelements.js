// 绘制元素 添加进地图
var drawnItems = L.featureGroup().addTo(map);

// var drawBtns = document.querySelector('#drawbtns');
// drawBtns.addEventListener()

// 添加绘制工具控件
map.addControl(new L.Control.Draw({
    position: 'bottomleft',
    edit: {
        featureGroup: drawnItems,
        poly: {
            allowIntersection: false
        }
    },
    draw: {
        polygon: {
            allowIntersection: false,
            showArea: true
        }
    }
}));

// 创建对象，将弹出窗口绑定至图层，添加到要素组
map.on(L.Draw.Event.CREATED, function (event) {
    var layer = event.layer;
    var content = getPopupContent(layer);
    if (content !== null) {
        layer.bindPopup(content);
        // console.log(getPopupContent);
    }
    drawnItems.addLayer(layer);
});

var _round = function (num, len) {
    return Math.round(num * (Math.pow(10, len))) / (Math.pow(10, len));
};
// Helper method to format LatLng object (x.xxxxxx, y.yyyyyy)
var strLatLng = function (latlng) {
    return "(" + _round(latlng.lat, 6) + ", " + _round(latlng.lng, 6) + ")";
};

// 点击绘制要素的弹框显示内容
var getPopupContent = function (layer) {
    // 点要素，返回经纬度
    if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
        return strLatLng(layer.getLatLng());
        // 圆形，返回圆心经纬度，半径
    } else if (layer instanceof L.Circle) {
        var center = layer.getLatLng(),
            radius = layer.getRadius();
        return "Center: " + strLatLng(center) + "<br />"
            + "Radius: " + _round(radius, 2) + " m";
        // 矩形或多边形，返回面积
    } else if (layer instanceof L.Polygon) {
        var latlngs = layer._defaultShape ? layer._defaultShape() : layer.getLatLngs(),
            area = L.GeometryUtil.geodesicArea(latlngs);
        return "Area: " + L.GeometryUtil.readableArea(area, true);
        // 折线 返回距离
    } else if (layer instanceof L.Polyline) {
        var latlngs = layer._defaultShape ? layer._defaultShape() : layer.getLatLngs(),
            distance = 0;
        if (latlngs.length < 2) {
            return "Distance: N/A";
        } else {
            for (var i = 0; i < latlngs.length - 1; i++) {
                distance += latlngs[i].distanceTo(latlngs[i + 1]);
            }
            return "Distance: " + _round(distance, 2) + " m";
        }
    }
    return null;
};