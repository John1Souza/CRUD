    CREATE DATABASE IF NOT EXISTS transacoes_financeiras;

    USE transacoes_financeiras;

    CREATE TABLE tipo_transacao (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR(255) NOT NULL
    );

    CREATE TABLE transacao (
        id INT PRIMARY KEY AUTO_INCREMENT,
        descricao VARCHAR(255) NOT NULL,
        valor DECIMAL(10, 2) NOT NULL,
        tipo_id INT NOT NULL,
        data_transacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (tipo_id) REFERENCES tipo_transacao(id) 

    );