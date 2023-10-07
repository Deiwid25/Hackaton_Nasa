async function getTimeOfDay() {
  return new Promise((resolve, reject) => {
    const currentHour = new Date().getHours();
    const currentMinutes = new Date().getMinutes();

    if (currentHour < 5 || (currentHour === 5 && currentMinutes <= 59)) {
      resolve({ lapseIndex: 0, day: 'today', lapseOfDay: 'Madrugada' });
    } else if (
      currentHour < 11 ||
      (currentHour === 11 && currentMinutes <= 59)
    ) {
      resolve({ lapseIndex: 1, day: 'today', lapseOfDay: 'Mañana' });
    } else if (
      currentHour < 17 ||
      (currentHour === 17 && currentMinutes <= 59)
    ) {
      resolve({ lapseIndex: 2, day: 'today', lapseOfDay: 'Tarde' });
    } else if (
      currentHour < 23 ||
      (currentHour === 23 && currentMinutes <= 59)
    ) {
      resolve({ lapseIndex: 3, day: 'today', lapseOfDay: 'Noche' });
    } else {
      reject('No se pudo determinar la hora del día');
    }
  });
}

function lapseOfTimeWithIndex(index: number) {
  switch (index) {
    case 0 || 4:
      return "Madrugada";
    case 1 || 5:
      return "Mañana";
    case 2 || 6:
      return "Tarde";
    case 3 || 7:
      return "Noche";

    default:
      return "Mañana"
  }
}

export { getTimeOfDay, lapseOfTimeWithIndex };






