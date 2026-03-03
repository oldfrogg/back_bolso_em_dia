CREATE SCHEMA IF NOT EXISTS bolso_em_dia;

USE bolso_em_dia;

CREATE TABLE usuarios (
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(32) NOT NULL UNIQUE,
senha VARCHAR(100) NOT NULL,
email VARCHAR(255) NOT NULL UNIQUE,
dia_base INT NOT NULL CHECK (dia_base BETWEEN 1 AND 28) DEFAULT 1,
contar_agendamento BOOL NOT NULL DEFAULT FALSE,
created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
is_admin BOOL NOT NULL DEFAULT FALSE
);

CREATE TABLE categorias (
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
categoria VARCHAR(32) NOT NULL UNIQUE
);

CREATE TABLE periodos (
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
user_id INT UNSIGNED NOT NULL,
inicio DATE NOT NULL,
fim DATE NOT NULL,

FOREIGN KEY (user_id) REFERENCES usuarios(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE transacoes (
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
user_id INT UNSIGNED NOT NULL,
categoria_id INT UNSIGNED NOT NULL,
periodo_id INT UNSIGNED NOT NULL,
valor DECIMAL(12,2) NOT NULL CHECK (valor >= 0.01),
descricao VARCHAR(64),
data_transacao DATE NOT NULL DEFAULT (CURRENT_DATE),
is_entrada BOOL NOT NULL,
is_agendado BOOL NOT NULL DEFAULT FALSE,
created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

INDEX idx_user (user_id),
INDEX idx_periodo (periodo_id),
INDEX idx_categoria (categoria_id),
  
FOREIGN KEY (user_id) REFERENCES usuarios(id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE RESTRICT ON UPDATE CASCADE,
FOREIGN KEY (periodo_id) REFERENCES periodos(id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO usuarios (username, senha, email, dia_base, contar_agendamento, is_admin) VALUES
('jhonatta', 'admin123', 'jhonatta_tavares@hotmail.com', 1, true, true); 

SELECT * FROM usuarios;

INSERT IGNORE INTO categorias (categoria) VALUES
('Salário'),
('Empréstimo'),
('Parcela'),
('Aluguel'),
('Contas'),
('Transporte'),
('Educação'),
('Supermercado'),
('Alimentação'),
('Lazer'),
('Investimento'),
('Saúde'),
('Outros');

