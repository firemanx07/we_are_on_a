import { Filters, FiltersEnumType } from '@/enums/Filters'
import { FilterTypeState } from '@/Store/Filters'

export const getFilterArray = (type: FiltersEnumType) =>
  Object.keys(Filters[type]).map<FilterTypeState>((key, index) => ({
    id: index,
    name: key,
    checked: false,
  }))
