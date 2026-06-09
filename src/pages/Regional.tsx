import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import { REGIONS } from "@/data"
import { RegionalDialog } from "@/components/RegionalDialog"

export default function Regional() {
  return (
    <div className="py-12 md:py-20 mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">지역별 공약</h1>
        <p className="mt-4 text-lg text-gray-600">
          우리 지역을 위한 당선인 공약 및 시민제안을 확인해보세요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {REGIONS.map((region) => (
          <div key={region.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-primary" /> {region.name}
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {region.areas.map((area) => (
                <RegionalDialog key={area} area={area}>
                  <div
                    className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm border bg-white border-gray-200 text-gray-700 hover:border-primary hover:bg-primary/5 cursor-pointer"
                  >
                    {area}
                  </div>
                </RegionalDialog>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
