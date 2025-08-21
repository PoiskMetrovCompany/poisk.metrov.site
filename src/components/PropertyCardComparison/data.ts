import { IPropertyCardFull } from "@/types/PropertyCard"

const PropertyCardData: IPropertyCardFull = {
  id: 1,
  image: "/images/temporary/flat.png",
  title: "Европейский берег",
  address: "Новосибирск, ул. Зорге, 164",
  general: {
    builder: "ГК Брусника",
    image: "/images/buildingCarousel/buidingExpandImg.webp",
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

export default PropertyCardData
