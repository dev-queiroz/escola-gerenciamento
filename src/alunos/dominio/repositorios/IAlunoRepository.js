const Aluno = require('../../dominio/entidades/Aluno');
const connection = require('../../../../config/database');

class IAlunoRepository {
    constructor() {
        this.connection = connection;
    }

    async salvar(aluno) {
        const [rows] = await this.connection.execute(
            'INSERT INTO alunos (nome, email) VALUES (?, ?)',
            [aluno.nome, aluno.email]
        );
        aluno.id = rows.insertId;
    }

    async buscarPorId(id) {
        const [rows] = await this.connection.execute(
            'SELECT * FROM alunos WHERE id = ?',
            [id]
        );
        if (rows.length > 0) {
            const row = rows[0];
            return new Aluno(row.id, row.nome, row.email);
        }
        return null;
    }

    async buscarTodos() {
        const [rows] = await this.connection.execute('SELECT * FROM alunos');
        return rows.map(row => new Aluno(row.id, row.nome, row.email));
    }
}

module.exports = IAlunoRepository;
