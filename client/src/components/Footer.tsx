import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  FaDiscord, 
  FaTwitter, 
  FaGithub, 
  FaPatreon 
} from "react-icons/fa";
import { useTheme } from "@/contexts/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();
  
  // Function to get theme-specific classes
  const getThemeClasses = (element: 'border' | 'heading' | 'link' | 'icon' | 'highlight') => {
    switch (element) {
      case 'border':
        return theme === 'christmas' ? 'border-red-900/30' :
               theme === 'halloween' ? 'border-orange-900/30' :
               theme === 'thanksgiving' ? 'border-amber-900/30' :
               'border-muted';
      case 'heading':
        return theme === 'christmas' ? 'text-red-400' :
               theme === 'halloween' ? 'text-orange-400' :
               theme === 'thanksgiving' ? 'text-amber-400' :
               'text-foreground';
      case 'link':
        return theme === 'christmas' ? 'hover:text-red-400' :
               theme === 'halloween' ? 'hover:text-orange-400' :
               theme === 'thanksgiving' ? 'hover:text-amber-400' :
               'hover:text-white';
      case 'icon':
        return theme === 'christmas' ? 'hover:text-red-400 hover:scale-110' :
               theme === 'halloween' ? 'hover:text-orange-400 hover:scale-110' :
               theme === 'thanksgiving' ? 'hover:text-amber-400 hover:scale-110' :
               'hover:text-primary hover:scale-110';
      case 'highlight':
        return theme === 'christmas' ? 'text-red-400' :
               theme === 'halloween' ? 'text-orange-400' :
               theme === 'thanksgiving' ? 'text-amber-400' :
               'text-primary';
      default:
        return '';
    }
  };
  
  return (
    <footer className={`bg-background py-12 border-t relative ${getThemeClasses('border')}`}>
      {/* Subtle themed background */}
      <div className={`absolute inset-0 opacity-5 
        ${theme === 'christmas' ? 'bg-gradient-to-t from-red-900/20 to-green-900/10' : ''}
        ${theme === 'halloween' ? 'bg-gradient-to-t from-orange-900/20 to-purple-900/10' : ''}
        ${theme === 'thanksgiving' ? 'bg-gradient-to-t from-amber-900/20 to-amber-700/10' : ''}
      `}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4 group">
              <span className={`text-xl font-bold transition-colors duration-300
                ${theme === 'christmas' ? 'text-red-500 group-hover:text-red-400' : ''}
                ${theme === 'halloween' ? 'text-orange-500 group-hover:text-orange-400' : ''}
                ${theme === 'thanksgiving' ? 'text-amber-500 group-hover:text-amber-400' : ''}
                ${theme === 'default' ? 'text-foreground group-hover:text-primary' : ''}
              `}>essence</span>
            </Link>
            <p className="text-muted-foreground mb-4">
              The all-in-one Discord bot to elevate your server experience.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://discord.gg/essence" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`text-muted-foreground ${getThemeClasses('icon')} transition-all duration-300`}
              >
                <FaDiscord className="text-lg" />
              </a>
              <a 
                href="https://twitter.com/essencebot" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`text-muted-foreground ${getThemeClasses('icon')} transition-all duration-300`}
              >
                <FaTwitter className="text-lg" />
              </a>
              <a 
                href="https://github.com/essencebot" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`text-muted-foreground ${getThemeClasses('icon')} transition-all duration-300`}
              >
                <FaGithub className="text-lg" />
              </a>
              <a 
                href="https://patreon.com/essencebot" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`text-muted-foreground ${getThemeClasses('icon')} transition-all duration-300`}
              >
                <FaPatreon className="text-lg" />
              </a>
            </div>
          </div>
          
          <div className="relative">
            <h4 className={`font-semibold text-lg mb-4 ${getThemeClasses('heading')}`}>Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#features" className={`text-muted-foreground ${getThemeClasses('link')} transition-colors`}>
                  Features
                </Link>
              </li>
              <li>
                <Link href="/commands" className={`text-muted-foreground ${getThemeClasses('link')} transition-colors`}>
                  Commands
                </Link>
              </li>
              <li>
                <Link href="/#statistics" className={`text-muted-foreground ${getThemeClasses('link')} transition-colors`}>
                  Statistics
                </Link>
              </li>
              <li>
                <Link href="/support" className={`text-muted-foreground ${getThemeClasses('link')} transition-colors`}>
                  Support
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="relative">
            <h4 className={`font-semibold text-lg mb-4 ${getThemeClasses('heading')}`}>Resources</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  className={`text-muted-foreground ${getThemeClasses('link')} transition-colors`}
                >
                  Documentation
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={`text-muted-foreground ${getThemeClasses('link')} transition-colors`}
                >
                  API
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={`text-muted-foreground ${getThemeClasses('link')} transition-colors`}
                >
                  Premium
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={`text-muted-foreground ${getThemeClasses('link')} transition-colors`}
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
          
          <div className="relative">
            <h4 className={`font-semibold text-lg mb-4 ${getThemeClasses('heading')}`}>Legal</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  className={`text-muted-foreground ${getThemeClasses('link')} transition-colors`}
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={`text-muted-foreground ${getThemeClasses('link')} transition-colors`}
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={`text-muted-foreground ${getThemeClasses('link')} transition-colors`}
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={`text-muted-foreground ${getThemeClasses('link')} transition-colors`}
                >
                  Disclaimers
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className={`mt-12 pt-8 border-t ${getThemeClasses('border')} flex flex-col md:flex-row justify-between items-center`}>
          <p className="text-muted-foreground text-sm">© 2025 essence bot. All rights reserved.</p>
          <p className="text-muted-foreground text-sm mt-4 md:mt-0">
            Made with <span className={`${getThemeClasses('highlight')}`}>❤️</span> for Discord communities.
          </p>
        </div>
      </div>
    </footer>
  );
}
