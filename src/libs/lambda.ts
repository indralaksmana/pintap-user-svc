import middy from "@middy/core"
import middyHeaderNormalizer from '@middy/http-header-normalizer'
import middyJsonBodyParser from "@middy/http-json-body-parser"

export const middyfy = (handler) => {
  return middy(handler).
    use(middyHeaderNormalizer()).
    use(middyJsonBodyParser())
}
