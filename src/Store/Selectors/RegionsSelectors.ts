import { createSelector } from '@reduxjs/toolkit'
import { AppState } from '@/Store'

export const selectRegions = (state: AppState) => state.regions

export const selectOverallZones = createSelector(selectRegions, regions => [
  ...new Set(regions.map(item => item.overall)),
])
export const selectCountryByOverall = createSelector(
  selectRegions,
  selectOverallZones,
  (regions, overall) => {
    let obj: { [k: string]: any } = {}
    overall.map(elem => {
      let arr = regions.filter(reg => reg.overall === elem)
      obj = { ...obj, [elem]: [...new Set(arr.map(item => item.country))] }
    })
    return obj
  },
)
export const selectZonesByCountry = createSelector(selectRegions, regions => {
  let uniqCountries = [...new Set(regions.map(item => item.country))]
  let obj: { [k: string]: any } = {}
  uniqCountries.map(elem => {
    let arr = regions.filter(reg => reg.country === elem)
    obj = { ...obj, [elem]: arr }
  })
  return obj
})
