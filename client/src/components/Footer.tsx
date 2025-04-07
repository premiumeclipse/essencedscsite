import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  FaDiscord, 
  FaTwitter, 
  FaGithub, 
  FaPatreon 
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-background py-12 border-t border-muted">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold text-foreground">Essence</span>
            </Link>
            <p className="text-muted-foreground mb-4">
              The all-in-one Discord bot to elevate your server experience.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://discord.gg/essence" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <FaDiscord className="text-lg" />
              </a>
              <a 
                href="https://twitter.com/essencebot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <FaTwitter className="text-lg" />
              </a>
              <a 
                href="https://github.com/essencebot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <FaGithub className="text-lg" />
              </a>
              <a 
                href="https://patreon.com/essencebot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <FaPatreon className="text-lg" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#features" className="text-muted-foreground hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/commands" className="text-muted-foreground hover:text-white transition-colors">
                  Commands
                </Link>
              </li>
              <li>
                <Link href="/#statistics" className="text-muted-foreground hover:text-white transition-colors">
                  Statistics
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-white transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  API
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Premium
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Disclaimers
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-muted flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">© 2025 Essence Bot. All rights reserved.</p>
          <p className="text-muted-foreground text-sm mt-4 md:mt-0">Made with ❤️ for Discord communities.</p>
        </div>
      </div>
    </footer>
  );
}
