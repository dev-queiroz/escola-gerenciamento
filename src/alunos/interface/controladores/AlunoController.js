const express = require('express');
const router = express.Router();
const Aluno = require('../../dominio/entidades/Aluno');
const CadastrarAluno = require('../../aplicacao/casosdeuso/CadastrarAluno');
const AlunoRepository = require('../../infraestrutura/repositorios/AlunoRepository');

const alunoRepository = new AlunoRepository();
const cadastrarAluno = new CadastrarAluno(alunoRepository);

router.post('/', async (req, res) => {
    const { nome, email } = req.body;
    if (!nome || !email) {
        return res.status(400).json({ error: 'Nome e email são obrigatórios' });
    }
    const aluno = new Aluno(null, nome, email);
    cadastrarAluno.executar(aluno);
    res.status(201).send();
});

router.get('/', async (req, res) => {
    const alunos = await alunoRepository.buscarTodos();
    res.json(alunos);
});

router.get('/:id', async (req, res) => {
    const aluno = await alunoRepository.buscarPorId(req.params.id);
    if (!aluno) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
    }
    res.json(aluno);
});

router.put('/:id', async (req, res) => {
    const { nome, email } = req.body;
    const aluno = new Aluno(req.params.id, nome, email);
    await alunoRepository.salvar(aluno);
    res.status(200).send();
});

router.delete('/:id', async (req, res) => {
    await alunoRepository.deletar(req.params.id);
    res.status(204).send();
});

module.exports = router;
