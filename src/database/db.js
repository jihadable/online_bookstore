const { PrismaClient } = require('../../generated/prisma')

function DB(){
    return new PrismaClient()
}

module.exports = DB