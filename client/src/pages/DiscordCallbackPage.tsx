import { useEffect } from 'react';
import { Redirect } from 'wouter';
import { Loader2 } from 'lucide-react';

// This component handles the Discord OAuth callback
// In a real application, we would validate the auth code with the Discord API
// For this demo, we simply redirect to the thank you page

export default function DiscordCallbackPage() {
  useEffect(() => {
    // Log for debugging
    console.log('Discord OAuth callback received');
    
    // In a real app, you would make an API call to exchange the code for a token
    // and then use that token to add the bot to the user's server
    
  }, []);

  // Simply redirect to the thank you page
  // In a real app, you'd only do this after successfully validating the OAuth flow
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <p className="text-lg">Processing your request...</p>
      <Redirect to="/thank-you" />
    </div>
  );
}