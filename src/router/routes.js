import _ from 'lodash'

// 导入通用的组件
import Main from '@/components/common/Main.vue'
// import Blank from '@/components/common/Blank.vue'

import GridManage from '@/pages/GridManage/GridManage.vue'; // 网格管理
import VideoSurveillance from '@/pages/VideoSurveillance/VideoSurveillance.vue'; // 视频监控
/** 综治资源 */
import PeopleRoomManage from '@/pages/PopulationRoomManage/PopulationRoomManage.vue'; // 人房管理
import KeyPopulation from '@/pages/KeyPopulation/KeyPopulation.vue'; // 重点人群
import SafeProduction from '@/pages/SafeProduction/SafeProduction.vue'; // 安全生产
import PartyBuildingSystem from '@/pages/PartyBuildingSystem/PartyBuildingSystem.vue'; // 党建体系
import TwoNewOrganizations from '@/pages/TwoNewOrganizations/TwoNewOrganizations.vue'; // 两新组织
import CampusPerimeter from '@/pages/CampusPerimeter/CampusPerimeter.vue'; // 校园周边
import RoadGuardLine from '@/pages/RoadGuardLine/RoadGuardLine.vue'; // 护路护线

import PopulationStatis from '@/pages/PopulationRoomManage/PopulationStatis.vue'; // 人口统计

const commonRoutes = [{
    path: '/GridManage',
    component: GridManage
}, {
    path: '/VideoSurveillance',
    component: VideoSurveillance
}, {
    path: '/PeopleRoomManage',
    component: PeopleRoomManage
}, {
    path: '/KeyPopulation',
    component: KeyPopulation
}, {
    path: '/SafeProduction',
    component: SafeProduction
}, {
    path: '/PartyBuildingSystem',
    component: PartyBuildingSystem
}, {
    path: '/TwoNewOrganizations',
    component: TwoNewOrganizations
}, {
    path: '/CampusPerimeter',
    component: CampusPerimeter
}, {
    path: '/RoadGuardLine',
    component: RoadGuardLine
}];
const statis = [{
    path: '/PopulationStatis',
    component: PopulationStatis
}]


let routes = _.union(commonRoutes, [])
routes = _.union(routes, statis);

export default [{
    path: '/',
    redirect: '/Main'
}, {
    path: '/Main',
    component: Main,
    children: routes
}]
