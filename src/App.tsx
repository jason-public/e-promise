import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom"
import { Home, Grid, Map, Search, UserCircle, MapPin, Heart, Star, Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeProvider, useTheme } from "@/components/ThemeProvider"

// Placeholder pages
import HomePage from "./pages/Home"
import CategoriesPage from "./pages/Categories"
import RegionalPage from "./pages/Regional"
import SearchPage from "./pages/Search"
import MyPolicyPage from "./pages/MyPolicy"
import FavoritesPage from "./pages/Favorites"
import ScrollToTop from "./components/ScrollToTop"

function BottomNav() {
  const location = useLocation()
  
  const navItems = [
    { name: "홈", path: "/", icon: Home },
    { name: "분야별", path: "/categories", icon: Grid },
    { name: "지역별", path: "/regional", icon: MapPin },
    { name: "검색", path: "/search", icon: Search },
    { name: "관심", path: "/favorites", icon: Heart },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 bg-white dark:bg-[#1b2c7a] border-t border-gray-200 dark:border-slate-800 pb-safe md:hidden shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path))
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-1 flex-col items-center justify-center space-y-1 transition-colors",
              isActive ? "text-primary dark:text-blue-400" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-semibold">{item.name}</span>
          </Link>
        )
      })}
    </div>
  )
}

function TopNav() {
  const location = useLocation()
  
  const navItems = [
    { name: "홈", path: "/" },
    { name: "지역별 약속", path: "/regional" },
    { name: "분야별 약속", path: "/categories" },
    { name: "약속 검색", path: "/search" },
    { name: "즐겨찾기", path: "/favorites" },
  ]

  const isHome = location.pathname === "/"
  const { theme, setTheme } = useTheme()

  return (
    <nav className={cn(
      "sticky top-0 z-50 border-b transition-colors duration-300",
      isHome ? "bg-[#1b2c7a] backdrop-blur-sm border-white/5 text-white" : "bg-white dark:bg-[#1b2c7a] border-slate-200 dark:border-white/5 text-gray-900 dark:text-white"
    )}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center gap-3">
              <span className="bg-[#1e88e5] text-white text-xs font-bold px-2 py-1 rounded">남양주</span>
              <h1 className="font-bold text-[17px] tracking-tight">시민과 함께 만들어 가는 미래</h1>
            </Link>
          </div>
          <div className="flex items-center gap-8">
            <div className="hidden lg:flex space-x-8 text-sm font-medium">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "transition-colors",
                      isHome 
                        ? (isActive ? "text-white font-bold" : "text-gray-300 hover:text-white")
                        : (isActive ? "text-primary font-bold" : "text-gray-600 hover:text-gray-900")
                    )}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </div>
            <div className="flex items-center space-x-5">
              <button 
                title={theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={cn(
                  "transition-colors", 
                  isHome ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                )}
              >
                {theme === "dark" ? (
                  <Sun className="w-[18px] h-[18px]" />
                ) : (
                  <Moon className="w-[18px] h-[18px]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="bg-[#1b2c7a] border-t border-slate-800 px-6 lg:px-8 py-4 flex flex-col items-center justify-center pb-24 md:pb-4 mt-0 text-xs">
      <div className="flex gap-4 font-bold text-slate-500 mt-2 md:mt-0">
         <span className="text-blue-400">#공약이행</span>
         <span>#소통행정</span>
         <span>#투명남양주</span>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="app-theme">
      <Router>
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#1b2c7a] dark:text-gray-100 pb-0 font-sans text-[#111827] selection:bg-primary/20 flex flex-col">
          <TopNav />
          <main className="w-full relative flex-1">
            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/regional" element={<RegionalPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/my-policy" element={<MyPolicyPage />} />
          </Routes>
        </main>
        <Footer />
        <BottomNav />
        <ScrollToTop />
        </div>
      </Router>
    </ThemeProvider>
  )
}
