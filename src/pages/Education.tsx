import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Progress } from '../components/ui/progress'
import { 
  BookOpen, 
  Play, 
  Clock, 
  Star,
  Search,
  Filter,
  TrendingUp,
  Target,
  Calculator,
  BarChart3,
  Lightbulb,
  Award,
  Users,
  CheckCircle,
  PlayCircle,
  FileText,
  Video,
  Headphones,
  Download,
  Bookmark,
  Share,
  ThumbsUp,
  MessageCircle,
  Eye,
  Calendar,
  Zap,
  AlertTriangle,
  DollarSign,
  Activity
} from 'lucide-react'

interface Course {
  id: string
  title: string
  description: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  lessons: number
  rating: number
  students: number
  instructor: string
  price: number
  category: string
  thumbnail: string
  tags: string[]
  progress?: number
  isEnrolled?: boolean
  isFree?: boolean
}

interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishDate: string
  readTime: string
  category: string
  tags: string[]
  views: number
  likes: number
  comments: number
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  thumbnail: string
}

interface Strategy {
  id: string
  name: string
  description: string
  type: 'Bullish' | 'Bearish' | 'Neutral'
  complexity: 'Simple' | 'Moderate' | 'Complex'
  maxProfit: string
  maxLoss: string
  breakeven: string[]
  bestMarket: string
  riskLevel: 'Low' | 'Medium' | 'High'
  legs: number
  marginRequired: string
  example: string
}

interface Quiz {
  id: string
  title: string
  description: string
  questions: number
  timeLimit: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  category: string
  attempts: number
  bestScore?: number
  isCompleted?: boolean
}

export function Education() {
  const [activeTab, setActiveTab] = useState('courses')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [sortBy, setSortBy] = useState('popular')

  const courses: Course[] = [
    {
      id: '1',
      title: 'Options Trading Fundamentals',
      description: 'Master the basics of options trading including calls, puts, Greeks, and basic strategies',
      level: 'Beginner',
      duration: '4 hours',
      lessons: 12,
      rating: 4.8,
      students: 15420,
      instructor: 'Rajesh Kumar',
      price: 0,
      category: 'Options Basics',
      thumbnail: '📚',
      tags: ['Options', 'Basics', 'Greeks', 'Strategies'],
      progress: 75,
      isEnrolled: true,
      isFree: true
    },
    {
      id: '2',
      title: 'Advanced Options Strategies',
      description: 'Learn complex multi-leg strategies like Iron Condor, Butterfly, and Calendar spreads',
      level: 'Advanced',
      duration: '6 hours',
      lessons: 18,
      rating: 4.9,
      students: 8750,
      instructor: 'Priya Sharma',
      price: 2999,
      category: 'Advanced Strategies',
      thumbnail: '🎯',
      tags: ['Advanced', 'Multi-leg', 'Iron Condor', 'Butterfly'],
      progress: 0,
      isEnrolled: false,
      isFree: false
    },
    {
      id: '3',
      title: 'Risk Management in Options',
      description: 'Essential risk management techniques for options traders',
      level: 'Intermediate',
      duration: '3 hours',
      lessons: 10,
      rating: 4.7,
      students: 12300,
      instructor: 'Amit Patel',
      price: 1999,
      category: 'Risk Management',
      thumbnail: '🛡️',
      tags: ['Risk', 'Management', 'Position Sizing', 'Stop Loss'],
      progress: 45,
      isEnrolled: true,
      isFree: false
    },
    {
      id: '4',
      title: 'Technical Analysis for Options',
      description: 'Use technical analysis to time your options trades effectively',
      level: 'Intermediate',
      duration: '5 hours',
      lessons: 15,
      rating: 4.6,
      students: 9850,
      instructor: 'Neha Gupta',
      price: 2499,
      category: 'Technical Analysis',
      thumbnail: '📈',
      tags: ['Technical Analysis', 'Charts', 'Indicators', 'Timing'],
      progress: 0,
      isEnrolled: false,
      isFree: false
    },
    {
      id: '5',
      title: 'Options Greeks Mastery',
      description: 'Deep dive into Delta, Gamma, Theta, Vega and how to use them',
      level: 'Intermediate',
      duration: '4 hours',
      lessons: 14,
      rating: 4.8,
      students: 11200,
      instructor: 'Vikram Singh',
      price: 1799,
      category: 'Greeks',
      thumbnail: '🔢',
      tags: ['Greeks', 'Delta', 'Gamma', 'Theta', 'Vega'],
      progress: 20,
      isEnrolled: true,
      isFree: false
    },
    {
      id: '6',
      title: 'Volatility Trading Strategies',
      description: 'Master volatility-based trading strategies and market timing',
      level: 'Advanced',
      duration: '7 hours',
      lessons: 20,
      rating: 4.9,
      students: 6500,
      instructor: 'Sanjay Mehta',
      price: 3499,
      category: 'Volatility',
      thumbnail: '⚡',
      tags: ['Volatility', 'VIX', 'Straddle', 'Strangle'],
      progress: 0,
      isEnrolled: false,
      isFree: false
    }
  ]

  const articles: Article[] = [
    {
      id: '1',
      title: 'Understanding Options Greeks: A Complete Guide',
      excerpt: 'Learn how Delta, Gamma, Theta, and Vega affect your options positions and how to use them for better trading decisions.',
      content: 'Full article content here...',
      author: 'Rajesh Kumar',
      publishDate: '2023-12-20',
      readTime: '8 min read',
      category: 'Greeks',
      tags: ['Greeks', 'Delta', 'Gamma', 'Options'],
      views: 15420,
      likes: 892,
      comments: 156,
      difficulty: 'Intermediate',
      thumbnail: '🔢'
    },
    {
      id: '2',
      title: 'Iron Condor Strategy: When and How to Use It',
      excerpt: 'Master the Iron Condor strategy for range-bound markets. Learn setup, management, and profit optimization.',
      content: 'Full article content here...',
      author: 'Priya Sharma',
      publishDate: '2023-12-18',
      readTime: '12 min read',
      category: 'Strategies',
      tags: ['Iron Condor', 'Neutral Strategy', 'Range Trading'],
      views: 12800,
      likes: 654,
      comments: 89,
      difficulty: 'Advanced',
      thumbnail: '🎯'
    },
    {
      id: '3',
      title: 'Options vs Futures: Which is Right for You?',
      excerpt: 'Compare options and futures trading to determine which instrument suits your trading style and risk tolerance.',
      content: 'Full article content here...',
      author: 'Amit Patel',
      publishDate: '2023-12-15',
      readTime: '6 min read',
      category: 'Basics',
      tags: ['Options', 'Futures', 'Comparison', 'Beginner'],
      views: 18500,
      likes: 1205,
      comments: 234,
      difficulty: 'Beginner',
      thumbnail: '⚖️'
    },
    {
      id: '4',
      title: 'Volatility Smile: What It Tells Us About Market Sentiment',
      excerpt: 'Understand the volatility smile phenomenon and how to interpret it for better options trading decisions.',
      content: 'Full article content here...',
      author: 'Neha Gupta',
      publishDate: '2023-12-12',
      readTime: '10 min read',
      category: 'Advanced',
      tags: ['Volatility', 'IV', 'Market Sentiment', 'Advanced'],
      views: 9200,
      likes: 445,
      comments: 67,
      difficulty: 'Advanced',
      thumbnail: '📊'
    }
  ]

  const strategies: Strategy[] = [
    {
      id: '1',
      name: 'Long Call',
      description: 'Buy a call option to profit from upward price movement with limited risk',
      type: 'Bullish',
      complexity: 'Simple',
      maxProfit: 'Unlimited',
      maxLoss: 'Premium Paid',
      breakeven: ['Strike + Premium'],
      bestMarket: 'Bullish with low volatility',
      riskLevel: 'Low',
      legs: 1,
      marginRequired: 'Premium Only',
      example: 'Buy NIFTY 19700 CE @ ₹50'
    },
    {
      id: '2',
      name: 'Bull Call Spread',
      description: 'Buy lower strike call and sell higher strike call for limited profit and risk',
      type: 'Bullish',
      complexity: 'Moderate',
      maxProfit: 'Strike Difference - Net Premium',
      maxLoss: 'Net Premium Paid',
      breakeven: ['Lower Strike + Net Premium'],
      bestMarket: 'Moderately bullish',
      riskLevel: 'Medium',
      legs: 2,
      marginRequired: 'Net Premium',
      example: 'Buy 19700 CE, Sell 19800 CE'
    },
    {
      id: '3',
      name: 'Iron Condor',
      description: 'Sell OTM call and put spreads to profit from range-bound movement',
      type: 'Neutral',
      complexity: 'Complex',
      maxProfit: 'Net Premium Received',
      maxLoss: 'Strike Width - Net Premium',
      breakeven: ['Lower Strike + Net Premium', 'Upper Strike - Net Premium'],
      bestMarket: 'Low volatility, range-bound',
      riskLevel: 'Medium',
      legs: 4,
      marginRequired: 'Strike Width - Net Premium',
      example: 'Sell 19600/19700 Put Spread, Sell 19800/19900 Call Spread'
    },
    {
      id: '4',
      name: 'Long Straddle',
      description: 'Buy ATM call and put to profit from high volatility in either direction',
      type: 'Neutral',
      complexity: 'Moderate',
      maxProfit: 'Unlimited',
      maxLoss: 'Total Premium Paid',
      breakeven: ['Strike - Total Premium', 'Strike + Total Premium'],
      bestMarket: 'High volatility expected',
      riskLevel: 'High',
      legs: 2,
      marginRequired: 'Total Premium',
      example: 'Buy 19700 CE + Buy 19700 PE'
    },
    {
      id: '5',
      name: 'Covered Call',
      description: 'Own stock and sell call option to generate income',
      type: 'Neutral',
      complexity: 'Simple',
      maxProfit: 'Strike - Stock Price + Premium',
      maxLoss: 'Stock Price - Premium',
      breakeven: ['Stock Price - Premium Received'],
      bestMarket: 'Neutral to slightly bullish',
      riskLevel: 'Low',
      legs: 2,
      marginRequired: 'Stock Value',
      example: 'Own 100 RELIANCE shares, Sell 2800 CE'
    },
    {
      id: '6',
      name: 'Butterfly Spread',
      description: 'Profit from minimal price movement around the middle strike',
      type: 'Neutral',
      complexity: 'Complex',
      maxProfit: 'Middle Strike - Lower Strike - Net Premium',
      maxLoss: 'Net Premium Paid',
      breakeven: ['Lower Strike + Net Premium', 'Upper Strike - Net Premium'],
      bestMarket: 'Very low volatility',
      riskLevel: 'Low',
      legs: 3,
      marginRequired: 'Net Premium',
      example: 'Buy 19600 CE, Sell 2x 19700 CE, Buy 19800 CE'
    }
  ]

  const quizzes: Quiz[] = [
    {
      id: '1',
      title: 'Options Basics Quiz',
      description: 'Test your understanding of basic options concepts',
      questions: 20,
      timeLimit: '30 minutes',
      difficulty: 'Beginner',
      category: 'Basics',
      attempts: 3,
      bestScore: 85,
      isCompleted: true
    },
    {
      id: '2',
      title: 'Greeks Mastery Test',
      description: 'Advanced quiz on options Greeks and their applications',
      questions: 25,
      timeLimit: '45 minutes',
      difficulty: 'Intermediate',
      category: 'Greeks',
      attempts: 1,
      bestScore: 72,
      isCompleted: true
    },
    {
      id: '3',
      title: 'Strategy Implementation Challenge',
      description: 'Complex scenarios testing strategy selection and implementation',
      questions: 30,
      timeLimit: '60 minutes',
      difficulty: 'Advanced',
      category: 'Strategies',
      attempts: 0,
      isCompleted: false
    },
    {
      id: '4',
      title: 'Risk Management Assessment',
      description: 'Evaluate your risk management knowledge and skills',
      questions: 15,
      timeLimit: '25 minutes',
      difficulty: 'Intermediate',
      category: 'Risk Management',
      attempts: 2,
      bestScore: 90,
      isCompleted: true
    }
  ]

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel
    return matchesSearch && matchesCategory && matchesLevel
  })

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    const matchesLevel = selectedLevel === 'all' || article.difficulty === selectedLevel
    return matchesSearch && matchesCategory && matchesLevel
  })

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'Beginner':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Beginner</Badge>
      case 'Intermediate':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Intermediate</Badge>
      case 'Advanced':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Advanced</Badge>
      default:
        return <Badge variant="outline">{level}</Badge>
    }
  }

  const getStrategyTypeBadge = (type: string) => {
    switch (type) {
      case 'Bullish':
        return <Badge variant="default" className="bg-green-100 text-green-800">Bullish</Badge>
      case 'Bearish':
        return <Badge variant="destructive" className="bg-red-100 text-red-800">Bearish</Badge>
      case 'Neutral':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Neutral</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'Low':
        return <Badge variant="outline" className="bg-green-50 text-green-700">Low Risk</Badge>
      case 'Medium':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Medium Risk</Badge>
      case 'High':
        return <Badge variant="outline" className="bg-red-50 text-red-700">High Risk</Badge>
      default:
        return <Badge variant="outline">{risk}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Education Center</h1>
          <p className="text-muted-foreground">Master options trading with comprehensive courses, articles, and resources</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Bookmark className="h-4 w-4 mr-2" />
            My Bookmarks
          </Button>
          <Button variant="outline" size="sm">
            <Award className="h-4 w-4 mr-2" />
            Certificates
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download App
          </Button>
        </div>
      </div>

      {/* Learning Progress */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">3</div>
              <div className="text-sm text-muted-foreground">Courses Enrolled</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">47%</div>
              <div className="text-sm text-muted-foreground">Overall Progress</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-muted-foreground">Articles Read</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">3</div>
              <div className="text-sm text-muted-foreground">Quizzes Completed</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="strategies">Strategies</TabsTrigger>
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          <TabsTrigger value="glossary">Glossary</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Options Basics">Options Basics</SelectItem>
                    <SelectItem value="Advanced Strategies">Advanced Strategies</SelectItem>
                    <SelectItem value="Risk Management">Risk Management</SelectItem>
                    <SelectItem value="Technical Analysis">Technical Analysis</SelectItem>
                    <SelectItem value="Greeks">Greeks</SelectItem>
                    <SelectItem value="Volatility">Volatility</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="text-4xl mb-2">{course.thumbnail}</div>
                    <div className="flex items-center space-x-1">
                      {course.isFree && <Badge variant="secondary" className="bg-green-100 text-green-800">Free</Badge>}
                      {course.isEnrolled && <Badge variant="default">Enrolled</Badge>}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{course.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    {getLevelBadge(course.level)}
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{course.rating}</span>
                      <span className="text-muted-foreground">({course.students.toLocaleString()})</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <PlayCircle className="h-4 w-4" />
                        <span>{course.lessons} lessons</span>
                      </div>
                    </div>
                    <div className="font-medium text-foreground">
                      {course.price === 0 ? 'Free' : `₹${course.price}`}
                    </div>
                  </div>

                  {course.isEnrolled && course.progress !== undefined && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1">
                    {course.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    {course.isEnrolled ? (
                      <Button className="flex-1">
                        <Play className="h-4 w-4 mr-2" />
                        Continue Learning
                      </Button>
                    ) : (
                      <Button className="flex-1">
                        {course.isFree ? 'Enroll Free' : 'Enroll Now'}
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="articles" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Basics">Basics</SelectItem>
                    <SelectItem value="Strategies">Strategies</SelectItem>
                    <SelectItem value="Greeks">Greeks</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Articles List */}
          <div className="space-y-4">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{article.thumbnail}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold">{article.title}</h3>
                        {getLevelBadge(article.difficulty)}
                      </div>
                      <p className="text-muted-foreground mb-3">{article.excerpt}</p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                        <div className="flex items-center space-x-4">
                          <span>By {article.author}</span>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(article.publishDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{article.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{article.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{article.comments}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {article.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Bookmark className="h-4 w-4 mr-2" />
                            Save
                          </Button>
                          <Button size="sm">
                            <FileText className="h-4 w-4 mr-2" />
                            Read Article
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="strategies" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {strategies.map((strategy) => (
              <Card key={strategy.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{strategy.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      {getStrategyTypeBadge(strategy.type)}
                      {getRiskBadge(strategy.riskLevel)}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{strategy.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Max Profit</div>
                      <div className="font-medium text-green-600">{strategy.maxProfit}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Max Loss</div>
                      <div className="font-medium text-red-600">{strategy.maxLoss}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Complexity</div>
                      <div className="font-medium">{strategy.complexity}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Legs</div>
                      <div className="font-medium">{strategy.legs}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Breakeven Points</div>
                    <div className="text-sm font-medium">
                      {strategy.breakeven.join(', ')}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Best Market Condition</div>
                    <div className="text-sm font-medium">{strategy.bestMarket}</div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Example</div>
                    <div className="text-sm font-mono bg-muted p-2 rounded">{strategy.example}</div>
                  </div>

                  <div className="flex space-x-2">
                    <Button className="flex-1">
                      <Calculator className="h-4 w-4 mr-2" />
                      Build Strategy
                    </Button>
                    <Button variant="outline" size="sm">
                      <Lightbulb className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quizzes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quizzes.map((quiz) => (
              <Card key={quiz.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{quiz.title}</CardTitle>
                    <div className="flex items-center space-x-2">
                      {getLevelBadge(quiz.difficulty)}
                      {quiz.isCompleted && <CheckCircle className="h-5 w-5 text-green-600" />}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{quiz.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Questions</div>
                      <div className="font-medium">{quiz.questions}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Time Limit</div>
                      <div className="font-medium">{quiz.timeLimit}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Attempts</div>
                      <div className="font-medium">{quiz.attempts}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Best Score</div>
                      <div className={`font-medium ${quiz.bestScore ? (quiz.bestScore >= 80 ? 'text-green-600' : quiz.bestScore >= 60 ? 'text-yellow-600' : 'text-red-600') : ''}`}>
                        {quiz.bestScore ? `${quiz.bestScore}%` : 'Not attempted'}
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" disabled={quiz.isCompleted && quiz.attempts >= 3}>
                    {quiz.isCompleted ? 'Retake Quiz' : 'Start Quiz'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="glossary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Options Trading Glossary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-primary">Call Option</h4>
                    <p className="text-sm text-muted-foreground">A contract that gives the holder the right to buy an underlying asset at a specific price within a certain time period.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Put Option</h4>
                    <p className="text-sm text-muted-foreground">A contract that gives the holder the right to sell an underlying asset at a specific price within a certain time period.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Strike Price</h4>
                    <p className="text-sm text-muted-foreground">The predetermined price at which an option can be exercised.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Premium</h4>
                    <p className="text-sm text-muted-foreground">The price paid to purchase an option contract.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Delta</h4>
                    <p className="text-sm text-muted-foreground">Measures how much an option's price changes for every ₹1 change in the underlying asset's price.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Gamma</h4>
                    <p className="text-sm text-muted-foreground">Measures the rate of change of delta with respect to changes in the underlying price.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Theta</h4>
                    <p className="text-sm text-muted-foreground">Measures how much an option's price decreases as time passes (time decay).</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Vega</h4>
                    <p className="text-sm text-muted-foreground">Measures how much an option's price changes with a 1% change in implied volatility.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-primary">Implied Volatility (IV)</h4>
                    <p className="text-sm text-muted-foreground">The market's forecast of a likely movement in an asset's price, reflected in the option's premium.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Open Interest (OI)</h4>
                    <p className="text-sm text-muted-foreground">The total number of outstanding option contracts that have not been settled.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">In-The-Money (ITM)</h4>
                    <p className="text-sm text-muted-foreground">An option that has intrinsic value. For calls: spot &gt; strike. For puts: spot &lt; strike.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">At-The-Money (ATM)</h4>
                    <p className="text-sm text-muted-foreground">An option where the strike price is equal or very close to the current market price.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Out-The-Money (OTM)</h4>
                    <p className="text-sm text-muted-foreground">An option with no intrinsic value. For calls: spot &lt; strike. For puts: spot &gt; strike.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Assignment</h4>
                    <p className="text-sm text-muted-foreground">When an option seller is required to fulfill their obligation to buy or sell the underlying asset.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Exercise</h4>
                    <p className="text-sm text-muted-foreground">The act of using the right granted by an option to buy or sell the underlying asset.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Expiration</h4>
                    <p className="text-sm text-muted-foreground">The date when an option contract becomes void and can no longer be exercised.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}