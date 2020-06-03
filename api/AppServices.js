/**
 * 公共接口
 */
import axios from "axios";

/**
 * @params Object
 */
export default {
  getShop({ longitude,latitude,page,pageSize,typeFirstId,typeSecondId,typeThirdId}) {
    return axios.post('/h5/m/p/getShopRecommendListForIndex', { longitude,latitude,page,pageSize,typeFirstId,typeSecondId,typeThirdId});
  },
}


