const ICursoRepository = require('../../dominio/repositorios/ICursoRepository');
const Curso = require('../../dominio/entidades/Curso');
const connection = require('../../../../config/database');

class CursoRepository extends ICursoRepository {
    constructor() {
        super();
        this.connection = connection;
    }

    async salvar(curso) {
        if (!curso.nome || !curso.descricao) {
            throw new Error('Nome e descrição são obrigatórios');
        }
        if (curso.id) {
            await this.connection.execute(
                'UPDATE cursos SET nome = ?, descricao = ? WHERE id = ?',
                [curso.nome, curso.descricao, curso.id]
            );
        } else {
            const [rows] = await this.connection.execute(
                'INSERT INTO cursos (nome, descricao) VALUES (?, ?)',
                [curso.nome, curso.descricao]
            );
            curso.id = rows.insertId;
        }
    }

    async buscarPorId(id) {
        const [rows] = await this.connection.execute(
            'SELECT * FROM cursos WHERE id = ?',
            [id]
        );
        if (rows.length > 0) {
            const row = rows[0];
            return new Curso(row.id, row.nome, row.descricao);
        }
        return null;
    }

    async buscarTodos() {
        const [rows] = await this.connection.execute('SELECT * FROM cursos');
        return rows.map(row => new Curso(row.id, row.nome, row.descricao));
    }

    async deletar(id) {
        await this.connection.execute('DELETE FROM cursos WHERE id = ?', [id]);
    }
}

module.exports = CursoRepository;
