// Source: https://app.betrybe.com/course/back-end/introducao-ao-desenvolvimento-web-com-nodejs/express-middlewares/0ba5165f-5fda-4b6b-8de7-d2ccf5782c18/conteudos/e0470c45-ed25-49b8-9675-47bb00b17e42/router-middleware/457000ee-68cb-4489-a75c-9ec061aca1a2?use_case=side_bar

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (typeof (name) !== 'string' || name.length <= 5) {
    return res.status(400).json({ message: 'Nome deve ser uma string com mais de 5 caracteres' });
  }

  next();
};

module.exports = validateName;
