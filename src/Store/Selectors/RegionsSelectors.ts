import { createSelector } from '@reduxjs/toolkit'
import { AppState } from '@/Store'
import { RegionTypeState } from '@/Store/Regions'

export const selectRegions = (state: AppState) => state.regions.regions
export const selectSelectedZone = (state: AppState) =>
  state.regions.selectedRegion
export const selectOverallZones = createSelector(selectRegions, regions => [
  ...new Set(regions.map(item => item.overall)),
])
export const selectCountryByOverall = createSelector(
  selectRegions,
  selectOverallZones,
  (regions, overall) => {
    let obj: { [k: string]: string[] } = {}
    overall.map(elem => {
      let arr = regions.filter(reg => reg.overall === elem)
      obj = { ...obj, [elem]: [...new Set(arr.map(item => item.country))] }
    })
    return obj
  },
)
export const selectZonesByCountry = createSelector(selectRegions, regions => {
  let uniqCountries = [...new Set(regions.map(item => item.country))]
  let obj: { [k: string]: RegionTypeState[] } = {}
  uniqCountries.map(elem => {
    let arr = regions.filter(reg => reg.country === elem)
    obj = { ...obj, [elem]: arr }
  })
  return obj
})
export const selectZonesBySearchText = createSelector(
  selectRegions,
  (State: AppState, search: string) => search,
  (regions, search): RegionTypeState[] =>
    regions.filter(region =>
      region.zone.toLowerCase().includes(search.toLowerCase().trim()),
    ),
)
