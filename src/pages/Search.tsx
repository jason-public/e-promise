import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search as SearchIcon, X, Sparkles } from "lucide-react"
import { MOCK_PLEDGES, CATEGORIES } from "@/data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const SUGGESTIONS = ["GTX", "청년", "돌봄", "문화", "주차장", "병원"]

export default function Search() {
  const [query, setQuery] = useState("")
  
  const filtered = query.trim() === "" ? [] : MOCK_PLEDGES.filter(
    (p) => p.title.includes(query) || p.department.includes(query)
  )

  return (
    <div className="py-12 md:py-20 mx-auto max-w-4xl px-6 lg:px-8 min-h-[80vh]">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">약속 검색</h1>
        <p className="mt-4 text-lg text-gray-600">
          단어나 키워드로 남양주시의 시민 제안과 공약을 검색해보세요.
        </p>
      </div>

      <div className="relative max-w-2xl mx-auto mb-12">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon className="h-6 w-6 text-primary" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-12 py-4 h-16 bg-white border-2 border-primary/20 rounded-2xl text-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-primary shadow-sm transition-all shadow-primary/5"
            placeholder="예) 청년, 돌봄, 주차장 등..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button 
              className="absolute inset-y-0 right-0 pr-4 flex items-center"
              onClick={() => setQuery("")}
            >
              <div className="bg-gray-100 p-1 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors">
                <X className="h-4 w-4" />
              </div>
            </button>
          )}
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <div className="flex items-center text-sm font-semibold text-gray-500 mr-2">
            <Sparkles className="w-4 h-4 mr-1 text-accent" /> 추천 검색어:
          </div>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-primary hover:text-primary transition-colors shadow-sm"
              onClick={() => setQuery(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {query.trim() !== "" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <h3 className="font-bold text-gray-900 mb-4 border-b pb-2">
              검색결과 <span className="text-primary">{filtered.length}</span>건
            </h3>
            
            {filtered.length > 0 ? (
              filtered.map((pledge, idx) => (
                <motion.div
                  key={pledge.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-5 flex flex-col gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                            {CATEGORIES.find(c => c.id === pledge.categoryId)?.title || "기타 분야"}
                          </Badge>
                          <Badge variant="outline" className="text-slate-600 bg-slate-100 border-slate-200">
                            {pledge.region}
                          </Badge>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-1">{pledge.title}</h4>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <SearchIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">'{query}'에 대한 검색결과가 없습니다.</p>
                <p className="text-sm text-gray-400 mt-1">다른 검색어를 입력해보세요.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
