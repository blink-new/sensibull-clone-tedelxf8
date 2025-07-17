import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Switch } from '../components/ui/switch'
import { Slider } from '../components/ui/slider'
import { Separator } from '../components/ui/separator'
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette,
  Database,
  Smartphone,
  CreditCard,
  Download,
  Upload,
  RefreshCw,
  Save,
  Eye,
  EyeOff,
  Key,
  Lock,
  Mail,
  Phone,
  Globe,
  Monitor,
  Moon,
  Sun,
  Volume2,
  Vibrate,
  AlertTriangle,
  CheckCircle,
  Info,
  Trash2,
  LogOut,
  HelpCircle,
  FileText,
  Zap,
  Clock,
  Target,
  BarChart3,
  TrendingUp
} from 'lucide-react'

interface NotificationSetting {
  id: string
  title: string
  description: string
  enabled: boolean
  channels: {
    push: boolean
    email: boolean
    sms: boolean
  }
}

interface TradingPreference {
  id: string
  title: string
  description: string
  value: string | number | boolean
  type: 'select' | 'number' | 'boolean' | 'slider'
  options?: string[]
  min?: number
  max?: number
  step?: number
}

export function Settings() {
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState([5])
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [vibrationEnabled, setVibrationEnabled] = useState(true)

  const [profile, setProfile] = useState({
    firstName: 'Rajesh',
    lastName: 'Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '+91 98765 43210',
    dateOfBirth: '1985-06-15',
    address: '123 MG Road, Bangalore, Karnataka 560001',
    panNumber: 'ABCDE1234F',
    aadharNumber: '1234 5678 9012',
    bankAccount: 'HDFC Bank - ****1234',
    tradingExperience: 'Intermediate',
    riskTolerance: 'Medium',
    investmentGoals: 'Wealth Creation'
  })

  const notificationSettings: NotificationSetting[] = [
    {
      id: '1',
      title: 'Price Alerts',
      description: 'Get notified when your watchlist items hit target prices',
      enabled: true,
      channels: { push: true, email: true, sms: false }
    },
    {
      id: '2',
      title: 'Order Executions',
      description: 'Notifications for order fills, cancellations, and modifications',
      enabled: true,
      channels: { push: true, email: true, sms: true }
    },
    {
      id: '3',
      title: 'Market News',
      description: 'Breaking news and market updates',
      enabled: true,
      channels: { push: true, email: false, sms: false }
    },
    {
      id: '4',
      title: 'Options Expiry',
      description: 'Reminders for upcoming options expiry',
      enabled: true,
      channels: { push: true, email: true, sms: false }
    },
    {
      id: '5',
      title: 'Margin Calls',
      description: 'Critical margin requirement notifications',
      enabled: true,
      channels: { push: true, email: true, sms: true }
    },
    {
      id: '6',
      title: 'Educational Content',
      description: 'New courses, articles, and learning materials',
      enabled: false,
      channels: { push: false, email: true, sms: false }
    },
    {
      id: '7',
      title: 'System Maintenance',
      description: 'Platform updates and scheduled maintenance',
      enabled: true,
      channels: { push: true, email: true, sms: false }
    }
  ]

  const tradingPreferences: TradingPreference[] = [
    {
      id: '1',
      title: 'Default Order Type',
      description: 'Your preferred order type for new trades',
      value: 'Market',
      type: 'select',
      options: ['Market', 'Limit', 'Stop Loss', 'Stop Limit']
    },
    {
      id: '2',
      title: 'Default Quantity',
      description: 'Default quantity for options orders',
      value: 25,
      type: 'number',
      min: 1,
      max: 1000
    },
    {
      id: '3',
      title: 'Auto Square-off',
      description: 'Automatically square-off positions before expiry',
      value: true,
      type: 'boolean'
    },
    {
      id: '4',
      title: 'Square-off Time',
      description: 'Minutes before expiry to auto square-off',
      value: 15,
      type: 'number',
      min: 5,
      max: 60
    },
    {
      id: '5',
      title: 'Risk Per Trade',
      description: 'Maximum risk percentage per trade',
      value: 2,
      type: 'slider',
      min: 0.5,
      max: 10,
      step: 0.5
    },
    {
      id: '6',
      title: 'Show P&L in %',
      description: 'Display P&L in percentage instead of absolute values',
      value: false,
      type: 'boolean'
    },
    {
      id: '7',
      title: 'Confirm Orders',
      description: 'Show confirmation dialog before placing orders',
      value: true,
      type: 'boolean'
    },
    {
      id: '8',
      title: 'Chart Timeframe',
      description: 'Default timeframe for charts',
      value: '5m',
      type: 'select',
      options: ['1m', '5m', '15m', '1h', '1D']
    }
  ]

  const securitySettings = [
    {
      id: '1',
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      enabled: true,
      status: 'Active'
    },
    {
      id: '2',
      title: 'Login Alerts',
      description: 'Get notified of new login attempts',
      enabled: true,
      status: 'Active'
    },
    {
      id: '3',
      title: 'Session Timeout',
      description: 'Automatically log out after inactivity',
      enabled: true,
      status: '30 minutes'
    },
    {
      id: '4',
      title: 'Device Management',
      description: 'Manage trusted devices and active sessions',
      enabled: true,
      status: '3 devices'
    }
  ]

  const dataSettings = [
    {
      id: '1',
      title: 'Data Backup',
      description: 'Backup your trading data and preferences',
      lastBackup: '2023-12-20 10:30 AM',
      size: '2.4 MB'
    },
    {
      id: '2',
      title: 'Export Data',
      description: 'Download your trading history and reports',
      formats: ['CSV', 'Excel', 'PDF']
    },
    {
      id: '3',
      title: 'Data Retention',
      description: 'How long to keep your trading data',
      period: '5 years'
    }
  ]

  const subscriptionPlans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 0,
      features: ['Real-time data', 'Basic charts', 'Limited alerts'],
      current: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 999,
      features: ['Advanced charts', 'Unlimited alerts', 'Strategy builder', 'Priority support'],
      current: true
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 1999,
      features: ['All Pro features', 'Advanced analytics', 'API access', 'Custom indicators'],
      current: false
    }
  ]

  const updateProfile = () => {
    console.log('Updating profile:', profile)
    // Implementation for updating profile
  }

  const changePassword = () => {
    console.log('Changing password')
    // Implementation for changing password
  }

  const exportData = (format: string) => {
    console.log('Exporting data in format:', format)
    // Implementation for exporting data
  }

  const backupData = () => {
    console.log('Backing up data')
    // Implementation for backing up data
  }

  const deleteAccount = () => {
    console.log('Deleting account')
    // Implementation for account deletion
  }

  const logout = () => {
    console.log('Logging out')
    // Implementation for logout
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account, preferences, and trading settings</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={backupData}>
            <Upload className="h-4 w-4 mr-2" />
            Backup Data
          </Button>
          <Button size="sm" onClick={updateProfile}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="trading">Trading</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={(e) => setProfile({...profile, dateOfBirth: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={profile.address}
                    onChange={(e) => setProfile({...profile, address: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Trading Profile */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Trading Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="panNumber">PAN Number</Label>
                  <Input
                    id="panNumber"
                    value={profile.panNumber}
                    onChange={(e) => setProfile({...profile, panNumber: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="aadharNumber">Aadhar Number</Label>
                  <Input
                    id="aadharNumber"
                    value={profile.aadharNumber}
                    onChange={(e) => setProfile({...profile, aadharNumber: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="bankAccount">Bank Account</Label>
                  <Input
                    id="bankAccount"
                    value={profile.bankAccount}
                    disabled
                  />
                </div>
                <div>
                  <Label htmlFor="tradingExperience">Trading Experience</Label>
                  <Select value={profile.tradingExperience} onValueChange={(value) => setProfile({...profile, tradingExperience: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner (&lt; 1 year)</SelectItem>
                      <SelectItem value="Intermediate">Intermediate (1-3 years)</SelectItem>
                      <SelectItem value="Advanced">Advanced (3-5 years)</SelectItem>
                      <SelectItem value="Expert">Expert (&gt; 5 years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="riskTolerance">Risk Tolerance</Label>
                  <Select value={profile.riskTolerance} onValueChange={(value) => setProfile({...profile, riskTolerance: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Conservative">Conservative</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Aggressive">Aggressive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="investmentGoals">Investment Goals</Label>
                  <Select value={profile.investmentGoals} onValueChange={(value) => setProfile({...profile, investmentGoals: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Income Generation">Income Generation</SelectItem>
                      <SelectItem value="Wealth Creation">Wealth Creation</SelectItem>
                      <SelectItem value="Capital Preservation">Capital Preservation</SelectItem>
                      <SelectItem value="Speculation">Speculation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Password Change */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="h-5 w-5" />
                <span>Change Password</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter current password"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              <Button className="mt-4" onClick={changePassword}>
                <Key className="h-4 w-4 mr-2" />
                Change Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {notificationSettings.map((setting) => (
                  <div key={setting.id} className="flex items-start justify-between p-4 rounded-lg border">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Switch checked={setting.enabled} />
                        <div>
                          <h4 className="font-medium">{setting.title}</h4>
                          <p className="text-sm text-muted-foreground">{setting.description}</p>
                        </div>
                      </div>
                      {setting.enabled && (
                        <div className="ml-11 flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Switch checked={setting.channels.push} size="sm" />
                            <Smartphone className="h-4 w-4" />
                            <span>Push</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch checked={setting.channels.email} size="sm" />
                            <Mail className="h-4 w-4" />
                            <span>Email</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch checked={setting.channels.sms} size="sm" />
                            <Phone className="h-4 w-4" />
                            <span>SMS</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sound & Vibration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Volume2 className="h-5 w-5" />
                  <span>Sound Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Sound Notifications</h4>
                    <p className="text-sm text-muted-foreground">Play sounds for notifications</p>
                  </div>
                  <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Vibration</h4>
                    <p className="text-sm text-muted-foreground">Vibrate for important alerts</p>
                  </div>
                  <Switch checked={vibrationEnabled} onCheckedChange={setVibrationEnabled} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <RefreshCw className="h-5 w-5" />
                  <span>Auto Refresh</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Auto Refresh Data</h4>
                    <p className="text-sm text-muted-foreground">Automatically refresh market data</p>
                  </div>
                  <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
                </div>
                {autoRefresh && (
                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Refresh Interval: {refreshInterval[0]} seconds
                    </Label>
                    <Slider
                      value={refreshInterval}
                      onValueChange={setRefreshInterval}
                      min={1}
                      max={30}
                      step={1}
                      className="w-full"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trading" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Trading Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tradingPreferences.map((pref) => (
                  <div key={pref.id} className="space-y-2">
                    <div>
                      <h4 className="font-medium">{pref.title}</h4>
                      <p className="text-sm text-muted-foreground">{pref.description}</p>
                    </div>
                    {pref.type === 'select' && (
                      <Select value={pref.value as string}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {pref.options?.map((option) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    {pref.type === 'number' && (
                      <Input
                        type="number"
                        value={pref.value as number}
                        min={pref.min}
                        max={pref.max}
                      />
                    )}
                    {pref.type === 'boolean' && (
                      <Switch checked={pref.value as boolean} />
                    )}
                    {pref.type === 'slider' && (
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>{pref.min}%</span>
                          <span className="font-medium">{pref.value}%</span>
                          <span>{pref.max}%</span>
                        </div>
                        <Slider
                          value={[pref.value as number]}
                          min={pref.min}
                          max={pref.max}
                          step={pref.step}
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Display Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>Display Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Dark Mode</h4>
                      <p className="text-sm text-muted-foreground">Use dark theme for better viewing</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Sun className="h-4 w-4" />
                      <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                      <Moon className="h-4 w-4" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="english">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="hindi">हिंदी</SelectItem>
                        <SelectItem value="gujarati">ગુજરાતી</SelectItem>
                        <SelectItem value="marathi">मराठी</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="ist">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ist">IST (UTC+5:30)</SelectItem>
                        <SelectItem value="utc">UTC (UTC+0:00)</SelectItem>
                        <SelectItem value="est">EST (UTC-5:00)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currency">Currency Display</Label>
                    <Select defaultValue="inr">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inr">INR (₹)</SelectItem>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="numberFormat">Number Format</Label>
                    <Select defaultValue="indian">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="indian">Indian (1,23,456)</SelectItem>
                        <SelectItem value="international">International (123,456)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Select defaultValue="dd-mm-yyyy">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                        <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {securitySettings.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <h4 className="font-medium">{setting.title}</h4>
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={setting.enabled ? "default" : "secondary"}>
                        {setting.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Sessions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Monitor className="h-5 w-5" />
                <span>Active Sessions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <Monitor className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Windows PC - Chrome</h4>
                      <p className="text-sm text-muted-foreground">Current session • Mumbai, India</p>
                      <p className="text-xs text-muted-foreground">Last active: Now</p>
                    </div>
                  </div>
                  <Badge variant="default">Current</Badge>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">iPhone - Safari</h4>
                      <p className="text-sm text-muted-foreground">Mumbai, India</p>
                      <p className="text-xs text-muted-foreground">Last active: 2 hours ago</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Revoke
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <Monitor className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">MacBook - Safari</h4>
                      <p className="text-sm text-muted-foreground">Delhi, India</p>
                      <p className="text-xs text-muted-foreground">Last active: 1 day ago</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Revoke
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Data Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {dataSettings.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <h4 className="font-medium">{setting.title}</h4>
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                      {setting.id === '1' && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Last backup: {setting.lastBackup} • Size: {setting.size}
                        </p>
                      )}
                      {setting.id === '3' && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Current retention period: {setting.period}
                        </p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      {setting.id === '1' && (
                        <Button onClick={backupData}>
                          <Upload className="h-4 w-4 mr-2" />
                          Backup Now
                        </Button>
                      )}
                      {setting.id === '2' && (
                        <div className="flex space-x-2">
                          {setting.formats?.map((format) => (
                            <Button key={format} variant="outline" size="sm" onClick={() => exportData(format)}>
                              <Download className="h-4 w-4 mr-2" />
                              {format}
                            </Button>
                          ))}
                        </div>
                      )}
                      {setting.id === '3' && (
                        <Button variant="outline">
                          Configure
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                <span>Danger Zone</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-red-200 bg-red-50">
                  <div>
                    <h4 className="font-medium text-red-800">Delete Account</h4>
                    <p className="text-sm text-red-600">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="destructive" onClick={deleteAccount}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <h4 className="font-medium">Sign Out</h4>
                    <p className="text-sm text-muted-foreground">Sign out from all devices</p>
                  </div>
                  <Button variant="outline" onClick={logout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out All
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          {/* Current Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>Current Plan</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 rounded-lg border bg-primary/5">
                <div>
                  <h3 className="text-lg font-semibold">Pro Plan</h3>
                  <p className="text-sm text-muted-foreground">Advanced features for serious traders</p>
                  <p className="text-xs text-muted-foreground mt-1">Next billing: January 15, 2024</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">₹999</div>
                  <div className="text-sm text-muted-foreground">per month</div>
                  <Badge variant="default" className="mt-2">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Plans */}
          <Card>
            <CardHeader>
              <CardTitle>Available Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {subscriptionPlans.map((plan) => (
                  <div key={plan.id} className={`p-6 rounded-lg border ${plan.current ? 'border-primary bg-primary/5' : ''}`}>
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold">{plan.name}</h3>
                      <div className="text-3xl font-bold mt-2">
                        {plan.price === 0 ? 'Free' : `₹${plan.price}`}
                      </div>
                      {plan.price > 0 && <div className="text-sm text-muted-foreground">per month</div>}
                    </div>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full" 
                      variant={plan.current ? "secondary" : "default"}
                      disabled={plan.current}
                    >
                      {plan.current ? 'Current Plan' : 'Upgrade'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Billing History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Billing History</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <h4 className="font-medium">Pro Plan - December 2023</h4>
                    <p className="text-sm text-muted-foreground">Paid on Dec 15, 2023</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">₹999</span>
                    <Badge variant="default">Paid</Badge>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Invoice
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <h4 className="font-medium">Pro Plan - November 2023</h4>
                    <p className="text-sm text-muted-foreground">Paid on Nov 15, 2023</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">₹999</span>
                    <Badge variant="default">Paid</Badge>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Invoice
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <h4 className="font-medium">Pro Plan - October 2023</h4>
                    <p className="text-sm text-muted-foreground">Paid on Oct 15, 2023</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">₹999</span>
                    <Badge variant="default">Paid</Badge>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Invoice
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>Payment Methods</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">•••• •••• •••• 1234</h4>
                      <p className="text-sm text-muted-foreground">Expires 12/25</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="default">Primary</Badge>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}