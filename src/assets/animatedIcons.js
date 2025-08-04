import sun from './animations/sun.json';
import moon from './animations/moon.json';
import clouds from './animations/clouds.json';
import rain from './animations/rain.json';
import thunder from './animations/thunder.json';
import snow from './animations/snow.json';
import snowShower from './animations/snow-shower.json';
import fog from './animations/fog.json';
import mist from './animations/mist.json';
import tornado from './animations/tornado.json';

const animatedIcons = {
  // Clear
  '01d': sun,
  '01n': moon,

  // Few clouds
  '02d': clouds,
  '02n': clouds,

  // Scattered/broken/overcast clouds
  '03d': clouds,
  '03n': clouds,
  '04d': clouds,
  '04n': clouds,

  // Drizzle and rain
  '09d': rain,
  '09n': rain,
  '10d': rain,
  '10n': rain,

  // Thunderstorm
  '11d': thunder,
  '11n': thunder,

  // Snow
  '13d': snow,
  '13n': snow,

  // Snow showers
  '620': snowShower,
  '621': snowShower,
  '622': snowShower,

  // Atmosphere (mist, fog, haze, etc.)
  '50d': mist,
  '50n': mist,
  '701': mist,
  '711': mist,
  '721': mist,
  '731': fog,
  '741': fog,
  '751': fog,
  '761': fog,
  '762': fog,
  '771': fog,

  // Tornado
  '781': tornado,
};

export default animatedIcons;
