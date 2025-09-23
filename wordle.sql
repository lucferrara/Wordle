CREATE DATABASE wordle;

CREATE TABLE IF NOT EXISTS words (
  id   INT UNSIGNED NOT NULL AUTO_INCREMENT,
  word CHAR(5)      NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uk_word (word),
  -- Enforce exactly 5 letters (MySQL 8+ enforces CHECK)
  CONSTRAINT ck_word_5_letters CHECK (CHAR_LENGTH(word) = 5 AND word REGEXP '^[A-Za-z]{5}$')
) ENGINE=InnoDB;

-- 3) Games table (columns your code updates)
CREATE TABLE IF NOT EXISTS games (
  game_id   INT UNSIGNED NOT NULL AUTO_INCREMENT,
  answer    CHAR(5)      NOT NULL,
  guess1    CHAR(5)      NULL,
  guess2    CHAR(5)      NULL,
  guess3    CHAR(5)      NULL,
  guess4    CHAR(5)      NULL,
  guess5    CHAR(5)      NULL,
  guess6    CHAR(5)      NULL,
  created_at TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  finished_at TIMESTAMP  NULL DEFAULT NULL,
  PRIMARY KEY (game_id),
  KEY ix_answer (answer),
) ENGINE=InnoDB;
