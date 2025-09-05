import { ICity } from "@/types/api"

const transformCityData = (apiCity: ICity) => ({
  id: apiCity.key,
  name: apiCity.title,
  slug: apiCity.slug,
})

export default transformCityData
