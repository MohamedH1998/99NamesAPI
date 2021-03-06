import rateLimit from 'express-rate-limit';

const rateLimiterUsingThirdParty = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // TODO: we probably want to change this limit.
  max: 100,
  message: 'You have exceeded the 100 requests in 24 hrs limit!',
  headers: true,
});

export default rateLimiterUsingThirdParty;
