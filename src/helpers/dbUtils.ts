import { RNFileCache } from '@mutagen-d/react-native-file-cache'
import { AppDispatch } from '@/Store'
import { Config } from '@/Config'
import { fetchAllRegions } from '@/Store/Regions'
import RNFetchBlob from 'rn-fetch-blob'
import { readString } from 'react-native-csv'
import { FilterSlice, Slices } from '@/enums/Slices'
import { fetchAllRestaurants } from '@/Store/Restaurants'

export const getCachedFile = async (url: string) => {
  try {
    if (RNFileCache.exists(url)) {
      return RNFileCache.getPath(url)
    }
    const file = await RNFileCache.download({ url })
    return file.path
  } catch (e) {
    console.log(e)
  }
}
const transformHeaders = (h: string) => {
  switch (h) {
    case 'overall_category':
      return 'overall'
    case 'zone_category':
      return 'country'
    case 'zone_name':
      return 'zone'
    case 'Google map link':
      return 'mapLink'
    case 'More Filters':
      return FilterSlice.MOREFILTERS
    default:
      return h.trim().toLowerCase()
  }
}
export const loadRegionsFiles = async (dispatch: AppDispatch) => {
  let path = await getCachedFile(Config.CSV_ENDPOINTS.REGIONS)

  console.log(path)

  if (path) {
    await fetchData(path, transformHeaders, result =>
      dispatch(fetchAllRegions(result.data)),
    )
  }
}
export const loadRestaurantFiles = async (dispatch: AppDispatch) => {
  let path = await getCachedFile(Config.CSV_ENDPOINTS.RESTAURANTS)

  if (path) {
    await fetchData(path, transformHeaders, result =>
      dispatch(fetchAllRestaurants(result.data)),
    )
  }
}
const fetchData = async (
  path: string,
  transformHeader: (h: string) => string,
  successCallback: (result: any) => void,
) => {
  let data = ''
  await RNFetchBlob.fs
    .readStream(
      // file path
      path,
      // encoding, should be one of `base64`, `utf8`, `ascii`
      'utf8',
      // (optional) buffer size, default to 4096 (4095 for BASE64 encoded data)
      // when reading file in BASE64 encoding, buffer size must be multiples of 3.
      4095,
    )
    .then(ifstream => {
      ifstream.open()
      ifstream.onData(chunk => {
        // when encoding is `ascii`, chunk will be an array contains numbers
        // otherwise it will be a string
        data += chunk
      })
      ifstream.onEnd(() =>
        readString(data, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          comments: '#',
          transformHeader: transformHeader,
          complete: (results: any) => {
            console.log('Results:', results)
            successCallback(results)
          },
          error: (error: { cause?: unknown }) => {
            console.log('error:', error.cause)
            console.log(Config.CSV_ENDPOINTS.REGIONS)
          },
        }),
      )
      ifstream.onError(err => {
        console.log('oops', err)
      })
    })
}
export const initDB = async (dispatch: AppDispatch) => {
  await Promise.allSettled([
    loadRestaurantFiles(dispatch),
    loadRegionsFiles(dispatch),
  ])
}
