PARA EXECUTAR ARQUIVO EM TYPESCRIPT ANTES VOCÊ PRECISA INSTALAR O TS-NODE
QUE NA PASTA .bin DENTRO DO node_modules VAI SER CRIADO O ARQUIVO ts-node,
DEPOIS INSTALAR TYPESCRIPT E DEPOIS GERAR O ARQUIVO DE CONFIGURAÇÃO DO
TYPESCRIPT.

- INSTALAR TS-NODE PARA CONSEGUIR EXECUTAR O TYPESCRIPT NO NODE:

### npm install ts-node -D

- INSTALAR TYPESCRIPT:

### npm install typescript -D

- CRIAR ARQUIVO DE CONFIGURAÇÃO DO TYPESCRIPT tsconfig.json QUE DEFINE QUAIS
  FEATURES DO TYPESCRIPT IREMOS USAR E QUAL NÃO IREMOS USAR:

### npx tsc --init

DEPOIS DE FAZER AS ETAPAS ACIMA, AI SIM É POSSÍVEL EXECUTAR ARQUIVOS
TYPESCRIPT. ENTÃO PARA EXECUTAR DIGITE:

### npx ts-node src/server.ts

EXECUTAR ALTERAÇÕES AUTOMATICAMENTE APÓS SEREM SALVAS COM TYPESCRIPT
É SÓ BAIXAR A DEPENDÊNCIA ts-node-dev:

### npm install ts-node-dev -D

EXECUTAR TS-NODE-DEV:

### npx ts-node-dev src/server.ts

TAMBÉM É POSSÍVEL RESUMIR O COMANDO ACIMA, CRIANDO OPÇÃO "dev": NO SCRIPTS
DO package.json INFORMANDO NO "dev": O COMANDO:

### ts-node-dev src/server.ts

PARA EXECUTAR DIGITE:

### npm run dev

- CRIAR ARQUIVO DE CONFIGURAÇÃO DO BANCO DE DADOS (knexfile.ts)

DEPOIS DO PASSO ACIMA E CRIAR AS CONFIGURAÇÕES NO knexfile.ts VAMOS
EXECUTAR O COMANDO ABAIXO PARA CRIAR AS MIGRATIONS E O ARQUIVO database.sqlite:

### npx knex --knexfile knexfile.ts migrate:latest

CRIAR SEED:

### npx knex --knexfile knexfile.ts seed:run
