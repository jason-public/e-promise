import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ChevronRight, Target } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CATEGORIES } from "@/data"
import { CategoryDialog } from "@/components/CategoryDialog"

export default function Categories() {
  return (
      <div className="py-8 md:py-12 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">분야별 약속</h1>
          <p className="mt-2 text-sm text-slate-600">
            남양주시의 미래를 만들어갈 10대 분야별 시민 제안과 약속을 살펴보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CATEGORIES.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <CategoryDialog category={cat}>
              <Card className="h-full hover:shadow border-slate-200 transition-all group overflow-hidden cursor-pointer">
                <CardContent className="p-0 flex flex-col sm:flex-row h-full">
                  <div className={cn("p-6 sm:w-1/3 flex flex-col items-center justify-center text-center border-b sm:border-b-0 sm:border-r border-slate-100", cat.color, "bg-opacity-[0.03]")}>
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm mb-3", cat.color)}>
                      <Target className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{cat.title}</h3>
                    <div className="mt-1 text-xs text-slate-500 font-medium">{cat.count}건</div>
                  </div>
                  
                  <div className="p-6 sm:w-2/3 flex flex-col justify-center">
                    <div className="mt-2">
                      <h4 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center">
                        주요 정책 
                        <ChevronRight className="w-3 h-3 ml-0.5 text-slate-400 group-hover:text-primary transition-colors" />
                      </h4>
                      <ul className="space-y-1.5 text-left">
                        {cat.topPledges.slice(0, 2).map((pledge, i) => (
                          <li key={i} className="text-xs text-slate-700 flex items-start">
                            <span className={cn("w-1 h-1 rounded-full mt-1.5 mr-2 flex-shrink-0", cat.color)} />
                            <span className="line-clamp-1">{pledge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CategoryDialog>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
