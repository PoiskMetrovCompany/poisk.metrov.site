import { IFlatLayoutCardFull, IPropertyCardFull } from "@/types/PropertyCard"

const FlatLayoutCardData: IFlatLayoutCardFull = {
  id: 1,
  image: "/images/temporary/flatImage.webp",
  title: "Европейский берег",
  address: "Новосибирск, ул. Зорге, 164",
  general: {
    builder: {
      name: "ГК Брусника",
      image: "/images/temporary/brusnika.png",
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
    metro: {
      name: "Октябрьская",
      image: "/images/icons/car-dark.svg",
      time: "25 минут",
    },
  },
  conveniences: {
    elevators: "4 грузовых",
    parking: "Подземная",
    storerooms: "Есть",
    wheelchair: "Есть",
    territory: "Закрытая",
  },

  price: "6 540 210",
  pricePerMonth: "6 540 210",
}

const FlatLayoutCardDataArray: IFlatLayoutCardFull[] = [
  FlatLayoutCardData,
  {
    ...FlatLayoutCardData,
    id: 2,
    title: "Речной квартал",
    address: "Новосибирск, ул. Кирова, 45",
    general: {
      ...FlatLayoutCardData.general,
      builder: {
        name: "ГК Стройинвест",
        image: "/images/temporary/brusnika.png",
      },
      constructionCompletionDate: "Сдан – II 2029",
      sections: 3,
      floors: "8-16",
    },
    location: {
      district: "Центральный район",
      metro: {
        name: "Площадь Ленина",
        image: "/images/icons/car-dark.svg",
        time: "25 минут",
      },
    },
    price: "7,2",
    pricePerMonth: "10,1",
  },
  {
    ...FlatLayoutCardData,
    id: 3,
    title: "Зеленый парк",
    address: "Новосибирск, ул. Красный проспект, 78",
    general: {
      ...FlatLayoutCardData.general,
      builder: {
        name: "ГК Домстрой",
        image: "/images/temporary/brusnika.png",
      },
      constructionCompletionDate: "Сдан – III 2028",
      sections: 4,
      floors: "12-20",
    },
    location: {
      district: "Заельцовский район",
      metro: {
        name: "Заельцовская",
        image: "/images/icons/car-dark.svg",
        time: "25 минут",
      },
    },
    price: "5,8",
    pricePerMonth: "8,5",
  },
  {
    ...FlatLayoutCardData,
    id: 4,
    title: "Солнечный город",
    address: "Новосибирск, ул. Богдана Хмельницкого, 32",
    general: {
      ...FlatLayoutCardData.general,
      builder: {
        name: "ГК Новый дом",
        image: "/images/temporary/brusnika.png",
      },
      constructionCompletionDate: "Сдан – I 2029",
      sections: 6,
      floors: "9-25",
    },
    location: {
      district: "Калининский район",
      metro: {
        name: "Калининская",
        image: "/images/icons/car-dark.svg",
        time: "25 минут",
      },
    },
    price: "6,1",
    pricePerMonth: "8,9",
  },
  {
    ...FlatLayoutCardData,
    id: 5,
    title: "Университетский",
    address: "Новосибирск, ул. Пирогова, 15",
    general: {
      ...FlatLayoutCardData.general,
      builder: {
        name: "ГК Академстрой",
        image: "/images/temporary/brusnika.png",
      },
      constructionCompletionDate: "Сдан – V 2028",
      sections: 7,
      floors: "10-22",
    },
    location: {
      district: "Советский район",
      metro: {
        name: "Гагаринская",
        image: "/images/icons/car-dark.svg",
        time: "25 минут",
      },
    },
    price: "7,5",
    pricePerMonth: "10,8",
  },
]

export default FlatLayoutCardData
export { FlatLayoutCardDataArray }
