Component({
  properties: {},
  data: {
    popupVisiable: false,
    tagList: [
      {
        "TagId": 21,
        "TagName": "霸王茶姬"
      },
      {
        "TagId": 20,
        "TagName": "汉堡王"
      },
      {
        "TagId": 14,
        "TagName": "星巴克"
      },
      {
        "TagId": 16,
        "TagName": "肯德基"
      },
      {
        "TagId": 13,
        "TagName": "麦当劳"
      }
    ],
    goodsTypesList: [
      {
        Id: 1,
        Name: "非权益商品"
      },
      {
        Id: 2,
        Name: "权益商品"
      },
    ],
    tagId: "",
    goodsType: "",
    sliderValue: [0, 100],
  },
  methods: {
    onTagIconTap() {
      this.setData({ popupVisiable: true })
    },

    // 标签项点击
    onTagItemTap(event: any) {
      const _this: any = this
      const id = event.currentTarget.dataset.id;

      if (_this.data.tagId === id) {
        this.setData({ tagId: '' })
        this.triggerEvent('change', '');
        return
      } else {
        this.setData({ tagId: id })
      }

      this.triggerEvent('change', _this.data.tagId);
    },

    // pop 标签项点击
    onPopTagItemTap(event: any) {
      const _this: any = this
      const id = event.currentTarget.dataset.id;

      if (_this.data.tagId === id) {
        this.setData({ tagId: '' })
        return
      }
      this.setData({ tagId: id })
    },

    // 商品类型项点击
    onGoodsTypesItemTap(event: any) {
      const id = event.currentTarget.dataset.id;

      this.setData({ goodsType: id })
    },

    // slider 滚动
    onChange(event: any) {
      wx.showToast({
        icon: 'none',
        title: `当前值：${event.detail}`,
      });
      this.setData({
        sliderValue: event.detail,
      });
    },

    // 重制标签
    onResetTap() {
      this.setData({
        tagId: '',
        goodsType: '',
      })
    },

    // 提交
    onSubmitTap() {
      const _this: any = this

      this.triggerEvent('change', _this.data.tagId);
      this.setData({ popupVisiable: false })
    },

    onClose() {
      this.setData({ popupVisiable: false })
    }
  }
})