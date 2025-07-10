import { useTheme } from "../hooks/useTheme";

export default function NotFound() {
    const {theme} = useTheme();
  return (
    <div className={`flex items-center justify-center h-screen `} style={{ backgroundColor: theme.background, color: theme.text }}>
      <div className="text-center">
        <h1 className="text-6xl font-bold" style={{ color: theme.text }}>404</h1>
        <p className="mt-4 text-xl" style={{ color: theme.text }}>Page Not Found</p>
        <p className="mt-2" style={{ color: theme.text }}>The page you are looking for does not exist.</p>
      </div>
    </div>
  );
}