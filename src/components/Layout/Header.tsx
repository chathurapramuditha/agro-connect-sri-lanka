import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, User, ShoppingCart, MessageSquare, LogOut, Settings, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { supabase } from '@/integrations/supabase/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check current user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.marketplace'), href: '/marketplace' },
    { name: t('nav.blog'), href: '/blog' },
    { name: t('nav.about'), href: '/about' },
  ];

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'si', name: 'සිංහල', flag: '🇱🇰' },
    { code: 'ta', name: 'தமிழ்', flag: '🇱🇰' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/b7231426-d66f-4278-a2e1-bccecc5d994b.png" 
              alt="AgroLink Logo" 
              className="w-8 h-8"
            />
            <span className="font-bold text-xl text-primary">AgroLink</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.href)
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="h-4 w-4" />
                  <span className="text-sm">
                    {languages.find(lang => lang.code === language)?.flag}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={language === lang.code ? 'bg-muted' : ''}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Navigation Buttons */}
            {user && (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/notifications">
                    <Bell className="h-4 w-4 mr-2" />
                    {t('header.notifications')}
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/chat">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    {t('header.chat')}
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/cart">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {t('header.cart')}
                  </Link>
                </Button>
              </>
            )}

            {/* AI Chat Button */}
            <Button variant="outline" size="sm" asChild>
              <Link to="/ai-chat">
                <MessageSquare className="h-4 w-4 mr-2" />
                {t('header.ai_assistant')}
              </Link>
            </Button>

            {/* User Authentication */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm">{user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <Settings className="h-4 w-4 mr-2" />
                    {t('header.dashboard')}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    {t('header.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login">
                    <User className="h-4 w-4 mr-2" />
                    {t('nav.login')}
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register">{t('nav.register')}</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary px-2 py-1 ${
                    isActive(item.href) ? 'text-primary' : 'text-muted-foreground'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Language Selector */}
              <div className="flex items-center space-x-2 px-2 py-1">
                <Globe className="h-4 w-4" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="bg-transparent text-sm"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mobile Actions */}
              <div className="flex flex-col space-y-2 px-2">
                {user && (
                  <>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/notifications" onClick={() => setIsMenuOpen(false)}>
                        <Bell className="h-4 w-4 mr-2" />
                        {t('header.notifications')}
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/chat" onClick={() => setIsMenuOpen(false)}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        {t('header.chat')}
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {t('header.cart')}
                      </Link>
                    </Button>
                  </>
                )}
                
                <Button variant="outline" size="sm" asChild>
                  <Link to="/ai-chat" onClick={() => setIsMenuOpen(false)}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    {t('header.ai_assistant')}
                  </Link>
                </Button>
                
                {user ? (
                  <>
                    <Button variant="outline" size="sm" onClick={() => { navigate('/dashboard'); setIsMenuOpen(false); }}>
                      <Settings className="h-4 w-4 mr-2" />
                      {t('header.dashboard')}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
                      <LogOut className="h-4 w-4 mr-2" />
                      {t('header.logout')}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                        <User className="h-4 w-4 mr-2" />
                        {t('nav.login')}
                      </Link>
                    </Button>
                    
                    <Button size="sm" asChild>
                      <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                        {t('nav.register')}
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;