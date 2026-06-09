import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, ArrowRight } from "lucide-react"
import { MOCK_PLEDGES, CATEGORIES } from "@/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const FILTERS = {
  age: ["아동", "청소년", "청년", "중장년", "어르신"],
  job: ["직장인", "자영업자", "소상공인", "농업인", "기타"],
  interest: CATEGORIES.map(c => c.title).slice(0, 5) // Just taking first 5 for simplicity
}

export default function MyPolicy() {
  const [selectedAge, setSelectedAge] = useState<string | null>(null)
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const [selectedInterest, setSelectedInterest] = useState<string | null>(null)

  const isFormComplete = selectedAge && selectedJob && selectedInterest

  const recommendations = useMemo(() => {
    // Basic mock recommendation logic matching on category or random if not matched
    // Since mock data only has basic targetAge, we'll fake some matches.
    if (!isFormComplete) return []
    return MOCK_PLEDGES.slice(0, 5).map(p => ({
      ...p,
      matchRate: Math.floor(Math.random() * 20) + 80 // 80~99%
    })).sort((a, b) => b.matchRate - a.matchRate)
  }, [isFormComplete, selectedAge, selectedJob, selectedInterest])

  return (
    <div className="py-12 md:py-20 mx-auto max-w-5xl px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl text-balance">
          나에게 필요한 정책 찾기
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          몇 가지 질문에 답하면 딱 맞는 정책을 추천해드립니다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4 text-lg border-b pb-2">연령대 선택</h3>
            <div className="flex flex-wrap gap-2">
              {FILTERS.age.map(age => (
                <button
                  key={age}
                  onClick={() => setSelectedAge(age)}
                  className={cn(
                    "px-4 py-2 rounded-full font-medium transition-all text-sm border",
                    selectedAge === age 
                      ? "bg-primary text-white border-primary shadow-md"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:border-primary/50 hover:bg-primary/5"
                  )}
                >
                  {age}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4 text-lg border-b pb-2">직업 선택</h3>
            <div className="flex flex-wrap gap-2">
              {FILTERS.job.map(job => (
                <button
                  key={job}
                  onClick={() => setSelectedJob(job)}
                  className={cn(
                    "px-4 py-2 rounded-full font-medium transition-all text-sm border",
                    selectedJob === job 
                      ? "bg-primary text-white border-primary shadow-md"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:border-primary/50 hover:bg-primary/5"
                  )}
                >
                  {job}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4 text-lg border-b pb-2">관심 분야</h3>
            <div className="flex flex-wrap gap-2">
              {FILTERS.interest.map(interest => (
                <button
                  key={interest}
                  onClick={() => setSelectedInterest(interest)}
                  className={cn(
                    "px-4 py-2 rounded-full font-medium transition-all text-sm border",
                    selectedInterest === interest 
                      ? "bg-primary text-white border-primary shadow-md"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:border-primary/50 hover:bg-primary/5"
                  )}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {!isFormComplete ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white border border-gray-200 border-dashed rounded-3xl p-10 text-center"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">항목을 모두 선택해주세요</h3>
                <p className="text-gray-500">연령, 직업, 관심분야를 선택하시면<br/> AI가 최적의 정책을 분석하여 추천해 드립니다.</p>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex items-start gap-4">
                  <div className="bg-primary text-white p-3 rounded-xl shrink-0">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-1">
                      {selectedAge} {selectedJob}을 위한 맞춤 추천입니다!
                    </h3>
                    <p className="text-sm text-gray-600">
                      선택하신 프로필과 '{selectedInterest}' 관심사를 바탕으로 {recommendations.length}개의 주요 정책을 선별했습니다.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {recommendations.map((pledge, idx) => (
                    <motion.div
                      key={pledge.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                    >
                      <Card className="overflow-hidden border border-gray-200 hover:border-primary/50 transition-all shadow-sm hover:shadow-md relative">
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="text-lg font-bold text-gray-900 leading-tight pr-12">{pledge.title}</h4>
                            <div className="bg-success/10 text-success font-bold text-sm px-2 py-1 rounded-full whitespace-nowrap absolute right-6 top-6">
                              {pledge.matchRate}% 일치
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                            <Badge variant="ghost" className="text-xs">{pledge.department}</Badge>
                            <Button variant="link" size="sm" className="ml-auto p-0 h-auto text-primary text-xs">
                              상세보기 <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
