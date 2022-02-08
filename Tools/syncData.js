
import { mergeItem } from "../DataHandle/handleConfigData";

export default async function syncData(devObject) {
  try {
    const response = await fetch(`http://${devObject.ip}/GETDATA`)
    if (!response.ok) {
      throw new Error('not connected')
    }
    else {
      const data = await response.json()
      //console.log(data)
      if(data.type == 1 ) {   //stepper motor/curtains
        await mergeItem(devObject.name, {
          type: JSON.stringify(data.type),
          maxStep: JSON.stringify(data.maxStep),
          speed: 14 - JSON.stringify(data.speed),
          Mon: (data.MoOpenHour > 60) ?
            {
              active: false,
            } : {
              active: true,
              dateOpen: new Date(1995, 11, 17, data.MoOpenHour, data.MoOpenMin, 0),
              dateClose: new Date(1995, 11, 17, data.MoCloseHour, data.MoCloseMin, 0),
            },
          Tue: (data.TuOpenHour > 60) ?
            {
              active: false,
            } : {
              active: true,
              dateOpen: new Date(1995, 11, 17, data.TuOpenHour, data.TuOpenMin, 0),
              dateClose: new Date(1995, 11, 17, data.TuCloseHour, data.TuCloseMin, 0),
            },
          Wed: (data.WeOpenHour > 60) ?
            {
              active: false,
            } : {
              active: true,
              dateOpen: new Date(1995, 11, 17, data.WeOpenHour, data.WeOpenMin, 0),
              dateClose: new Date(1995, 11, 17, data.WeCloseHour, data.WeCloseMin, 0),
            },
          Thu: (data.ThOpenHour > 60) ?
            {
              active: false,
            } : {
              active: true,
              dateOpen: new Date(1995, 11, 17, data.ThOpenHour, data.ThOpenMin, 0),
              dateClose: new Date(1995, 11, 17, data.ThCloseHour, data.ThCloseMin, 0),
            },
          Fri: (data.FrOpenHour > 60) ?
            {
              active: false,
            } : {
              active: true,
              dateOpen: new Date(1995, 11, 17, data.FrOpenHour, data.FrOpenMin, 0),
              dateClose: new Date(1995, 11, 17, data.FrCloseHour, data.FrCloseMin, 0),
            },
          Sat: (data.SaOpenHour > 60) ?
            {
              active: false,
            } : {
              active: true,
              dateOpen: new Date(1995, 11, 17, data.SaOpenHour, data.SaOpenMin, 0),
              dateClose: new Date(1995, 11, 17, data.SaCloseHour, data.SaCloseMin, 0),
            },
          Sun: (data.SuOpenHour > 60) ?
            {
              active: false,
            } : {
              active: true,
              dateOpen: new Date(1995, 11, 17, data.SuOpenHour, data.SuOpenMin, 0),
              dateClose: new Date(1995, 11, 17, data.SuCloseHour, data.SuCloseMin, 0),
            },
        })
        return true
      }
      else if (data.type == 2 ) {   //WS2812B RGB LED
        await mergeItem(devObject.name, {
          type: JSON.stringify(data.type),
          effect: JSON.stringify(data.effect) || 0,
          color: JSON.stringify(data.color) || 0,
          palette: JSON.stringify(data.palette) || 0,
          brightness: JSON.stringify(data.brightness) || 100,
          ledStatus: JSON.stringify(data.ledStatus) || false,
        })
        return true 
      }
    }
  }
  catch (e) {
    console.log('syncData error ', e)
    return false
  }
}