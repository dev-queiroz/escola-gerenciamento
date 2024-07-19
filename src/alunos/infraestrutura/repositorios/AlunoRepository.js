const IAlunoRepository = require('../../dominio/repositorios/IAlunoRepository');
const Aluno = require('../../dominio/entidades/Aluno');
const connection = require('../../../../config/database');

class AlunoRepository extends IAlunoRepository {
    constructor() {
        super();
        this.connection = connection;
    }

    async salvar(aluno) {
        if (aluno.id) {
            await this.connection.execute(
                'UPDATE alunos SET nome = ?, email = ? WHERE id = ?',
                [aluno.nome, aluno.email, aluno.id]
            );
        } else {
            const [rows] = await this.connection.execute(
                'INSERT INTO alunos (nome, email) VALUES (?, ?)',
                [aluno.nome, aluno.email]
            );
            aluno.id = rows.insertId;
        }
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

    async deletar(id) {
        await this.connection.execute('DELETE FROM alunos WHERE id = ?', [id]);
    }
}

module.exports = AlunoRepository;
