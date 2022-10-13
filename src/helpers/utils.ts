import { Filters, FiltersEnumType } from '@/enums/Filters'
import { FilterTypeState } from '@/Store/Filters'
import { readString } from 'react-native-csv'
import { Config } from '@/Config'
import { AppDispatch } from '@/Store'
import { fetchAll } from '@/Store/Regions'
import { RNFileCache } from '@mutagen-d/react-native-file-cache'
import RNFetchBlob from 'rn-fetch-blob'

export const getFilterArray = (type: FiltersEnumType) =>
  Object.keys(Filters[type]).map<FilterTypeState>((key, index) => ({
    id: index,
    name: key,
    checked: false,
  }))
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
export const loadRegionsFiles = async (dispatch: AppDispatch) => {
  let path = await getCachedFile(Config.CSV_ENDPOINTS.REGIONS)
  const transformHeaders = (h: string) => {
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
  }
  console.log(path)

  if (path) {
    await fetchData(path, transformHeaders, result =>
      dispatch(fetchAll(result.data)),
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
