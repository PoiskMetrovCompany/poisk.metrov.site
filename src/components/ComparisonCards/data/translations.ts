import {
  IPropertyCardApartments,
  IPropertyCardConveniences,
  IPropertyCardCost,
  IPropertyCardGeneral,
  IPropertyCardLocation,
} from "@/types/PropertyCard"

// type PropertyCardTranslations = {
//   [K in keyof IPropertyCardFull]: K extends "general"
//     ? Record<keyof IPropertyCardFull["general"], string>
//     : K extends "location"
//     ? Record<keyof IPropertyCardFull["location"], string>
//     : K extends "conveniences"
//     ? Record<keyof IPropertyCardFull["conveniences"], string>
//     : K extends "apartments"
//     ? Record<keyof IPropertyCardFull["apartments"], string>
//     : K extends "cost"
//     ? Record<keyof IPropertyCardFull["cost"], string>
//     : string
// }

interface IPropertyCardTranslations {
  general: Record<keyof IPropertyCardGeneral, string>
  location: Record<keyof IPropertyCardLocation, string>
  conveniences: Record<keyof IPropertyCardConveniences, string>
  apartments: Record<keyof IPropertyCardApartments, string>
  cost: Record<keyof IPropertyCardCost, string>
}

export const propertyCardTranslations: IPropertyCardTranslations = {
  // Общие сведения
  general: {
    builder: "Застройщик",
    constructionCompletionDate: "Срок сдачи",
    typeOfProperty: "Недвижимость",
    houseType: "Тип дома",
    housingClass: "Класс жилья",
    sections: "Секций",
    floors: "Этажность",
  },

  // Расположение
  location: {
    district: "Район",
    metro: "Метро",
  },

  // Удобства
  conveniences: {
    elevators: "Лифты",
    parking: "Парковка",
    storerooms: "Кладовки",
    wheelchair: "Колясочная",
    territory: "Территория",
  },

  // Квартиры
  apartments: {
    total: "Квартир всего",
    forSale: "Квартир в продаже",
    footage: "Метраж квартир",
    finishing: "Отделка",
    ceilings: "Потолки",
  },

  // Стоимость квартир
  cost: {
    oneRoom: "1-комн. квартиры",
    twoRooms: "2-комн. квартиры",
    threeRooms: "3-комн. квартиры",
    fourRooms: "4-комн. квартиры",
    fiveRooms: "5-комн. квартиры",
    penthouses: "Пентхаусы",
  },
}

export default propertyCardTranslations
