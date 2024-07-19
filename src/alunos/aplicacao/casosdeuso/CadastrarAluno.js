class CadastrarAluno {
    constructor(alunoRepository) {
        this.alunoRepository = alunoRepository;
    }

    async executar(aluno) {
        if (!aluno.nome || !aluno.email) {
            throw new Error('Nome e email são obrigatórios');
        }
        await this.alunoRepository.salvar(aluno);
    }
}

module.exports = CadastrarAluno;
