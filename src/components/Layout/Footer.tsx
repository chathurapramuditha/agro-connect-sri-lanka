import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold">A</span>
              </div>
              <span className="font-bold text-xl text-primary">AgroLink</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              {t('footer.brand_description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">{t('footer.quick_links')}</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-muted-foreground hover:text-primary">
                {t('nav.home')}
              </Link>
              <Link to="/marketplace" className="block text-sm text-muted-foreground hover:text-primary">
                {t('nav.marketplace')}
              </Link>
              <Link to="/blog" className="block text-sm text-muted-foreground hover:text-primary">
                {t('nav.blog')}
              </Link>
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-primary">
                {t('nav.about')}
              </Link>
            </div>
          </div>

          {/* For Farmers */}
          <div className="space-y-4">
            <h3 className="font-semibold">{t('footer.for_farmers')}</h3>
            <div className="space-y-2">
              <Link to="/register?type=farmer" className="block text-sm text-muted-foreground hover:text-primary">
                {t('footer.join_farmer')}
              </Link>
              <Link to="/crop-calendar" className="block text-sm text-muted-foreground hover:text-primary">
                {t('footer.crop_calendar')}
              </Link>
              <Link to="/ai-chat" className="block text-sm text-muted-foreground hover:text-primary">
                {t('footer.ai_assistant')}
              </Link>
              <Link to="/weather" className="block text-sm text-muted-foreground hover:text-primary">
                {t('footer.weather')}
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">{t('footer.contact')}</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@agrolink.lk</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+94 11 234 5678</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Colombo, Sri Lanka</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;