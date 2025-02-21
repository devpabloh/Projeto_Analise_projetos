export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Erros específicos do Knex
  if (err.code === '23505') { // Violação de unique
      return res.status(409).json({
          success: false,
          error: 'Conflito de dados',
          message: 'Registro duplicado'
      });
  }

  if (err.code === '23503') { // Violação de foreign key
    return res.status(400).json({
        success: false,
        error: 'Erro de referência',
        message: 'Referência inválida para usuário ou projeto'
    });
    }

    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            error: 'Erro de autenticação',
            message: 'Token inválido'
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            error: 'Erro de autenticação',
            message: 'Token expirado'
        });
    }

  // Erros de validação
  if (err.name === 'ValidationError') {
      return res.status(400).json({
          success: false,
          error: 'Erro de validação',
          message: err.message
      });
  }

  if (err.status === 429) {
    return res.status(429).json({
        success: false,
        error: 'Muitas requisições',
        message: 'Por favor, aguarde antes de fazer novas requisições'
    });
}

  // Erro padrão
  res.status(err.status || 500).json({
      success: false,
      error: err.message || 'Erro interno do servidor',
      timestamp: new Date().toISOString(),
      path: req.path
  });
};