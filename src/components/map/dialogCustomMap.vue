<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" width="600px" top="30vh">
      <div>
        <vCustomMap v-if="dialogVisible" ref="customMap"></vCustomMap>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import vCustomMap from "@/components/map/CustomMap.vue";
import { queryByGeoGeometry } from "@/components/map/src/2d/supermap/map.service.js";

export default {
  props:{
    NonPubOrgForm:{
      type:Object
    },
  },
  components: {
    vCustomMap
  },
  data() {
    return {
      dialogVisible: false,
      markerCb: null,
    };
  },
 
  watch: {
    dialogVisible(nValue, oValue) {
      if (nValue == true) {
        this.$nextTick(() => {
          this.map = this.$refs["customMap"].$refs["map"].map;
          this.handleGetAddress();
        });
      }
    }
  },
  methods:{
        // 获取案卷发生位置及所在网格区域信息
    handleGetAddress() {
      let that = this;
      this.map.listener.mouseClickPixelPos$.subscribe(pixel => {
      let coordinate = that.map.olcusium.getCoordinateFromPixel(pixel);

        // 设置案卷发生经纬度
       that.NonPubOrgForm.longitude = coordinate[0];
       that.NonPubOrgForm.latitude = coordinate[1];
    
        // 添加单击点标记在地图
        that.addMarker(coordinate);

        // 通过百度地图接口获取位置信息
        that.getAddressByLonLat(coordinate[0], coordinate[1], address => {
          that.NonPubOrgForm.companyAddress = address;
        });

        let geo = new ol.geom.Point(coordinate);
        queryByGeoGeometry(
          constants.GRID_MAP_URL,
          "GEO_GRID@grid",
          "1=1",
          new ol.geom.Point(coordinate)
        ).then(data => {
          if (data.result.recordsets.length > 0) {
            let feature = data.result.recordsets[0].features.features[0];

            let gridCode = feature.properties.PERIMETER_1;

            // 设置案卷所在网格信息
            // service.getGridInfo(gridCode, data => {
            //   that.NonPubOrgForm.caseRegion = data.gridName;
            //   that.NonPubOrgForm.unitCode = data.gridCode;
            //   that.NonPubOrgForm.unitName = data.LastLand;
            //   that.NonPubOrgForm.tcommunityCode = data.gridCode.substr(0, 12);
            //   that.NonPubOrgForm.tcommunityName = data.ThirdLand;
            //   that.NonPubOrgForm.streetCode = data.gridCode.substr(0, 9);
            //   that.NonPubOrgForm.streetName = data.SecoundLand;
            //   that.NonPubOrgForm.regionCode = data.gridCode.substr(0, 6);
            //   that.NonPubOrgForm.regionName = data.FirstLand;
            // });
          }
        });
      });
    },
    async addMarker(coordinate) {
      let that = this;

      var addFeature = () => {
        const feature = new ol.Feature({
          geometry: new ol.geom.Point(coordinate)
        });

        return (evt, next) => {
          evt.setFeatures([feature]);
          next();
        };
      };

      that.markerCb && that.markerCb.destroy();

      let callback = await that.map.layer.markerLayer.use([addFeature()]);

      that.markerCb = callback("mouseclick", data => {});
    },
    /**
     * 根据百度地图接口获取位置信息
    */
    getAddressByLonLat(lon, lat, successFunc) {
      $.ajax({
        url: "http://api.map.baidu.com/geocoder/v2/",
        async: false,
        data: {
          ak: "rOvp5tcWndbjcsODojjMxNZ3",
          output: "json",
          coordtype: "wgs84ll",
          location: lat + "," + lon
        },
        dataType: "jsonp",
        success: function(data) {
          let address = "";
          if (data.status == 0) {
            address =
              data.result.formatted_address + data.result.sematic_description;
            successFunc(address);
          }
        }
      });
    },
  }
};
</script>