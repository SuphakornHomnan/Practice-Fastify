import * as knex from 'knex'

export class UserModel {
    create(db: knex, data: any) {
        return db('users').insert(data)
    }
    read(db: knex){
        return db('users')
        .select(`_id`, `firstname`, `lastname`)
        .orderBy(`firstname`)
    }
    search(db: knex, query: any){
        const _query = '%' + query + '%'
        return db('users')
        .select(`_id`, `firstname`,`lastname`)
        .where(`firstname`, 'like', _query)
        .orderBy(`firstname`)
    }

    update(db: knex, userId: any, data: any) {
        return db('users')
        .where(`_id`, userId)
        .update(data)
    }
}