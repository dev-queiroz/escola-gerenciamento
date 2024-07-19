const express = require('express');
const app = express();
const alunoController = require('./src/alunos/interface/controladores/AlunoController');
const cursoController = require('./src/cursos/interface/controladores/CursoController');

app.use(express.json());
app.use('/alunos', alunoController);
app.use('/cursos', cursoController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
