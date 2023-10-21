const request = require('request')
const serviceKey = require('../keys.key')

const airdata = (stationName, callback) => {
  const url = 'http://openapi.airkorea.ro.kr/openapi/services/rest/ArpltnInforInqireSve/getMsrstnAccotoRltmMesureDnsty?';

  let ServiceKey = serviceKey.publicPortalkey

  let queryParams = encodeURIComponent('ServiceKey') + '=' + ServiceKey
  queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1');
  queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
  queryParams += '&' + encodeURIComponent('dataTerm') + '=' + encodeURIComponent('DAILY');
  queryParams += '&' + encodeURIComponent('ver') + '=' + encodeURIComponent('1.3');
  queryParams += '&' + encodeURIComponent('stationName') + '=' + encodeURIComponent(stationName);
  queryParams += '&' + encodeURIComponent('_returnType') + '=' + encodeURIComponent('json');

  const fullurl = url + queryParams;
  console.log('full url', fullurl)

  request(fullurl, (error, {body}) => {
    console.log('body', body)
    const air = JSON.parse(body)
    console.log('air ', air)
    callback(undefined, {
      air:air
    })
  })
}

module.exports = airdata;