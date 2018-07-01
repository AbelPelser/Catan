import os


class DefaultConfig:
    DEBUG = True
    # One date format string to rule them all (use this in strftime)
    DATE_FORMAT = "%Y-%m-%d"
    DT_FORMAT = "%Y-%m-%d %H:%M"
    SECRET_KEY = "os.urandom(20)"
    TOKEN_SALT = 'Smeagol'
    

class LocalConfig(DefaultConfig):
    SECRET_KEY = "DEBUG"
    SQLALCHEMY_DATABASE_URI = \
        "mysql+pymysql://catan:catan@localhost/catan"
    

class PyAnConfig(DefaultConfig):
    SECRET_KEY = "PythonAnywhere"
    SQLALCHEMY_DATABASE_URI = \
        "mysql+pymysql://another:another@another.mysql.pythonanywhere-services.com"
