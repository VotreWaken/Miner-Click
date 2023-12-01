// State.js
export const state = {
  score: 0,
  cursors: 0,
  pickaxes: 0,
  dynamites: 0,
  miners: 0,
  bulldozers: 0,
  items: {
    Cursor: { cost: 10, income: 1 },
    Pickaxe: { cost: 50, income: 5 },
    Dynamite: { cost: 100, income: 10 },
    Miner: { cost: 150, income: 15 },
    Bulldozer: { cost: 200, income: 20 },
  },
  // Достижения
  achievements: {
    cursorAchievement1: {
      condition: () => state.cursors >= 10,
      title: "Bought 10 Cursors",
      image: "path/to/cursor_achievement_10.png",
      description: "Congratulations! You have bought 10 Cursors.",
      achieved: false,
    },
    cursorAchievement2: {
      condition: () => state.cursors >= 100,
      title: "Bought 100 Cursors",
      image: "path/to/cursor_achievement_100.png",
      description: "Amazing! You have bought 100 Cursors.",
      achieved: false,
    },
    // Другие Достижения Добавлять Тут
  },
};
