
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Preload logo image
const preloadLogo = new Image();
preloadLogo.src = "/lovable-uploads/683fef85-24ec-4bb2-bf14-a6ab4ffb7c99.png";

createRoot(document.getElementById("root")!).render(<App />);
