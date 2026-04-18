CREATE USER nt_user_backend WITH PASSWORD 'nt_secure_password';
GRANT ALL PRIVILEGES ON DATABASE neuraltrace_db TO nt_user_backend;
GRANT ALL ON SCHEMA public TO nt_user_backend;
ALTER USER nt_user_backend CREATEDB;