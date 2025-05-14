import { defineConfig } from '@kubb/core'
import { pluginClient } from '@kubb/plugin-client'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginReactQuery } from '@kubb/plugin-react-query'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginZod } from '@kubb/plugin-zod'

export default defineConfig({
  name: 'wt-kubb',
  input: {
    path: 'http://localhost:7777/swagger/docs/swagger.json',
    // path: 'https://petstore.swagger.io/v2/swagger.json',
  },
  output: {
    path: './src/http/kubb-gen',
    write: true,
    clean: true,
    extension: undefined,
    barrelType: 'all',
  },
  hooks: {
    done: ['pnpm dlx run tsc --noEmit', 'pnpm eslint --fix ./src/http'],
  },
  plugins: [
    pluginOas({
      validate: true,
      group: {
        type: 'path',
        name({ group }) {
          return `${group}Controller`
        },
      },
    }),
    pluginTs({
      unknownType: 'unknown',
      syntaxType: 'type',
      enumType: 'asConst',
      optionalType: 'questionTokenAndUndefined',
      dateType: 'date',
      override: [
        {
          type: 'operationId',
          pattern: 'findPetsByStatus',
          options: {
            enumType: 'enum',
          },
        },
      ],
      transformers: {
        name: (name) => `${name}Type`,
      },
    }),
    pluginClient({
      dataReturnType: 'data',
      pathParamsType: 'object',
      paramsType: 'object',
      // parser: 'zod',
      client: 'fetch',
      group: {
        type: 'tag',
        name({ group }) {
          return `${group}Controller`
        },
      },
      importPath: '@/http/custom-client',
    }),
    pluginReactQuery({
      output: {
        path: './react-query',
      },
      client: {
        dataReturnType: 'data',
        importPath: '@/http/custom-client',
      },
      pathParamsType: 'object',
      // parser: 'zod',
      paramsType: 'object',
      group: {
        type: 'tag',
        name({ group }) {
          return `${group}Controller`
        },
      },
      mutation: {
        methods: ['post', 'put', 'delete'],
      },
      query: {
        methods: ['get'],
        importPath: '@tanstack/react-query',
      },
      override: [
        {
          type: 'operationId',
          pattern: '',
          options: {
            query: {
              methods: ['get'],
              importPath: '@tanstack/react-query',
            },
            mutation: {
              importPath: '@tanstack/react-query',
              methods: ['post', 'put', 'delete'],
            },
          },
        },
      ],
      suspense: {},
    }),
    pluginZod({
      unknownType: 'unknown',
      coercion: true,
      typed: true,
      group: {
        type: 'tag',
        name({ group }) {
          return `${group}Controller`
        },
      },
    }),
    // pluginFaker({
    //   output: {
    //     path: 'mocks',
    //   },
    //   exclude: [
    //     {
    //       type: 'tag',
    //       pattern: 'store',
    //     },
    //   ],
    //   group: { type: 'tag' },
    //   mapper: {
    //     status: `faker.helpers.arrayElement(['working', 'idle']) as any`,
    //   },
    //   transformers: {
    //     name(name, type) {
    //       return `${name}Faker`
    //     },
    //   },
    // }),
    // pluginCypress({
    //   output: {
    //     path: 'cypress',
    //     barrelType: false,
    //   },
    //   group: { type: 'tag' },
    // }),
    // pluginMsw({
    //   output: {
    //     path: 'msw',
    //   },
    //   handlers: true,
    //   exclude: [
    //     {
    //       type: 'tag',
    //       pattern: 'store',
    //     },
    //   ],
    //   group: { type: 'tag' },
    // }),
  ],
})
