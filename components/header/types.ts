export interface HeaderProps {
  user?: { username: string } | null;
  onLogin?: () => void;
  onLogout?: () => void;
}
