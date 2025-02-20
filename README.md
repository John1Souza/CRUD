# CRUD de Transações Financeiras
Este projeto é uma aplicação web para gerenciar transações financeiras, permitindo o cadastro, listagem, edição e exclusão de receitas e despesas. A aplicação utiliza um único formulário para registrar tanto receitas quanto despesas, com um campo que diferencia entre despesa (valor negativo) e receita (valor positivo).

## Funcionalidades
  #### Cadastro de Transações:
  - Um único formulário para registrar receitas e despesas.
  - Campo para indicar se a transação é uma receita ou despesa.
  - Valor negativo para despesas e positivo para receitas.
  - Categorização das transações (ex.: Aluguel, Pagamento, Prolabore).

 #### Cadastro de Transações:
  - Listar todas as transações.
  - Filtrar transações por tipo (receita ou despesa).

 #### Edição de Transações:
  - Permitir a edição das transações cadastradas.

 #### Exclusão de Transações:
  - Permitir a exclusão de transações cadastradas.

## Tecnologias Utilizadas
  - Backend: Laravel (PHP)
  - Frontend: Angular (versão 16 ou superior)
  - Banco de Dados:MySQL
  - Estrutura de Pastas:

  | banco/         |# Scripts de criação das tabelas do banco de dados |
  |----------------|---------------------------------------------------|
  |backend/        |# Código do backend em Laravel |
  |frontend/       |# Código do frontend em Angular |

## Como Executar o Projeto
### Pré-requisitos
  - PHP >= 8.0
  - Composer
  - Node.js >= 16.x
  - Angular CLI
  - MySQL

## Passos para Configuração
  #### Clonar o Repositório
  
    git clone https://github.com/John1Souza/CRUD.git
    cd CRUD
  
  #### Configurar o Banco de Dados:
  - Crie um banco de dados MySQL chamado transacoes_financeiras
  - Abra o terminal e conecte-se ao MySQL:

        mysql -u root -p

   - Crie o banco de dados (se necessário):


         CREATE DATABASE transacoes_financeiras;

  - Defina uma senha ou não.
  #### Configurar o Backend:
  - Navegue ate a pasta backend:

        cd backend
       
   - Instale as dependências do Laravel:
    
          composer install
   - Copiar o conteudo de .env.example para .env

         cp .env.example .env
     
   - Configure o arquivo .env com as credenciais do banco de dados:
      
          DB_CONNECTION=mysql
          DB_HOST=127.0.0.1
          DB_PORT=3306
          DB_DATABASE=transacoes_financeiras
          DB_USERNAME=root
          DB_PASSWORD=sua_senha
      
   - Execute as migrations:

         php artisan migrate

   - Inicie o servidor Laravel:

          php artisan serve

  #### Configurar o Frontend:
  - Navegue até a pasta frontend:

        cd ../frontend

  - Instale as dependências do Angular:
  
        npm install

  - Inicie o servidor Angular:

        ng serve

#### Acessar a Aplicação:
- Abra o navegador e acesse http://localhost:4200.
     
## Estrutura do Projeto
### Backend (Laravel)

#### Models:
1. Transacao: Model para gerenciar transações.
2. TipoTransacao: Model para gerenciar tipos de transação.
#### Controllers:
1. TransacaoController: Controlador para operações de CRUD.
#### Migrations:
1. create_transacao_table: Tabela de transações.
2. create_tipo_transacao_table: Tabela de tipos de transação.
#### Rotas:
1. Rotas API definidas em routes/api.php.

### Frontend (Angular)
#### Componentes:
  1. lista-transacoes: Listagem de transações, Formulário para cadastro e edição de transações. 
#### Serviços:
  1. transacao.service.ts: Serviço para comunicação com a API do backend.

# Autor
##Johnatas Pereira de Souza
