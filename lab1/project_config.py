import yaml

class ProjectConfig:
    """Класс считывает базовые настройки из файла config.yaml"""

    def __init__(self):
        with open('config.yaml') as f:
            config = yaml.safe_load(f)
            self.user = config['user']
            self.password = config['password']
            self.host = config['host']
            self.port = config['port']
            self.database = config['database']


if __name__ == "__main__":
    x = ProjectConfig()
    print(x.dbfilepath)
