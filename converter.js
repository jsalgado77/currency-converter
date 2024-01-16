// API PROVIDERS 
const ipdata = {
    baseurl: 'https://api.ipdata.co',
    key: '1087ffd91a5bac1531963799265d23c134c92d8509180e661c1a53b8',

    currency: function () {
      return `${ipdata.baseurl}/currency?api-key=${ipdata.key}`;
    },
  };