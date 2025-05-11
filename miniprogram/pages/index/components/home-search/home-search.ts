import { onStorageChange } from '../../../../utils/storage';
import { getUserLocation } from '../../../../utils/location'

Component({
  properties: {},
  data: {
    address: '暂无地址',
    removeListener: null as any
  },
  attached() {
    // 监听 storage 变化
    (this as any).removeListener = onStorageChange('addressInfo', (newData: any) => {
      this.setData({ address: newData.name });
    });
  },

  detached() {
    const _this: any = this
    
    if (_this.removeListener) {
      _this.removeListener();
      _this.removeListener = null;
    }
  },

  methods: {
    onLocationTap() {
      getUserLocation()
    }
  }
})