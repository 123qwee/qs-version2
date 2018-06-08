export class HeatOper {
    constructor(ol, olcusium) {
        this.ol = ol;
        this.olcusium = olcusium;
    }
    static addHeatMap(params) {
        let radius;
        let blur;
        //  if(type=="toolFirst"){
        //     radius=5;
        //      blur=80;
        //  }else if(type=="toolSecond"){
        //     radius=7;
        //      blur=70;
        //  }else if(type=="toolThird"){
        //     radius=10;
        //      blur=80;
        //  }else if(type=="toolFourth"){
        //      radius=15;
        //      blur=40;
        // }
        let xmax = 130,
            xmin = 80,
            ymax = 50,
            ymin = 20;
        radius = 2;
        blur = 40;
        let points = [];
        for (let i = 0; i < params.length; i++) {
            points[i] = new ol.Feature(new ol.geom.Point([params[i].lon, params[i].lat]))
        }
        let heatMap = new ol.layer.Heatmap({
            source: new ol.source.Vector({
                features: points,
                wrapX: false
            }),
            blur: blur,
            radius: radius
        });
        return heatMap;
    }


}
