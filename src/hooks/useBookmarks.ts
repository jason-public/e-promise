import { useState, useEffect, useCallback } from "react"

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    if (typeof window === "undefined") return []
    try {
      const saved = localStorage.getItem("bookmarks")
      return saved ? JSON.parse(saved) : []
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem("bookmarks")
        setBookmarks(saved ? JSON.parse(saved) : [])
      } catch (e) {
        setBookmarks([])
      }
    }
    
    window.addEventListener("bookmarksUpdated", handleStorageChange)
    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("bookmarksUpdated", handleStorageChange)
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  const toggleBookmark = useCallback((id: string) => {
    try {
      const saved = localStorage.getItem("bookmarks")
      const current = saved ? JSON.parse(saved) : []
      const newBookmarks = current.includes(id)
        ? current.filter((b: string) => b !== id)
        : [...current, id]
      
      localStorage.setItem("bookmarks", JSON.stringify(newBookmarks))
      window.dispatchEvent(new Event("bookmarksUpdated"))
    } catch (e) {
      console.error("Failed to update bookmarks", e)
    }
  }, [])

  const isBookmarked = useCallback((id: string) => bookmarks.includes(id), [bookmarks])

  return { bookmarks, toggleBookmark, isBookmarked }
}
