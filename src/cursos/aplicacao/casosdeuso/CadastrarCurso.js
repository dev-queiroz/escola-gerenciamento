class CadastrarCurso {
    constructor(cursoRepository) {
        this.cursoRepository = cursoRepository;
    }

    async executar(curso) {
        if (!curso.nome || !curso.descricao) {
            throw new Error('Nome e descrição são obrigatórios');
        }
        await this.cursoRepository.salvar(curso);
    }
}

module.exports = CadastrarCurso;
