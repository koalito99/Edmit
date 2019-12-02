export function labelForCostType(costType: string): string | null {
  switch (costType) {
    case 'room_and_board':
      return 'Room & Board';
    case 'book_and_supplies':
      return 'Books & Supplies';
    case 'tuition_out_of_state':
      return 'Tuition (Out of State)';
    case 'tuition_in_state':
      return 'Tuition (In State)';
    case 'tuition':
      return 'Tuition';
    case 'discount':
      return 'Discount';
    default:
      return null;
  }
}
