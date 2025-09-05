import { useEffect, useState } from "react"

export const useCityCode = () => {
  const [cityCode, setCityCode] = useState<string>("")

  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`
      const parts = value.split(`; ${name}=`)
      if (parts.length === 2) return parts.pop()?.split(";").shift()
      return null
    }

    const code = getCookie("city_code")
    setCityCode(code || "novosibirsk") // fallback на Новосибирск
  }, [])

  return cityCode
}
