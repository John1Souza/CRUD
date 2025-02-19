CREATE DATABASE IF NOT EXISTS transacoes_financeiras;

USE transacoes_financeiras;

CREATE TABLE tipo_transacao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    tipo ENUM('receita', 'despesa') NOT NULL,
    tipo_transacao_id INT,
    FOREIGN KEY (tipo_transacao_id) REFERENCES tipo_transacao(id)
);


INSERT INTO tipo_transacao (nome) VALUES ('Aluguel'), ('Pagamento'), ('Prolabore'), ('Outros');