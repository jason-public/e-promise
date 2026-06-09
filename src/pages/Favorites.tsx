import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { MOCK_PLEDGES, CATEGORIES } from "@/data"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useBookmarks } from "@/hooks/useBookmarks"

export default function FavoritesPage() {
  const { bookmarks, toggleBookmark } = useBookmarks()
  const favoritePledges = MOCK_PLEDGES.filter(p => bookmarks.includes(p.id))

  return (
    <div className="py-12 md:py-20 mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl flex items-center gap-3">
          <Heart className="w-8 h-8 text-red-500 fill-red-500" />
          관심 공약
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          기대하거나 관심 있는 정책들을 모아볼 수 있습니다.
        </p>
      </div>

      {favoritePledges.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-2xl border border-gray-200">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">저장된 관심 공약이 없습니다.</h2>
          <p className="text-gray-500">분야별·지역별 메뉴에서 관심 있는 공약의 하트 버튼을 눌러보세요.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favoritePledges.map((pledge, idx) => (
            <motion.div
              key={pledge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="h-full flex flex-col hover:shadow-md hover:border-gray-300 transition-all bg-white relative">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start gap-4">
                    <Badge variant="outline" className="text-xs shrink-0">
                      {pledge.pledgeType === "category" ? (
                        <>
                          <span className="text-green-600 font-semibold">분야</span>
                          /{CATEGORIES.find(c => c.id === pledge.categoryId)?.title || ""}
                        </>
                      ) : (
                        <>
                          <span className="text-blue-600 font-semibold">지역</span>
                          /{pledge.region}
                        </>
                      )}
                    </Badge>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        toggleBookmark(pledge.id)
                      }}
                      className="text-red-500 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <Heart className="w-5 h-5 fill-current" />
                    </button>
                  </div>
                  <CardTitle className="mt-4 text-lg font-bold text-gray-900 leading-tight">
                    {pledge.title}
                  </CardTitle>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
