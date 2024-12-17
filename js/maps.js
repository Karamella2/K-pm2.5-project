// 地图页面
// 加载在线地图
// 智图地图 
var normalm1 = L.tileLayer.chinaProvider('Geoq.Normal.Map', {
    maxZoom: 18,
    minZoom: 3
});

// 天地图
var normalm = L.tileLayer.chinaProvider('TianDiTu.Normal.Map', {
    maxZoom: 18,
    minZoom: 3
}),
    normala = L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion', {
        maxZoom: 18,
        minZoom: 3
    }),
    imgm = L.tileLayer.chinaProvider('TianDiTu.Satellite.Map', {
        maxZoom: 18,
        minZoom: 3
    }),
    imga = L.tileLayer.chinaProvider('TianDiTu.Satellite.Annotion', {
        maxZoom: 18,
        minZoom: 3
    });

var normal = L.layerGroup([normalm, normala]),
    image = L.layerGroup([imgm, imga]);

// 高德地图  
var Gaode = L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
    maxZoom: 18,
    minZoom: 3
});
var Gaodimgem = L.tileLayer.chinaProvider('GaoDe.Satellite.Map', {
    maxZoom: 18,
    minZoom: 3
});
var Gaodimga = L.tileLayer.chinaProvider('GaoDe.Satellite.Annotion', {
    maxZoom: 18,
    minZoom: 3
});
var Gaodimage = L.layerGroup([Gaodimgem, Gaodimga]);

// 遥感反演数据显示
// geoserver发布的自定义图层
// 全国所有站点图层
var station = L.tileLayer.wms(
    'http://localhost:8080/geoserver/GradProject/wms', {
    layers: 'station',
    format: 'image/png',
    transparent: 'true'
});
// 省界线
var province = L.tileLayer.wms(
    'http://localhost:8080/geoserver/GradProject/wms', {
    layers: 'province',
    format: 'image/png',
    transparent: 'true'
});
// 国界线
var borderline = L.tileLayer.wms(
    'http://localhost:8080/geoserver/GradProject/wms', {
    layers: 'borderlayers',
    format: 'image/png',
    transparent: 'true'
});
var spring = L.tileLayer.wms(
    'http://localhost:8080/geoserver/GradProject/wms', {
    layers: '2020spring',
    format: 'image/png',
    transparent: 'true'
});
var summer = L.tileLayer.wms(
    'http://localhost:8080/geoserver/GradProject/wms', {
    layers: '2020summer',
    format: 'image/png',
    transparent: 'true'
});
var autumn = L.tileLayer.wms(
    'http://localhost:8080/geoserver/GradProject/wms', {
    layers: '2020autumn',
    format: 'image/png',
    transparent: 'true'
});
var winter = L.tileLayer.wms(
    'http://localhost:8080/geoserver/GradProject/wms', {
    layers: '2020winter',
    format: 'image/png',
    transparent: 'true'
});
var allyear = L.tileLayer.wms(
    'http://localhost:8080/geoserver/GradProject/wms', {
    layers: '2020all',
    format: 'image/png',
    transparent: 'true'
});

// 6.2 省会坐标点
var ls = L.marker([29.97, 91.11]).bindPopup('拉萨<br>经纬度：91.11, 29.97'),
    sh = L.marker([31.22, 121.48]).bindPopup('上海<br>经纬度：121.48, 31.22'),
    fz = L.marker([26.08, 119.3]).bindPopup('福州<br>经纬度：119.3, 26.08'),
    nn = L.marker([22.84, 108.33]).bindPopup('南宁<br>经纬度：108.33, 22.84'),
    gz = L.marker([23.16, 113.23]).bindPopup('广州<br>经纬度：113.23, 23.16'),
    ty = L.marker([37.87, 112.53]).bindPopup('太原<br>经纬度：112.53, 37.87'),
    km = L.marker([25.04, 102.73]).bindPopup('昆明<br>经纬度：102.73, 25.04'),
    hk = L.marker([20.02, 110.35]).bindPopup('海口<br>经纬度：110.35, 20.02'),
    sy = L.marker([41.8, 123.38]).bindPopup('沈阳<br>经纬度：123.38, 41.8'),
    cc = L.marker([43.88, 125.35]).bindPopup('长春<br>经纬度：125.35, 43.88'),
    yc = L.marker([38.47, 106.27]).bindPopup('银川<br>经纬度：106.27, 38.47'),
    nc = L.marker([28.68, 115.89]).bindPopup('南昌<br>经纬度：115.89, 28.68'),
    jl = L.marker([43.87, 126.57]).bindPopup('吉林<br>经纬度：126.57, 43.87'),
    xn = L.marker([36.56, 101.74]).bindPopup('西宁<br>经纬度：101.74, 36.56'),
    hhht = L.marker([40.82, 111.65]).bindPopup('呼和浩特<br>经纬度：111.65, 40.82'),
    cd = L.marker([30.67, 104.06]).bindPopup('成都<br>经纬度：104.06, 30.67'),
    xa = L.marker([34.27, 108.95]).bindPopup('西安<br>经纬度：108.95, 34.27'),
    cq = L.marker([29.59, 106.54]).bindPopup('重庆<br>经纬度：106.54, 29.59'),
    nj = L.marker([32.04, 118.78]).bindPopup('南京<br>经纬度：118.78, 32.04'),
    gy = L.marker([26.57, 106.71]).bindPopup('贵阳<br>经纬度：106.71, 26.57'),
    bj = L.marker([39.92, 116.46]).bindPopup('北京<br>经纬度：116.46, 39.92'),
    wlmq = L.marker([43.77, 87.68]).bindPopup('乌鲁木齐<br>经纬度：87.68, 43.77'),
    hz = L.marker([30.26, 120.19]).bindPopup('杭州<br>经纬度：120.19, 30.26'),
    jn = L.marker([36.65, 117.00]).bindPopup('济南<br>经纬度：117, 36.65'),
    lz = L.marker([36.03, 103.73]).bindPopup('兰州<br>经纬度：103.73, 36.03'),
    tj = L.marker([39.13, 117.20]).bindPopup('天津<br>经纬度：117.2, 39.13'),
    zz = L.marker([34.76, 113.65]).bindPopup('郑州<br>经纬度：113.65, 34.76'),
    heb = L.marker([45.75, 126.63]).bindPopup('哈尔滨<br>经纬度：126.63, 45.75'),
    sjz = L.marker([38.03, 114.48]).bindPopup('石家庄<br>经纬度：114.48, 38.03'),
    cs = L.marker([28.21, 113.00]).bindPopup('长沙<br>经纬度：113, 28.21'),
    hf = L.marker([31.86, 117.27]).bindPopup('合肥<br>经纬度：117.27, 31.86'),
    wh = L.marker([30.52, 114.31]).bindPopup('武汉<br>经纬度：114.31, 30.52');

var cities = L.layerGroup([ls, sh, fz, nn, gz, ty, km, hk, sy, cc, yc, nc, jl, xn, hhht, cd, xa, cq,
    nj, gy, bj, wlmq, hz, jn, lz, tj, zz, sjz, cs, hf, wh, heb]);


// 互斥的基础图层组
var baseLayers = {
    // 控件显示文本:引用图层名
    "智图地图": normalm1,
    "天地图标准": normal,
    "天地图影像": image,
    "高德地图": Gaode,
    "高德影像": Gaodimage,
}

// PM2.5浓度 覆盖图层组
var overlayLayers = {
    "2020春季": spring,
    "2020夏季": summer,
    "2020秋季": autumn,
    "2020冬季": winter,
    "2020全年": allyear,
    "省界线": province,
    "国界线": borderline,
    "站点": station,
    "省会城市点": cities
};

// 加载地图
var map = L.map("map", {
    center: [40.3, 116.4,],
    zoom: 7,
    layers: [normalm1],
    zoomControl: false
});

// 添加图层控件
var layerControl = L.control.layers(baseLayers, overlayLayers).addTo(map);


// 添加缩放控件
L.control.zoom({
    zoomInTitle: '放大',
    zoomOutTitle: '缩小'
}).addTo(map);

// 比例尺
L.control.scale({
    maxWidth: 100,
    metric: true,
    imperial: false,
    position: 'bottomright'
}).addTo(map);
