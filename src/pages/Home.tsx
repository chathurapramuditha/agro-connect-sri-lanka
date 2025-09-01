import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, TrendingUp, Brain, Smartphone, Globe, MessageSquare, BarChart3, Calendar, Leaf, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import heroImage from '@/assets/hero-agriculture.jpg';

const Home = () => {
  const { t } = useLanguage();
  const [user, setUser] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Check authentication status
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Sample blog posts for slideshow
  const blogPosts = [
    {
      id: 1,
      title: t('blog.ai_crop_title'),
      excerpt: t('blog.ai_crop_excerpt'),
      category: t('blog.ai_crop_category'),
      author: t('blog.ai_crop_author'),
      date: "2024-03-15",
      image: "🌱"
    },
    {
      id: 2,
      title: t('blog.sustainable_title'),
      excerpt: t('blog.sustainable_excerpt'),
      category: t('blog.sustainable_category'), 
      author: t('blog.sustainable_author'),
      date: "2024-03-12",
      image: "🌿"
    },
    {
      id: 3,
      title: t('blog.market_title'),
      excerpt: t('blog.market_excerpt'),
      category: t('blog.market_category'),
      author: t('blog.market_author'), 
      date: "2024-03-10",
      image: "📈"
    },
    {
      id: 4,
      title: t('blog.water_title'),
      excerpt: t('blog.water_excerpt'),
      category: t('blog.water_category'),
      author: t('blog.water_author'),
      date: "2024-03-08", 
      image: "💧"
    }
  ];

  // Auto-advance slideshow
  useEffect(() => {
    if (user) {
      const timer = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % blogPosts.length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [user, blogPosts.length]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % blogPosts.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + blogPosts.length) % blogPosts.length);
  };

  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: t('features.ai.title'),
      description: t('features.ai.description'),
      color: 'bg-blue-500/10 text-blue-600'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: t('features.connection.title'),
      description: t('features.connection.description'),
      color: 'bg-green-500/10 text-green-600'
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: t('features.market.title'),
      description: t('features.market.description'),
      color: 'bg-purple-500/10 text-purple-600'
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: t('features.multilingual.title'),
      description: t('features.multilingual.description'),
      color: 'bg-orange-500/10 text-orange-600'
    }
  ];

  const stats = [
    { number: '1000+', label: t('home.stats.farmers') },
    { number: '500+', label: t('home.stats.buyers') },
    { number: '50+', label: t('home.stats.varieties') },
    { number: '24/7', label: t('home.stats.support') }
  ];

  return (
    <div className="min-h-screen">
      {/* Conditional Hero/Blog Section */}
      {!user ? (
        // Original Hero Section for non-authenticated users
        <section className="relative bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-950/20 dark:via-blue-950/20 dark:to-purple-950/20">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="mb-4">
                  🚀 AI-Powered Agriculture Platform
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent leading-tight">
                  {t('home.title')}
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  {t('home.subtitle')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="gap-2">
                  <Link to="/register?type=farmer">
                    <Leaf className="h-5 w-5" />
                    {t('home.cta.farmer')}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                
                <Button size="lg" variant="outline" asChild className="gap-2">
                  <Link to="/register?type=buyer">
                    <Users className="h-5 w-5" />
                    {t('home.cta.buyer')}
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-primary">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={heroImage} 
                  alt="Sri Lankan Agriculture"
                  className="absolute inset-0 w-full h-full object-cover opacity-20"
                />
                <div className="relative p-8">
                  <div className="absolute -top-4 -right-4">
                    <div className="bg-yellow-400 rounded-full p-3 shadow-lg">
                      <Brain className="h-6 w-6 text-yellow-800" />
                    </div>
                  </div>
                
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">{t('ai.assistant')}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "{t('ai.tomato_advice')}"
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <BarChart3 className="h-5 w-5 text-green-600" />
                      <span className="font-medium">{t('ai.price_prediction')}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "{t('ai.carrot_prediction')}"
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="h-5 w-5 text-purple-600" />
                      <span className="font-medium">{t('ai.crop_calendar')}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "{t('ai.planting_time')}"
                    </p>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      ) : (
        // Blog Slideshow Section for authenticated users
        <section className="relative bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-950/20 dark:via-blue-950/20 dark:to-purple-950/20">
          <div className="container mx-auto px-4 py-20">
            <div className="mb-8 text-center">
              <Badge variant="secondary" className="mb-4">
                🌾 {t('blog.insights')}
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                {t('home.blog.title')}
              </h2>
              <p className="text-xl text-muted-foreground">
                {t('home.blog.description')}
              </p>
            </div>

            <div className="relative">
              <Card className="overflow-hidden bg-white dark:bg-gray-800 shadow-2xl">
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <Badge variant="outline" className="w-fit mb-4">
                        {blogPosts[currentSlide].category}
                      </Badge>
                      <h3 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight">
                        {blogPosts[currentSlide].title}
                      </h3>
                      <p className="text-lg text-muted-foreground mb-6">
                        {blogPosts[currentSlide].excerpt}
                      </p>
                      <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                        <span>{blogPosts[currentSlide].author}</span>
                        <span>•</span>
                        <span>{new Date(blogPosts[currentSlide].date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex gap-4">
                        <Button asChild className="gap-2">
                          <Link to={`/blog/article/${blogPosts[currentSlide].id}`}>
                            {t('blog.readfull')}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" asChild>
                          <Link to="/blog">
                            {t('blog.viewall')}
                          </Link>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="relative bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 flex items-center justify-center min-h-[300px] lg:min-h-[400px]">
                      <div className="text-8xl animate-pulse">
                        {blogPosts[currentSlide].image}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between absolute top-1/2 -translate-y-1/2 w-full px-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevSlide}
                  className="bg-white/90 backdrop-blur-sm border-white/20 shadow-lg hover:bg-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextSlide}
                  className="bg-white/90 backdrop-blur-sm border-white/20 shadow-lg hover:bg-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Slide Indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {blogPosts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-primary scale-110' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline">{t('common.filter')}</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold">
              {t('home.ai.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('home.ai.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="space-y-4">
                  <div className={`w-16 h-16 rounded-lg ${feature.color} flex items-center justify-center`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              {t('home.cta.title')}
            </h2>
            <p className="text-xl text-green-100">
              {t('home.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/marketplace">
                  {t('cta.explore')}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-green-600" asChild>
                <Link to="/ai-chat">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {t('cta.tryai')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;