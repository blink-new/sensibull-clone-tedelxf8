import React from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { 
  LayoutDashboard, 
  TrendingUp, 
  Layers, 
  Briefcase, 
  Star, 
  BarChart3, 
  PlayCircle, 
  BookOpen, 
  Settings,
  ChevronRight
} from 'lucide-react'
import { cn } from '../../lib/utils'

type Page = 'dashboard' | 'options-chain' | 'strategy-builder' | 'portfolio' | 'watchlist' | 'market-analysis' | 'virtual-trading' | 'education' | 'settings'

interface SidebarProps {
  currentPage: Page
  onPageChange: (page: Page) => void
  isOpen: boolean
}

const navigationItems = [
  {
    id: 'dashboard' as Page,
    label: 'Dashboard',
    icon: LayoutDashboard,
    badge: null
  },
  {
    id: 'options-chain' as Page,
    label: 'Options Chain',
    icon: TrendingUp,
    badge: 'Live'
  },
  {
    id: 'strategy-builder' as Page,
    label: 'Strategy Builder',
    icon: Layers,
    badge: null
  },
  {
    id: 'portfolio' as Page,
    label: 'Portfolio',
    icon: Briefcase,
    badge: null
  },
  {
    id: 'watchlist' as Page,
    label: 'Watchlist',
    icon: Star,
    badge: null
  },
  {
    id: 'market-analysis' as Page,
    label: 'Market Analysis',
    icon: BarChart3,
    badge: null
  },
  {
    id: 'virtual-trading' as Page,
    label: 'Virtual Trading',
    icon: PlayCircle,
    badge: 'New'
  },
  {
    id: 'education' as Page,
    label: 'Education',
    icon: BookOpen,
    badge: null
  },
  {
    id: 'settings' as Page,
    label: 'Settings',
    icon: Settings,
    badge: null
  }
]

export function Sidebar({ currentPage, onPageChange, isOpen }: SidebarProps) {
  return (
    <aside className={cn(
      "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-border transition-all duration-300 z-40",
      isOpen ? "w-64" : "w-16"
    )}>
      <div className="flex flex-col h-full">
        <div className="flex-1 py-4">
          <nav className="space-y-1 px-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start h-11 px-3",
                    isActive && "bg-primary/10 text-primary border-r-2 border-primary",
                    !isOpen && "px-2"
                  )}
                  onClick={() => onPageChange(item.id)}
                >
                  <Icon className={cn("h-5 w-5", isOpen && "mr-3")} />
                  {isOpen && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <Badge 
                          variant="secondary" 
                          className={cn(
                            "ml-auto text-xs",
                            item.badge === 'Live' && "bg-green-100 text-green-800",
                            item.badge === 'New' && "bg-accent/20 text-accent"
                          )}
                        >
                          {item.badge}
                        </Badge>
                      )}
                      {isActive && (
                        <ChevronRight className="h-4 w-4 ml-2" />
                      )}
                    </>
                  )}
                </Button>
              )
            })}
          </nav>
        </div>
        
        {isOpen && (
          <div className="p-4 border-t border-border">
            <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-4 text-white">
              <h3 className="font-semibold text-sm mb-1">Upgrade to Pro</h3>
              <p className="text-xs opacity-90 mb-3">Get advanced analytics and unlimited strategies</p>
              <Button size="sm" variant="secondary" className="w-full text-primary">
                Upgrade Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}