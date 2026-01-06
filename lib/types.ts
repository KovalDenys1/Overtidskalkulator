export type Shift = {
  id: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  breakMinutes: number;
  helg?: boolean; // weekend flag (optional for later extensions)
};

export type Settings = {
  hourlyRate: number; // kr/time
  overtimeMultiplier: number; // 1.4 / 1.5 / 2.0
  dailyLimitHours: number; // default 9
  weeklyLimitHours: number; // default 40
  weekStartsMonday: boolean; // true in NO
};

export type WeeklyBreakdown = {
  isoWeek: string; // "2026-W02"
  hours: number;
  overtime: number;
};

export type CalcResult = {
  totalHours: number;
  overtimeHours: number;
  ordinaryHours: number;
  basePay: number;
  overtimeExtra: number;
  totalPay: number;

  byDate: Record<string, { hours: number; dailyOvertime: number }>;
  weeklyHours: number;
  weeklyOvertime: number;
  weeklyOvertimeSum: number; // sum of all weekly overtime across weeks
  dailyOvertimeSum: number;
  weekly: WeeklyBreakdown[];
};
