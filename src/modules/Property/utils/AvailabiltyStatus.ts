export enum AvailabilityStatus {
    IMMEDIATELY = 1,
    WITHIN_1_MONTH = 2,
    ONE_TO_THREE_MONTHS = 3,
    THREE_TO_SIX_MONTHS = 4,
    SIX_MONTHS_PLUS = 5,
  }
export const getAvailabilityStatus = (status: number): string => {
    switch (status) {
      case AvailabilityStatus.IMMEDIATELY:
        return "Immediately";
      case AvailabilityStatus.WITHIN_1_MONTH:
        return "Within 1 Month";
      case AvailabilityStatus.ONE_TO_THREE_MONTHS:
        return "1 to 3 Months";
      case AvailabilityStatus.THREE_TO_SIX_MONTHS:
        return "3 to 6 Months";
      case AvailabilityStatus.SIX_MONTHS_PLUS:
        return "6 Months Plus";
      default:
        return "Unknown";
    }
  };
  