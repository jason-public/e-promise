import React, { useMemo } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts"
import { MOCK_PLEDGES, CATEGORIES, REGIONS } from "@/data"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ffc658', '#8dd1e1', '#a4de6c', '#d0ed57', '#83a6ed', '#8e4585']

export function DashboardCharts() {
  const categoryData = useMemo(() => {
    return CATEGORIES.map((cat) => {
      const count = MOCK_PLEDGES.filter(p => p.categoryId === cat.id).length
      return {
        name: cat.title,
        count: count
      }
    }).sort((a, b) => b.count - a.count)
  }, [])

  const regionData = useMemo(() => {
    return REGIONS.map((region) => {
      const count = MOCK_PLEDGES.filter(p => region.areas.includes(p.region)).length
      return {
        name: region.name,
        count: count
      }
    })
  }, [])

  const commonPledgesCount = MOCK_PLEDGES.filter(p => p.region === "남양주 전역").length
  if (commonPledgesCount > 0) {
    regionData.push({
      name: "공통 (전역)",
      count: commonPledgesCount
    })
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          공약 현황 대시보드
        </h2>
        <p className="mt-4 text-lg text-gray-400">
          남양주시의 분야별 및 지역별 사업 추진 현황을 한눈에 확인하세요.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Chart */}
        <div className="bg-[#111827] rounded-2xl border border-white/10 p-6 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-6">분야별 공약 건수</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryData}
                margin={{ top: 10, right: 10, left: -20, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#9ca3af" 
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                  tickMargin={10}
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis 
                  stroke="#9ca3af" 
                  tick={{ fill: '#9ca3af', fontSize: 13 }} 
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  cursor={{ fill: '#ffffff0a' }}
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f9fafb', borderRadius: '8px' }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Region Chart */}
        <div className="bg-[#111827] rounded-2xl border border-white/10 p-6 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-6">지역별 공약 건수</h3>
          <div className="h-[350px] w-full flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={regionData}
                  cx="50%"
                  cy="45%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="count"
                  stroke="none"
                >
                  {regionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value}개`, '공약 건수']}
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f9fafb', borderRadius: '8px' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle"
                  wrapperStyle={{ color: '#9ca3af', fontSize: '14px', paddingTop: '10px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
