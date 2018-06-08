export let olStyle = {
    houseStyle: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgba(255,255,0,0.4)',
            width: 2
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255,255,141,0.3)'
        })
    }),
    gridStyle: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#ffc34c',
            width: 2
        })
    }),
    // 乡镇、村界网格配色
    gridStyle1: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#ffc34c',
            width: 2
        })
    }),
    gridStyle_RED: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'red',
            width: 2
        })
    }),
    gridHighStyle: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgba(65,166,217,0.8)',
            width: 4
        }),
        fill: new ol.style.Fill({
            color: 'rgba(0,0,0,0)'
        })
    }),
    pologyStyle: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.6)'
        }),
        stroke: new ol.style.Stroke({
            color: '#319FD3',
            width: 1
        }),
        text: new ol.style.Text({
            font: '12px 微软雅黑,sans-serif',
            fill: new ol.style.Fill({
                color: '#000'
            }),
            stroke: new ol.style.Stroke({
                color: '#fff',
                width: 3
            })
        })
    }),

    highlightStyle: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#f00',
            width: 1
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255,0,0,0.1)'
        }),
        text: new ol.style.Text({
            font: '12px Calibri,sans-serif',
            fill: new ol.style.Fill({
                color: '#000'
            }),
            stroke: new ol.style.Stroke({
                color: '#f00',
                width: 3
            })
        })
    }),
    MarkerDefaultStyles: new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 1],
            src: require('../../images/map_marker.png')
        })
    })
};
