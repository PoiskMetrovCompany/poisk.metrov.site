import { IPropertyCardFull } from "@/types/PropertyCard"

const PropertyCardData: IPropertyCardFull = {
  id: 1,
  image: "/images/temporary/flat.png",
  title: "Европейский берег",
  address: "Новосибирск, ул. Зорге, 164",
  general: {
    builder: {
      name: "ГК Брусника",
      image: "/images/buildingCarousel/buidingExpandImg.webp",
    },
    constructionCompletionDate: "Сдан – IV 2028",
    typeOfProperty: "Жилая",
    houseType: "Кирпично-монолитный",
    housingClass: "Комфорт +",
    sections: 5,
    floors: "6-24",
  },
  location: {
    district: "Микрорайон на набережной Оби",
    metro: "Октябрьская",
  },
  conveniences: {
    elevators: "4 грузовых",
    parking: "Подземная",
    storerooms: "Есть",
    wheelchair: "Есть",
    territory: "Закрытая",
  },
  apartments: {
    total: 8402,
    forSale: 1749,
    footage: "23 - 124 м²",
    finishing: "White box, Предчистовая",
    ceilings: 2.7,
  },
  cost: {
    oneRoom: "6,7",
    twoRooms: "9,2",
    threeRooms: "12,6",
    fourRooms: "13,5",
    fiveRooms: "16,9",
    penthouses: "13,1",
  },
}

const PropertyCardDataArray: IPropertyCardFull[] = [
  PropertyCardData,
  {
    ...PropertyCardData,
    id: 2,
    title: "Речной квартал",
    address: "Новосибирск, ул. Кирова, 45",
    general: {
      ...PropertyCardData.general,
      builder: {
        name: "ГК Стройинвест",
        image: "/images/buildingCarousel/buidingExpandImg.webp",
      },
      constructionCompletionDate: "Сдан – II 2029",
      sections: 3,
      floors: "8-16",
    },
    location: {
      district: "Центральный район",
      metro: "Площадь Ленина",
    },
    cost: {
      oneRoom: "7,2",
      twoRooms: "10,1",
      threeRooms: "14,3",
      fourRooms: "15,8",
      fiveRooms: "18,5",
      penthouses: "16,2",
    },
  },
  {
    ...PropertyCardData,
    id: 3,
    title: "Зеленый парк",
    address: "Новосибирск, ул. Красный проспект, 78",
    general: {
      ...PropertyCardData.general,
      builder: {
        name: "ГК Домстрой",
        image: "/images/buildingCarousel/buidingExpandImg.webp",
      },
      constructionCompletionDate: "Сдан – III 2028",
      sections: 4,
      floors: "12-20",
    },
    location: {
      district: "Заельцовский район",
      metro: "Заельцовская",
    },
    cost: {
      oneRoom: "5,8",
      twoRooms: "8,5",
      threeRooms: "11,9",
      fourRooms: "12,8",
      fiveRooms: "15,3",
      penthouses: "12,7",
    },
  },
  {
    ...PropertyCardData,
    id: 4,
    title: "Солнечный город",
    address: "Новосибирск, ул. Богдана Хмельницкого, 32",
    general: {
      ...PropertyCardData.general,
      builder: {
        name: "ГК Новый дом",
        image: "/images/buildingCarousel/buidingExpandImg.webp",
      },
      constructionCompletionDate: "Сдан – I 2029",
      sections: 6,
      floors: "9-25",
    },
    location: {
      district: "Калининский район",
      metro: "Калининская",
    },
    cost: {
      oneRoom: "6,1",
      twoRooms: "8,9",
      threeRooms: "12,2",
      fourRooms: "13,1",
      fiveRooms: "16,4",
      penthouses: "13,8",
    },
  },
  {
    ...PropertyCardData,
    id: 5,
    title: "Университетский",
    address: "Новосибирск, ул. Пирогова, 15",
    general: {
      ...PropertyCardData.general,
      builder: {
        name: "ГК Академстрой",
        image: "/images/buildingCarousel/buidingExpandImg.webp",
      },
      constructionCompletionDate: "Сдан – V 2028",
      sections: 7,
      floors: "10-22",
    },
    location: {
      district: "Советский район",
      metro: "Гагаринская",
    },
    cost: {
      oneRoom: "7,5",
      twoRooms: "10,8",
      threeRooms: "15,1",
      fourRooms: "16,2",
      fiveRooms: "19,8",
      penthouses: "17,3",
    },
  },
]

export default PropertyCardData
export { PropertyCardDataArray }
