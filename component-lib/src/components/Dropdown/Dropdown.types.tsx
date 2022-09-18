export interface DropdownProps {
  /**
   * The items of the dropdown
   */
  items: string[];

  /**
   * The initially selected item
   */
  initialItem: string;

  /**
   * Gets called when the user selectes a new item
   * 
   * @param {string} value The newly selected item
   */
  onChange?: (value: string) => void;
}
