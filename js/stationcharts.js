// LayUI 年月选择器
// 点击切换不同时间的数据
layui.use(function () {
    var laydate = layui.laydate;
    // 年月选择器
    laydate.render({
        elem: '#ID-laydate-type-month',
        type: 'month',
        // 点击年份切换键触发
        change: function (value, date, endDate) {
            console.log('year');
        },
        // 点击月份触发
        done: function (value, date) {
            console.log(value); // 选中的年月
            console.log(date.month);
            var mon = 0; // 月份变量
            var url = '';
            switch (date.month) {
                case 1:
                    mon = '01';
                    break;
                case 2:
                    mon = '02';
                    break;
                case 3:
                    mon = '03';
                    break;
                case 4:
                    mon = '04';
                    break;
                case 5:
                    mon = '05';
                    break;
                case 6:
                    mon = '06';
                    break;
                case 7:
                    mon = '07';
                    break;
                case 8:
                    mon = '08';
                    break;
                case 9:
                    mon = '09';
                    break;
                case 10:
                    mon = '10';
                    break;
                case 11:
                    mon = '11';
                    break;
                case 12:
                    mon = '12';
                    break;
                default:
                    break;
            }
            url = './json/2020-' + mon + '-01.json';
            getValue(url);
        }
    });
});

// 引入ECharts实例
var mapChart = echarts.init(document.querySelector('#map-box'));
var barChart = echarts.init(document.querySelector('#bar-box'));

// 坐标数据
const geoCoordMap = {
    拉萨: [91.11, 29.97],
    上海: [121.48, 31.22],
    福州: [119.3, 26.08],
    南宁: [108.33, 22.84],
    广州: [113.23, 23.16],
    太原: [112.53, 37.87],
    昆明: [102.73, 25.04],
    海口: [110.35, 20.02],
    沈阳: [123.38, 41.8],
    长春: [125.35, 43.88],
    银川: [106.27, 38.47],
    南昌: [115.89, 28.68],
    吉林: [126.57, 43.87],
    西宁: [101.74, 36.56],
    呼和浩特: [111.65, 40.82],
    成都: [104.06, 30.67],
    西安: [108.95, 34.27],
    重庆: [106.54, 29.59],
    南京: [118.78, 32.04],
    贵阳: [106.71, 26.57],
    北京: [116.46, 39.92],
    乌鲁木齐: [87.68, 43.77],
    杭州: [120.19, 30.26],
    济南: [117, 36.65],
    兰州: [103.73, 36.03],
    天津: [117.2, 39.13],
    郑州: [113.65, 34.76],
    哈尔滨: [126.63, 45.75],
    石家庄: [114.48, 38.03],
    长沙: [113, 28.21],
    合肥: [117.27, 31.86],
    武汉: [114.31, 30.52],
};

// 处理坐标点和PM2.5数据（赋给map）
// 处理后数据格式：[{name：' ', value: [lon, lat, value] }]
// test2
const convertData = function (dataValue) {
    var res = [];
    for (var i = 0; i < dataValue.name.length; i++) {
        var geoCoord = geoCoordMap[dataValue.name[i]];
        if (geoCoord) {
            res.push({
                name: dataValue.name,
                value: geoCoord.concat(dataValue.value[i])
            });
        }
    }
    // console.log(res);
    return res;
};

// 将dataValue数据格式转换为二维数组（赋给bar） 
function toArr(dataValue) {
    var arr = [['city', 'value']];
    for (let i = 0; i < dataValue.name.length; i++) {
        arr.push([dataValue.name[i], dataValue.value[i]]);
    }
    // console.log(arr);
    return arr;
}


// 地图配置项
var option = {
    title: {
        text: '',
        x: 'center'
    },
    // 加载中国地图作为底图
    geo: {
        show: true,
        map: "china",
        roam: true, // 开启拖拽缩放
        scaleLimit: {
            min: 0.8,
        },
        center: [105, 36], // 调整地图中心位置
        label: {
            normal: {
                show: true, // 省份名显示
                fontSize: "10",
                color: "rgba(0,0,0,0.6)"
            },
            emphasis: {
                show: true
            }
        },
        itemStyle: {
            normal: {
                areaColor: "#e5f5f9",
                borderColor: "#a6bddb",
                borderWidth: 1,
            },
            emphasis: {
                // areaColor: 'none',
                areaColor: "#e5f5f9",
            }
        }
    },
    series: [
        {
            name: "",
            type: "scatter", // 散点图
            coordinateSystem: 'geo',
            symbol: "circle",
            // 按数值大小返回散点大小
            symbolSize: function (value) {
                return value[2] / 5;
            },
            // 根据数值大小划分点大小 value
            // or根据数值大小划分颜色
            // symbolSize: function (value) {
            //     if (value[2] <= 20) {
            //         return 10
            //     } else if (value[2] > 20) {
            //         return 15
            //     }
            // },
            tooltip: {
                trigger: 'item',
                formatter: "{@name}", // 为啥不显示捏？
                show: true
            },
            label: {
                // {b}显示城市名 {c}数值
                // {@value} value属性值
                formatter: "{@value}",
                position: "right",
                show: true
            },
            itemStyle: {
                color: "#66c2a5"
            },
            emphasis: {
                label: {
                    formatter: "{@name}{@value}",
                    show: true
                }
            },
        }
    ]
};

mapChart.setOption(option);

// 柱状图配置项
var baroption = {
    // dataset: [
    //     {
    //         source: toArr(dataValue)
    //     },
    //     {
    //         transform: {
    //             // 自动排序功能
    //             type: 'sort',
    //             config: { dimension: 'value', order: 'asc' }
    //         }
    //     }
    // ],
    grid: {
        left: '16%',
        right: '14%',
        bottom: '5%',
        // containLabel: true
    },
    xAxis: {},
    yAxis: {
        type: 'category',
    },
    series: [
        {
            type: 'bar',
            encode: {
                x: 'value',
                y: 'city',
            },
            // 如果 series.data 没有指定，并且 dataset 存在，那么就会使用 dataset。
            // datasetIndex 指定本系列使用那个 dataset。
            datasetIndex: 1
        }
    ],
    title: {
        text: '省会城市PM2.5浓度观测值',
        x: 'center',
        y: '2%'

    },
    visualMap: [
        {
            type: 'continuous',
            x: 'right',
            y: 'center',
            min: 0,
            max: 120,
            // calculable: true,
            itemHeight: 100,
            color: ['#fdae61', '#ffffbf', '#66c2a5'],
        }],
    tooltip: {
        trigger: 'item', // 数据项图形触发
        formatter: '{c}',
        show: true
    },
};

barChart.setOption(baroption);

// 获取json数据
function getValue(url) {
    $.getJSON(url, function (dataValue) {
        // console.log(dataValue);
        mapChart.setOption({
            series: [{
                data: convertData(dataValue),
            }]
        });
        barChart.setOption({
            dataset: [
                {
                    source: toArr(dataValue)
                },
                {
                    transform: {
                        // 自动排序功能
                        type: 'sort',
                        config: { dimension: 'value', order: 'asc' }
                    }
                }
            ]
        })
    });
}





// 获取json数据（省会城市pm值）
// 封装为函数，检测到执行条件时调用（？）
// $.getJSON('./json/2020-01-01.json', function (dataValue) {
//     // console.log(dataValue);
//     mapChart.setOption({
//         series: [{
//             data: convertData(dataValue),
//         },
//         // 前五显示为波点图
//         {
//             name: 'Top 5',
//             type: 'effectScatter',
//             coordinateSystem: 'geo',
//             // ？数据转换问题
//             // 官网示例data指向问题
//             /*   data: convertData(datas
//                   .sort(function (a, b) {
//                       return b.value - a.value;
//                       // console.log(data);
//                       // return b.value[2] - a.value[2];
//                   })
//                   .slice(0, 6)
//               ),*/
//             symbolSize: function (value) {
//                 return value[2] / 10;
//             },
//             // encode: {
//             //     value: 2
//             // },
//             showEffectOn: 'render',
//             rippleEffect: {
//                 brushType: 'stroke'
//             },
//             label: {
//                 formatter: '{b}',
//                 position: 'right',
//                 show: true
//             },
//             itemStyle: {
//                 shadowBlur: 10,
//                 shadowColor: '#333'
//             },
//             emphasis: {
//                 scale: true
//             },
//             zlevel: 1
//         }]
//     });
//     barChart.setOption({
//         dataset: [
//             {
//                 source: toArr(dataValue)
//             },
//             {
//                 transform: {
//                     // 自动排序功能
//                     type: 'sort',
//                     config: { dimension: 'value', order: 'asc' }
//                 }
//             }
//         ]
//     })
// });
