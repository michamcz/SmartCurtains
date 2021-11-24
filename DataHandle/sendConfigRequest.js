export function sendConfigRequest(config) {
  const { ssid, pass, ip, gateway, mask } = config

  const ipArr = ip.split('.')
  const gatewayArr = gateway.split('.')
  const maskArr = mask.split('.')

  const request = `http://192.168.4.1/UPDATE?ssid=${ssid}&password=${pass}&ipA=${ipArr[0]}&ipB=${ipArr[1]}&ipC=${ipArr[2]}&ipD=${ipArr[3]}&gateA=${gatewayArr[0]}&gateB=${gatewayArr[1]}&gateC=${gatewayArr[2]}&gateD=${gatewayArr[3]}&maskA=${maskArr[0]}&maskB=${maskArr[1]}&maskC=${maskArr[2]}&maskD=${maskArr[3]}`

  fetch(request)
    .then(response => response.json())
    .then(data => console.log(data));
}

export function sendConfigStepSpeed(config) {
  const { maxStep, speed, ip } = config
  console.log(maxStep)

  const requestSpeed = `http://${ip}/SPEED?speed=${speed}`
  const requestStep = `http://${ip}/SET?maxstep=${maxStep}`

  fetch(requestSpeed)
    .then(response => response.json())
    .then(data => console.log(data));
  fetch(requestStep)
    .then(response => response.json())
    .then(data => console.log(data));
}

export function sendDayOpenCloseConfig(config) {
  const { ip, active, openHour, closeHour } = config

  console.log(ip, active, openHour, closeHour);
}
