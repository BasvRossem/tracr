const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./dist/service/LogResource.js']

swaggerAutogen(outputFile, endpointsFiles).then(() => {
  require('./dist/index.js')
})