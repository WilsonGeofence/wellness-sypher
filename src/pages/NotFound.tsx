
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Log the 404 error
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Special case: check if this is a redirect from authentication with hash
    if (location.hash && location.hash.includes('access_token')) {
      console.log('Detected access token in URL hash on 404 page');
      
      // Process the authentication
      const processAuth = async () => {
        try {
          // Clean up URL and redirect to dashboard
          const cleanUrl = window.location.origin + '/dashboard';
          window.history.replaceState({}, document.title, cleanUrl);
          
          // Verify session
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user) {
            toast({
              title: "Sign in successful",
              description: "You've been redirected to the dashboard"
            });
            navigate('/dashboard', { replace: true });
          }
        } catch (error) {
          console.error('Error processing auth redirect on 404 page:', error);
          toast({
            title: "Authentication Error",
            description: "There was a problem processing your sign in",
            variant: "destructive"
          });
          navigate('/auth', { replace: true });
        }
      };
      
      processAuth();
    }
  }, [location.pathname, location.hash, navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
