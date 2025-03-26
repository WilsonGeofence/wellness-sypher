
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if this might be a failed OAuth redirect
    const hash = window.location.hash;
    if (hash && hash.includes('access_token')) {
      console.log("Detected access token in 404 page, this might be a failed OAuth redirect");
      toast({
        title: "Authentication redirect issue",
        description: "We detected you've signed in, redirecting you to the dashboard",
        variant: "default",
      });
      
      // Redirect to dashboard to let auth state update properly
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 1500);
      return;
    }

    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname, navigate, toast]);

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-sypher-blue-dark">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
        
        <p className="mb-6 text-gray-500">
          We couldn't find the page you were looking for. It might have been moved or deleted.
        </p>
        
        <Button onClick={goToHome} className="w-full">
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
