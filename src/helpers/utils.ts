import { Filters, FiltersEnumType } from '@/enums/Filters'
import { FilterTypeState } from '@/Store/Filters'
import { readRemoteFile } from 'react-native-csv'
import { Config } from '@/Config'
import { AppDispatch } from '@/Store'
import { fetchAll } from '@/Store/Regions'

export const getFilterArray = (type: FiltersEnumType) =>
  Object.keys(Filters[type]).map<FilterTypeState>((key, index) => ({
    id: index,
    name: key,
    checked: false,
  }))

export const loadRegionsFiles = async (dispatch?: AppDispatch) => {
  let result = await readRemoteFile(Config.CSV_ENDPOINTS.REGIONS, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    comments: '#',
    transformHeader: (h: string) => {
      switch (h) {
        case 'overall_category':
          return 'overall'

        case 'zone_category':
          return 'country'

        case 'zone_name':
          return 'zone'

        default:
          return h
      }
    },
    complete: (results: any) => {
      console.log('Results:', results)
      // dispatch(fetchAll(results.data))
    },
    error: (error: { cause?: unknown }) => {
      console.log('error:', error.cause)
      console.log(Config.CSV_ENDPOINTS.REGIONS)
    },
  })
}
