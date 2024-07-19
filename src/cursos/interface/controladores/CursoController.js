const express = require('express');
const router = express.Router();
const Curso = require('../../dominio/entidades/Curso');
const CadastrarCurso = require('../../aplicacao/casosdeuso/CadastrarCurso');
const CursoRepository = require('../../infraestrutura/repositorios/CursoRepository');

const cursoRepository = new CursoRepository();
const cadastrarCurso = new CadastrarCurso(cursoRepository);

router.post('/', async (req, res) => {
    const { nome, descricao } = req.body;
    if (!nome || !descricao) {
        return res.status(400).json({ error: 'Nome e descrição são obrigatórios' });
    }
    const curso = new Curso(null, nome, descricao);
    await cadastrarCurso.executar(curso);
    res.status(201).send();
});

router.get('/', async (req, res) => {
    const cursos = await cursoRepository.buscarTodos();
    res.json(cursos);
});

router.get('/:id', async (req, res) => {
    const curso = await cursoRepository.buscarPorId(req.params.id);
    if (!curso) {
        return res.status(404).json({ error: 'Curso não encontrado' });
    }
    res.json(curso);
});

router.put('/:id', async (req, res) => {
    const { nome, descricao } = req.body;
    const curso = new Curso(req.params.id, nome, descricao);
    await cursoRepository.salvar(curso);
    res.status(200).send();
});

router.delete('/:id', async (req, res) => {
    await cursoRepository.deletar(req.params.id);
    res.status(204).send();
});

module.exports = router;