const calculateOverallRating = (ratings = []) => {
  if (!ratings || ratings.length <= 0) return 0;

  const sumRating = ratings.reduce((accRating, r) => (accRating += Number(r.rating)), 0);

  const overallRating = sumRating / ratings.length;

  return overallRating;
};

module.exports = { calculateOverallRating };
