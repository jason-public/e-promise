import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="relative w-full bg-[#1b2c7a] mt-[-1px]">
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-[0px] bg-no-repeat bg-[left_80px] md:bg-[250px_center] bg-[length:100%_auto]"
          style={{ 
            backgroundImage: "url('https://raw.githubusercontent.com/jason-public/e-promise/ff009727576c6d547f2c0dcf946983ee12a9d02f/public/hero-bg.webp')",
            maskImage: isMobile ? "none" : "radial-gradient(ellipse at 30% 30%, black 50%, transparent 100%)",
            WebkitMaskImage: isMobile ? "none" : "radial-gradient(ellipse at 30% 30%, black 50%, transparent 100%)"
          }}
        />
        {/* Gradient Overlay (X-axis): Smoothly fades left portrait to background color */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-[#1b2c7a]/40 to-[#1b2c7a]" />

        {/* Gradient Overlay (Y-axis): Smoothly fades bottom edge of the portrait and increases text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1b2c7a]/20 to-[#1b2c7a]" />
      </div>

      {/* Hero Section Content */}
      <div className="relative z-10 flex items-center min-h-[calc(100vh-80px)] md:min-h-[700px] lg:min-h-[800px] overflow-hidden">
        {/* Content */}
        <div className="relative z-10 w-full flex justify-end px-6 py-24 md:py-32 lg:py-40 md:pr-16 lg:pr-32 text-right">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             className="flex flex-col items-end max-w-2xl mt-[92px] sm:mt-[124px] md:-mt-[100px] relative z-20"
          >
            <h1 className="text-[28px] sm:text-[36px] md:text-4xl xl:text-[42px] font-bold text-white leading-[1.3] tracking-tight text-right break-keep mb-6 drop-shadow-lg shadow-black/50">
              더 나은 남양주를 위한 미래,<br />
              시민과 함께 만들어 가겠습니다.
            </h1>

            <div className="mb-4 md:mb-5 rounded-full border border-blue-800/60 bg-blue-900/40 px-6 py-2 inline-block text-[15px] sm:text-[17px] md:text-lg text-blue-100 shadow-sm font-medium tracking-wide backdrop-blur-sm">
              최현덕 남양주시장 당선인
            </div>


            <div className="flex flex-wrap gap-3 sm:gap-4 mt-3 md:mt-5 w-full justify-end">
              <Link to="/categories">
                <Button className="bg-[#2596be] hover:bg-[#2082a5] text-white backdrop-blur-md rounded-full px-5 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold shadow-lg transition-all border border-[#2596be]/50 whitespace-nowrap">
                  분야별 약속 보기
                </Button>
              </Link>
              <Link to="/regional">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold shadow-lg transition-all border border-blue-500/30 whitespace-nowrap">
                  지역별 약속 보기
                </Button>
              </Link>
              <Link to="/search">
                <Button className="bg-[#97dbae] hover:bg-[#85c89c] text-slate-900 backdrop-blur-md rounded-full px-5 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold shadow-lg transition-all border border-[#97dbae]/50 whitespace-nowrap">
                  키워드 약속 검색
                </Button>
              </Link>
            </div>

             <div className="mt-5 sm:mt-6 text-[16px] md:text-[17px] text-gray-200 font-medium tracking-tight break-keep drop-shadow-md shadow-black/50 flex flex-col gap-4 text-right leading-relaxed mb-6">
             
              <p>
                여러분이 제안해 주신 정책들은 책임 있게 검토하고<br className="hidden sm:block" />
                실질적인 시정 변화로 이어가겠습니다.
              </p>
              <p>
                미래산업과 좋은 일자리,돌봄과 문화,<br className="hidden sm:block" />
                녹색과 공동체가 함께 성장하는<br className="hidden sm:block" />
                주민주권 도시 남양주를 만들겠습니다.
              </p>
            </div>

            
          </motion.div>
        </div>
      </div>
    </div>
  )
}

