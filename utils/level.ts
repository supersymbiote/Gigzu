export type LevelInfo = {
  level: number;
  title: string;
  completedCount: number;
  currentLevelStart: number;
  nextLevelAt: number;
  progress: number; // 0..1 within current level
  nextTitle: string;
};

const TITLES = [
  "Newcomer",
  "Rookie",
  "Doer",
  "Go-Getter",
  "Pro",
  "Specialist",
  "Expert",
  "Master",
  "Guru",
  "Legend",
];

// Level curve: level 1 every 3 jobs for first 3 levels, then 5, then 8
function thresholdForLevel(level: number): number {
  if (level <= 3) return 3;
  if (level <= 6) return 5;
  return 8;
}

export function calculateLevel(completedCount: number): LevelInfo {
  let level = 1;
  let remaining = completedCount;
  let currentLevelStart = 0;
  let step = thresholdForLevel(level);

  while (remaining >= step) {
    remaining -= step;
    currentLevelStart += step;
    level += 1;
    step = thresholdForLevel(level);
  }

  const nextLevelAt = currentLevelStart + step;
  const progress = step === 0 ? 0 : Math.min(1, remaining / step);
  const title = TITLES[Math.min(TITLES.length - 1, level - 1)];
  const nextTitle = TITLES[Math.min(TITLES.length - 1, level)];

  return { level, title, completedCount, currentLevelStart, nextLevelAt, progress, nextTitle };
}

export function getNextTitle(level: number): string {
  return TITLES[Math.min(TITLES.length - 1, level)];
}


