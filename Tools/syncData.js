
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
      await mergeItem(devObject.name, {
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
  }
  catch (e) {
    console.log('syncData error ', e)
    return false
  }
}