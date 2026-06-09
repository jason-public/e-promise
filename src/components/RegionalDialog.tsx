import React, { useState, ReactNode, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, X } from "lucide-react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { MOCK_PLEDGES } from "@/data"
import { useBookmarks } from "@/hooks/useBookmarks"

interface RegionalDialogProps {
  key?: React.Key
  area: string
  children: ReactNode
}

export function RegionalDialog({ area, children }: RegionalDialogProps) {
  const [open, setOpen] = useState(false)
  const [pageSize, setPageSize] = useState<number>(5)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  const { toggleBookmark, isBookmarked } = useBookmarks()
  
  const allPledges = MOCK_PLEDGES.filter(p => p.region === area && p.pledgeType === "regional")
  const totalPages = Math.max(1, Math.ceil(allPledges.length / pageSize))
  const pledges = allPledges.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <>
      <div onClick={() => setOpen(true)} className="h-full">
        {children}
      </div>
      
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative z-50 w-full sm:max-w-[700px] h-[85vh] sm:h-[80vh] flex flex-col p-0 gap-0 overflow-hidden bg-slate-50 rounded-xl shadow-2xl"
            >
              <div className={`p-6 sm:p-8 bg-primary bg-opacity-10 border-b border-gray-200 shrink-0 relative`}>
                <button 
                  onClick={() => setOpen(false)} 
                  className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-900 bg-white/50 rounded-full transition-colors focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight text-balance">
                  {area} 지역 주요 사업
                </div>
                <p className="text-lg text-gray-600 font-medium mt-2">
                  현재 {allPledges.length}개의 관련 공약 및 시민제안 정책이 추진 예정입니다.
                </p>
              </div>

              <div ref={scrollContainerRef} className="flex-1 overflow-y-auto min-h-0">
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                    <h2 className="text-xl font-bold text-gray-900 border-b-2 border-primary pb-2 inline-block">
                      전체 공약 <span className="text-primary">{allPledges.length}</span>
                    </h2>
                    <select
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value))
                        setCurrentPage(1)
                        if (scrollContainerRef.current) {
                          scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" })
                        }
                      }}
                      className="px-3 py-1.5 border border-gray-300 rounded-md text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary w-fit bg-white cursor-pointer"
                    >
                      <option value={5}>5개씩 보기</option>
                      <option value={10}>10개씩 보기</option>
                      <option value={20}>20개씩 보기</option>
                    </select>
                  </div>
        
                  <div className="space-y-4 pb-8">
                    {pledges.map((pledge, idx) => (
                      <motion.div
                        key={pledge.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <Card className="overflow-hidden border-gray-200 shadow-sm hover:border-gray-300 hover:shadow-md transition-all bg-white">
                          <CardHeader className="pb-4">
                            <div className="flex flex-row items-start justify-between gap-4">
                               <CardTitle className="text-[15px] sm:text-[17px] text-gray-900 leading-tight mt-0.5">
                                 {(currentPage - 1) * pageSize + idx + 1}. {pledge.title}
                               </CardTitle>
                               <button
                                 onClick={(e) => {
                                   e.preventDefault()
                                   e.stopPropagation()
                                   toggleBookmark(pledge.id)
                                 }}
                                 className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                               >
                                 <Heart
                                   className={`w-5 h-5 ${isBookmarked(pledge.id) ? "fill-red-500 text-red-500" : ""}`}
                                 />
                               </button>
                            </div>
                          </CardHeader>
                        </Card>
                      </motion.div>
                    ))}
                    {allPledges.length === 0 && (
                      <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                        <p className="text-gray-500 font-medium">해당 지역에 등록된 공약이 없습니다.</p>
                      </div>
                    )}
                    
                    {totalPages > 1 && (
                      <div className="flex items-center justify-center gap-3 mt-8 pt-4">
                        <button
                          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                          className={`px-4 py-2 border border-gray-300 bg-white rounded-md text-sm transition-colors font-medium ${
                            currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-50"
                          }`}
                        >
                          이전
                        </button>
                        <span className="text-sm font-medium text-slate-700">
                          {currentPage} / {totalPages}
                        </span>
                        <button
                          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                          className={`px-4 py-2 border border-gray-300 bg-white rounded-md text-sm transition-colors font-medium ${
                            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-50"
                          }`}
                        >
                          다음
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

