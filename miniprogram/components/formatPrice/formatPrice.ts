// components/PriceFormat/index.js
Component({
  properties: {
    value: {
      type: String,
      observer: function(newVal) {
        this.formatPrice(newVal);
      }
    }
  },
  
  data: {
    formattedPrice: ''
  },
  
  methods: {
    formatPrice(value:any) {
      const parts = value.split('.');
      
      if (parts.length === 1) {
        this.setData({
          formattedPrice: `<span class="integer">${parts[0]}</span>`
        });
      } else {
        this.setData({
          formattedPrice: `
            <span class="integer">${parts[0]}</span>
            <span class="decimal">.</span>
            <span class="fraction">${parts[1]}</span>
          `
        });
      }
    }
  }
});