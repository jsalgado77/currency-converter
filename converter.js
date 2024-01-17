// API PROVIDERS 
const ipdata = {
    baseurl: 'https://api.ipdata.co',
    key: '1087ffd91a5bac1531963799265d23c134c92d8509180e661c1a53b8',

    currency: function () {
      return `${ipdata.baseurl}/currency?api-key=${ipdata.key}`;
    },
  };

  const currencyLayer = {
    baseurl: 'http://api.currencylayer.com',
    key: '7ae056a8f2986bf2452658b07fa0b122',
  
    list: function () {
      return `${this.baseurl}/list?access_key=${this.key}`;
    },
    convert: function (from, to, amount) {
      return `${this.baseurl}/convert?from=${from}&to=${to}&amount=${amount}&access_key=${this.key}`;
    },
  };