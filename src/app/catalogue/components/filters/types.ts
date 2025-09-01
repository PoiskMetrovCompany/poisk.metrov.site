export interface FiltersFormData {
  // Селекты
  district: string
  builder: string
  livingEstate: string
  street: string
  metro: string

  // Диапазоны
  priceMin: number | null
  priceMax: number | null
  floorMin: number | null
  floorMax: number | null
  flatAreaMin: number | null
  flatAreaMax: number | null
  livingAreaMin: number | null
  livingAreaMax: number | null
  ceilingHeight: string[]
  floorsInBuildingMin: number | null
  floorsInBuildingMax: number | null

  // Кнопки фильтров
  propertyType: string
  rooms: string[]
  floorOptions: string[]
  layout: string[]
  finish: string[]
  bathroom: string[]
  apartments: string
  features: string[]

  // Жилой комплекс
  buildingType: string[]
  completionDate: string[]
  metroDistance: string[]
  metroTransportType: string
  elevator: string[]
  parking: string[]
  security: string[]

  // Покупка
  paymentMethod: string[]
  mortgageType: string[]
  installmentPeriod: string[]
  downPayment: string[]
  mortgagePrograms: string[]
}

export interface SelectOption {
  value: string
  label: string
}

export interface RangeValue {
  min: number
  max: number
}

// Опции для селектов
export const DISTRICT_OPTIONS: SelectOption[] = [
  { value: "Калининский", label: "Калининский" },
  { value: "Ленинский", label: "Ленинский" },
  { value: "Дзержинский", label: "Дзержинский" },
  { value: "Октябрьский", label: "Октябрьский" },
  { value: "Первомайский", label: "Первомайский" },
  { value: "Советский", label: "Советский" },
  { value: "Кировский", label: "Кировский" },
  { value: "Железнодорожный", label: "Железнодорожный" },
  { value: "Центральный", label: "Центральный" },
]

export const BUILDER_OPTIONS: SelectOption[] = [
  { value: "ПИК", label: "ПИК" },
  { value: "Самолет", label: "Самолет" },
  { value: "Брусника", label: "Брусника" },
  { value: "Дом-Строй", label: "Дом-Строй" },
  { value: "Страна Девелопмент", label: "Страна Девелопмент" },
  { value: "Эверест-Н", label: "Эверест-Н" },
  { value: "ГК Мета", label: "ГК Мета" },
  { value: "СЛК", label: "СЛК" },
  { value: "NOVA", label: "NOVA" },
  { value: "Скандиа", label: "Скандиа" },
  { value: "Эталон", label: "Эталон" },
  { value: "Синергия", label: "Синергия" },
]

export const LIVING_ESTATE_OPTIONS: SelectOption[] = [
  { value: "Европейский берег", label: "Европейский берег" },
  { value: "Солнечная долина", label: "Солнечная долина" },
  { value: "Зеленый парк", label: "Зеленый парк" },
  { value: "Морской бриз", label: "Морской бриз" },
  { value: "Академгородок", label: "Академгородок" },
  { value: "Золотая нива", label: "Золотая нива" },
  { value: "Родники", label: "Родники" },
  { value: "Северный", label: "Северный" },
  { value: "Матрешкин двор", label: "Матрешкин двор" },
  { value: "Закаменский", label: "Закаменский" },
]

export const STREET_OPTIONS: SelectOption[] = [
  { value: "ул. Красный проспект", label: "ул. Красный проспект" },
  { value: "ул. Ленина", label: "ул. Ленина" },
  { value: "ул. Димитрова", label: "ул. Димитрова" },
  { value: "ул. Станиславского", label: "ул. Станиславского" },
  { value: "ул. Фрунзе", label: "ул. Фрунзе" },
  { value: "ул. Кирова", label: "ул. Кирова" },
  { value: "ул. Немировича-Данченко", label: "ул. Немировича-Данченко" },
  { value: "ул. Декабристов", label: "ул. Декабристов" },
  { value: "ул. Ватутина", label: "ул. Ватутина" },
  { value: "ул. Большевистская", label: "ул. Большевистская" },
]

export const METRO_OPTIONS: SelectOption[] = [
  { value: "Октябрьская", label: "Октябрьская" },
  { value: "Студенческая", label: "Студенческая" },
  { value: "Речной вокзал", label: "Речной вокзал" },
  { value: "Сибирская", label: "Сибирская" },
  { value: "Маршала Покрышкина", label: "Маршала Покрышкина" },
  { value: "Березовая роща", label: "Березовая роща" },
  { value: "Золотая Нива", label: "Золотая Нива" },
  { value: "Гагаринская", label: "Гагаринская" },
  { value: "Заельцовская", label: "Заельцовская" },
  { value: "Площадь Ленина", label: "Площадь Ленина" },
]

// Опции для блока "Квартира"
export const ROOMS_OPTIONS = ["Студия", "1", "2", "3", "4", "5+"]

export const FLOOR_OPTIONS = ["Не первый", "Не последний", "Последний"]

export const LAYOUT_OPTIONS = [
  "С изолированными комнатами",
  "С кухней-гостиной",
]

export const FINISH_OPTIONS = ["Без отделки", "Черновая", "Чистовая"]

export const BATHROOM_OPTIONS = ["Совмещённый", "Раздельный"]

export const APARTMENTS_OPTIONS = ["Не показывать", "Только апартаменты"]

export const PROPERTY_TYPE_OPTIONS = ["Квартира", "ЖК"]

export const FEATURES_OPTIONS = [
  "С террасой",
  "2-х уровневая",
  "Таунхаус",
  "Мало соседей",
  "Видовой этаж",
  "Постирочная",
]

// Опции для блока "Жилой комплекс"
export const BUILDING_TYPE_OPTIONS = [
  "Кирпичный",
  "Панельный",
  "Монолитный",
  "Кирпично-монолитный",
  "Блочный",
]

export const COMPLETION_DATE_OPTIONS = [
  "Сдан",
  "2025",
  "2026",
  "2027",
  "Позднее",
]

export const METRO_DISTANCE_OPTIONS = [
  "5 мин",
  "10 мин",
  "15 мин",
  "20 мин",
  "30 мин",
]

export const METRO_TRANSPORT_TYPE_OPTIONS = ["Пешком", "Транспортом"]

export const ELEVATOR_OPTIONS = ["Пассажирский", "Грузовой"]

export const PARKING_OPTIONS = ["Закрытая", "Подземная", "Открытая"]

export const SECURITY_OPTIONS = ["Охрана", "Консьерж", "Закрытая территория"]

// Опции для блока "Покупка"
export const PAYMENT_METHOD_OPTIONS = ["Ипотека", "Рассрочка", "Наличные"]

export const MORTGAGE_TYPE_OPTIONS = ["От застройщика", "Стандартная"]

export const INSTALLMENT_PERIOD_OPTIONS = ["До года", "До 2 лет", "До 3 лет"]

export const DOWN_PAYMENT_OPTIONS = ["Без ПВ", "До 20%", "До 30%", "До 40%"]

export const MORTGAGE_PROGRAMS_OPTIONS = [
  "Траншевая",
  "Субсидирование",
  "Комплексное предложение",
]

// Начальные значения для диапазонов
export const INITIAL_RANGES = {
  price: { min: 4, max: 15 },
  floor: { min: 1, max: 30 },
  flatArea: { min: 20, max: 200 },
  livingArea: { min: 15, max: 150 },
  floorsInBuilding: { min: 1, max: 50 },
}
