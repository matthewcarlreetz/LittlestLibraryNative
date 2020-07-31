const radians = function (degree: number) {
  // degrees to radians
  const rad: number = (degree * Math.PI) / 180;

  return rad;
};

export default (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6372.8; // km
  const dlat = radians(lat2 - lat1);
  const dlon = radians(lon2 - lon1);
  const lat1Rad = radians(lat1);
  const lat2Rad = radians(lat2);
  const a =
    Math.sin(dlat / 2) * Math.sin(dlat / 2) +
    Math.sin(dlon / 2) * Math.sin(dlon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
  const c = 2 * Math.asin(Math.sqrt(a));
  return R * c;
};
