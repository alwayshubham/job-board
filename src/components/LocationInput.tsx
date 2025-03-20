import { forwardRef, useMemo, useState } from "react"

import citiesLists from "@/lib/cities-list"
import { Input } from "./ui/input"

interface LocationInputProps
  extends React.HtmlHTMLAttributes<HTMLInputElement> {
  onLocationSelected: (location: string) => void
}

export default forwardRef<HTMLInputElement, LocationInputProps>(
  function LocationInput({ onLocationSelected, ...props }, ref) {
    const [locationSearch, setLocationSearch] = useState("")
    const [hasFocus, setHasFocus] = useState(false)

    const cities = useMemo(() => {
      if (!locationSearch.trim) return []

      const searchWords = locationSearch.split(" ")
      return citiesLists
        .map((city) => `${city.name}, ${city.subcountry}, ${city.country}`)
        .filter(
          (city) =>
            city.toLocaleLowerCase().startsWith(searchWords[0].toLowerCase()) &&
            searchWords.every((word) =>
              city.toLocaleLowerCase().includes(word.toLowerCase())
            )
        )
        .slice(0, 5)
    }, [locationSearch])

    return (
      <div className="relative">
        <Input
          placeholder="Search for a city"
          type="search"
          value={locationSearch}
          onChange={(e) => setLocationSearch(e.target.value)}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
          {...props}
          ref={ref}
        />
        {locationSearch.trim() && hasFocus && (
          <div className="absolute bg-background shadow-xl border-x border-b rounded-b-lg z-20 divide-y w-full">
            {!cities.length && (
              <p className="p-3">No cities found for your search</p>
            )}
            {cities.map((city) => (
              <button
                onMouseDown={(e) => {
                  e.preventDefault()
                  onLocationSelected(city)
                  setLocationSearch("")
                }}
                key={city}
                className="block w-full text-start p-2"
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }
)
