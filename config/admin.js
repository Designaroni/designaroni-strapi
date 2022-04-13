module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '0d1673fff840489570fed50a798f0c01'),
  },
});
