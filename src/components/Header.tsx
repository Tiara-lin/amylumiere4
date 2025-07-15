import React from 'react';
import { Instagram, Search, Heart, Home, PlusSquare, Film, Send, Menu } from 'lucide-react';
import { useAnalytics } from '../hooks/useAnalytics';

const Header: React.FC = () => {
  const { trackInteraction } = useAnalytics();

  const handleNavClick = (navItem: string) => {
    trackInteraction('navigation_click', 'header', 'system', {
      nav_item: navItem
    });
  };

  const handleSearchFocus = () => {
    trackInteraction('search_focus', 'header', 'system');
  };

  const handleSearchInput = (value: string) => {
    if (value.length > 2) {
      trackInteraction('search_query', 'header', 'system', {
        query_length: value.length,
        query: value.substring(0, 20) // Only track first 20 chars for privacy
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-screen-lg mx-auto px-4 md:px-8 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <Instagram 
            className="h-8 w-8 mr-2 cursor-pointer" 
            onClick={() => handleNavClick('logo')}
          />
          <h1 
            className="text-lg font-semibold hidden sm:block cursor-pointer"
            onClick={() => handleNavClick('logo_text')}
          >
            Instagram
          </h1>
        </div>
        
        <div className="hidden md:flex mx-4 flex-1 max-w-xs">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full bg-gray-100 border-0 rounded-lg py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-200"
              placeholder="Search"
              onFocus={handleSearchFocus}
              onChange={(e) => handleSearchInput(e.target.value)}
            />
          </div>
        </div>
        
        <nav className="flex items-center">
          <div className="md:hidden mr-4">
            <Search 
              className="h-6 w-6 cursor-pointer" 
              onClick={() => handleNavClick('mobile_search')}
            />
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Home 
              className="h-6 w-6 cursor-pointer transition-transform hover:scale-110" 
              onClick={() => handleNavClick('home')}
            />
            <Send 
              className="h-6 w-6 cursor-pointer transition-transform hover:scale-110" 
              onClick={() => handleNavClick('messages')}
            />
            <PlusSquare 
              className="h-6 w-6 cursor-pointer transition-transform hover:scale-110" 
              onClick={() => handleNavClick('create')}
            />
            <Film 
              className="h-6 w-6 cursor-pointer transition-transform hover:scale-110" 
              onClick={() => handleNavClick('reels')}
            />
          <div className="h-6 w-6 invisible" />
          </div>
          <div 
            className="h-7 w-7 rounded-full bg-gray-300 overflow-hidden cursor-pointer border border-gray-200"
            onClick={() => handleNavClick('profile')}
          >
            <img
              src="https://i.ibb.co/ZRf9Rdrw/20250502-0208-image.png" 
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <button 
            className="md:hidden ml-4"
            onClick={() => handleNavClick('mobile_menu')}
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;