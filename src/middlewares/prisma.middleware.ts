import { PrismaClient } from '@configs/database/prisma'

const prisma = new PrismaClient({})

/***********************************/
/* SOFT DELETE MIDDLEWARE */
/***********************************/

prisma.$use(async (params, next) => {
if (params.action === 'findUnique' || params.action === 'findFirst') {
    // Change to findFirst - you cannot filter
    // by anything except ID / unique with findUnique
    params.action = 'findFirst'
    // Add 'deletedAt' filter
    // ID filter maintained
    params.args.where['deletedAt'] = null
}
if (params.action === 'findMany') {
    // Find many queries
    if (params.args.where) {
      if (params.args.where.deletedAt == undefined) {
        // Exclude deletedAt records if they have not been explicitly requested
        params.args.where['deletedAt'] = null
      }
    } else {
      params.args['where'] = { deletedAt: null }
    }
}
return next(params)
})

prisma.$use(async (params, next) => {
if (params.action == 'update') {
    // Change to updateMany - you cannot filter
    // by anything except ID / unique with findUnique
    params.action = 'updateMany'
    // Add 'deletedAt' filter
    // ID filter maintained
    params.args.where['deletedAt'] = null
}
if (params.action == 'updateMany') {
    if (params.args.where != undefined) {
        params.args.where['deletedAt'] = null
    } else {
        params.args['where'] = { deletedAt: null }
    }
}
return next(params)
})

prisma.$use(async (params, next) => {
// Check incoming query type
if (params.action == 'delete') {
    // Delete queries
    // Change action to an update
    params.action = 'update'
    params.args['data'] = { deletedAt: new Date() }
}
if (params.action == 'deleteMany') {
    // Delete many queries
    params.action = 'updateMany'
    if (params.args.data != undefined) {
        params.args.data['deletedAt'] = new Date()
    } else {
        params.args['data'] = { deletedAt: new Date() }
    }
}
return next(params)
})

export default prisma