import { RNFileCache } from '@mutagen-d/react-native-file-cache'
import { AppDispatch } from '@/Store'
import { Config } from '@/Config'
import { fetchAllRegions } from '@/Store/Regions'
import RNFetchBlob from 'rn-fetch-blob'
import { readString } from 'react-native-csv'
import { FilterSlice } from '@/enums/Slices'
import { fetchAllRestaurants } from '@/Store/Restaurants'
import { fetchAllChefs } from '@/Store/Chefs'
import { fetchAllReviews } from '@/Store/Reviews'
import { initFilters } from '@/Store/Filters'

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
  switch (h.trim()) {
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
    case 'id chef':
      return 'chefID'
    case 'id restaurant':
      return 'restaurantID'
    case 'Best dish':
      return 'bestDish'
    case 'main_restaurant':
      return 'mainRestaurant'
    case 'other_restaurants':
      return 'otherRestaurants'
    case 'restaurant name':
      return 'RestaurantName'
    default:
      return h.trim().toLowerCase()
  }
}
export const loadRegionsFiles = async (dispatch: AppDispatch) => {
  let path = await getCachedFile(Config.CSV_ENDPOINTS.REGIONS)
  if (path) {
    await fetchCSVData(path, transformHeaders, result =>
      dispatch(fetchAllRegions(result.data)),
    )
  }
}
export const loadRestaurantFiles = async (dispatch: AppDispatch) => {
  let path = await getCachedFile(Config.CSV_ENDPOINTS.RESTAURANTS)

  if (path) {
    await fetchCSVData(path, transformHeaders, result =>
      dispatch(fetchAllRestaurants(result.data)),
    )
  }
}
export const loadChefsFiles = async (dispatch: AppDispatch) => {
  let path = await getCachedFile(Config.CSV_ENDPOINTS.CHEFS)
  if (path) {
    await fetchCSVData(path, transformHeaders, result => {
      dispatch(fetchAllChefs(result.data)),
        dispatch(initFilters({ key: 'CHEFS', data: result.data }))
    }

    )
  }
}
export const loadReviewsFiles = async (dispatch: AppDispatch) => {
  let path = await getCachedFile(Config.CSV_ENDPOINTS.REVIEWS)
  if (path) {
    await fetchCSVData(path, transformHeaders, result =>
      dispatch(fetchAllReviews(result.data)),
    )
  }
}
export const loadFilterFiles = async (dispatch: AppDispatch) => {
  let path = await getCachedFile(Config.CSV_ENDPOINTS.FILTER)
  if (path)
    await fetchCSVData(path, transformHeaders, result =>
      dispatch(initFilters({ key: 'MOREFILTERS', data: result.data })),
    )
}
export const loadCuisineFiles = async (dispatch: AppDispatch) => {
  let path = await getCachedFile(Config.CSV_ENDPOINTS.CUISINE)
  if (path)
    await fetchCSVData(path, transformHeaders, result =>
      dispatch(initFilters({ key: 'CUISINE', data: result.data })),
    )
}
export const loadCategoryFiles = async (dispatch: AppDispatch) => {
  let path = await getCachedFile(Config.CSV_ENDPOINTS.CATEGORY)
  if (path)
    await fetchCSVData(path, transformHeaders, result =>
      dispatch(initFilters({ key: 'CATEGORIES', data: result.data })),
    )
}
const fetchCSVData = async (
  path: string,
  transformHeader: (h: string) => string,
  successCallback: (result: any) => void,
  errorCallback?: (error: unknown) => void,
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
            successCallback(results)
          },
          error: (error: { cause?: unknown }) => {
            console.log('error:', error.cause)
            console.log(Config.CSV_ENDPOINTS.REGIONS)
            errorCallback && errorCallback(error.cause)
          },
        }),
      )
      ifstream.onError(err => {
        console.log('oops', err)
      })
    })
}
export const initDB = async (dispatch: AppDispatch) => {
  const promises = [
    loadRestaurantFiles,
    loadRegionsFiles,
    loadChefsFiles,
    loadReviewsFiles,
    loadCategoryFiles,
    loadCuisineFiles,
    loadFilterFiles,
  ]
  for (const elem of promises) {
    await elem(dispatch)
  }
}
