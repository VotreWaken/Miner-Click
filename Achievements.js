import { state } from './State.js';

// Доступные Достижения
export const achievements = 
{
    cursorAchievement1: 
    {
      condition: () => state.cursors >= 10,
      description: 'Bought 10 Cursors',
      image: 'cursor_achievement_10.png',
      achieved: false,
    },
    cursorAchievement2: {
      condition: () => state.cursors >= 100,
      description: 'Bought 100 Cursors',
      image: 'cursor_achievement_100.png',
      achieved: false,
    },
    pickaxeAchievement: {
      condition: () => state.pickaxes >= 50,
      description: 'Bought 50 Pickaxes',
      image: 'pickaxe_achievement_50.png',
      achieved: false,
    },
    // Другие Достижения Добавлять Тут
  };
  
  // Функция для Проверки Выполнения Условий для Достижения
  export function checkAchievements() 
  {
    // Перебираем Достижения
    for (const achievementKey in achievements) 
    {
      // Получаем Информацию о Текущем Достижении
      const achievement = achievements[achievementKey];

      // Вывод В console.log() Описания Достижения
      console.log("Achivement: " + achievement.description)

      // Проверяем Выполнены ли Условия для Данного Достижения 
      if (!achievement.achieved && achievement.condition()) 
      {
        // Достижение выполнено
        showAchievementNotification(achievement);
        achievement.achieved = true;

        // Сохраните информацию о достижении в localStorage
        localStorage.setItem(achievementKey, true);
      }
    }
  }
  
  // Функция для отображения уведомления о Полученном Достижении
  function showAchievementNotification(achievement) 
  {
    // Создание элемента уведомления ( div )
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    
    // Добавление Изображения Достижения
    const image = document.createElement('img');
    image.src = achievement.image;
    notification.appendChild(image);
    
    // Добавление Текста о Достижении
    const text = document.createElement('p');
    text.textContent = achievement.description;
    notification.appendChild(text);
    
    // Добавление уведомления на Страницу
    document.body.appendChild(notification);
  
    // Затухание Уведомления Через 3 Секунды
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  }
  
  // При Загрузке Страницы Проверяем Local Storage и Инициализируем Уже Полученные Достижения
  window.addEventListener('DOMContentLoaded', () => 
  {
    for (const achievementKey in achievements) 
    {
      const isAchieved = localStorage.getItem(achievementKey) === 'true';
      if (isAchieved) 
      {
        achievements[achievementKey].achieved = true;
      }
    }
  });