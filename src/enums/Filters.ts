export enum CUISINE {
  AFRICAN = 'African',
  ARGENTINIAN = 'Argentinian',
  AMERICAN = 'American',
  ASIAN = 'Asian',
  AUSTRIAN = 'Austrian',
  BELGIAN = 'Belgian',
  BRAZILIAN = 'Brazilian',
  BRITISH = 'British',
  CARIBBEANS = 'Caribbeans',
  CHINESE = 'Chinese',
  EGYPTIAN = 'Egyptian',
  EASTERNEURPEAN = 'Eastern European',
  JAPANESE = 'Japanese',
}

export enum CATEGORIES {
  BEST_OF_WAO = 'Best_of_WAO',
  CASUAL = 'Casual',
  CHIC = 'Chic',
  HOLE_IN_THE_WALL = 'Hole_in_the_wall',
  INSTITUTION = 'Institution',
  Local = 'Local',
}
export enum OTHER {
  VEGETARIAN = 'Vegetarian',
  VEGAN = 'Vegan',
  PESCATARIAN = 'Pescatarian',
  HALAL = 'Halal',
  ALLERGY_FRIENDLY = 'Allergy-friendly',
  DAIRY_FREE = 'Dairy-free',
  GLUTEN_FREE = 'Gluten-free',
  TERRACE = 'Terrace',
  OPEN_ON_SUNDAY = 'Open on Sunday',
  OPEN_ON_MONDAY = 'Open on Monday',
}
export const Filters = {
  CUISINE,
  CATEGORIES,
  OTHER,
}
export type FiltersEnumType = 'CUISINE' | 'CATEGORIES' | 'OTHER'
