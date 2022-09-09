export interface DropdownProps {
  searchBar?: boolean;
  items?: string[];
  initialItem?: string;
  onChange?: (item: string) => void;
}
