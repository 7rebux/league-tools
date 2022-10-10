export interface CheckboxProps {
  /**
   * The title of the checkbox
   */
  title: string;

  /**
   * The initial state of the checkbox (default=false)
   */
  initialState?: boolean;

  /**
   * Gets called when the user clicks the checkbox
   * 
   * @param {boolean} value The new state
   */
  onChange?: (value: boolean) => void;
}
