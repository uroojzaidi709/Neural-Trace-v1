
import os
from dotenv import load_dotenv

load_dotenv()

class Settings:

    PROJECT_NAME: str = "Neural_Trace_API"
    PROJECT_VERSION: str = "0.1.0"

    # Security Settings
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your_default_secret_key")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))


settings = Settings()
