## Encurtador de link
Esta API permite encurtar URLs longas e redirecionar para URLs originais usando URLs curtas geradas. A aplicação utiliza Node.js, Express, Sequelize para interação com um banco de dados MySQL.

## Instalação
Para que seja possível rodar a API de forma local, siga os passos a seguir:

1. Clone o repositório:  
```git clone https://github.com/guigutox/Encurtador_de_URL.git```

2. Navavegue até o repositório:  
   ```cd  Encurtador_de_URL/Back-end```

3. Com node já préviamente instalado em sua maquina abra o terminal e instale as dependências:  
   ``` npm install```

4. Instale o MYSQL server: https://dev.mysql.com/downloads/installer/

5. Instale o MYSQL WorkBench: https://www.mysql.com/products/workbench/

6. Crie um arquivo com o nome .env na pasta backend do projeto, ficará localizado junto aos arquivos index.js, package-lock.json e etc;

7. Preencha o arquivo da seguinte forma, substituindo x pelo nome do usuário do seu mysql instalado e y pela senha desse mesmo usuário:
    ```
    DB_USER=x  
    DB_PASSWORD=y
    ``` 

8. Inicie o servidor utilizando no terminal o comando: 
    ``` node index.js ```

9. O servidor estará disponível em `http://localhost:3000`

---

## Testar projeto

1. Com o servidor node rodando e as configurações anteriores ja devidamente realizadas, navavegue até o repositório:  
   ```cd  Encurtador_de_URL/Front-end```

2. Abra o arquivo index.html;

3. Utilize um live server parar criar o servidor HTTP local a partir do index.html;

4. Insira o link que deseja encurtar e clique em encurtar;
   
5. Para testar o funcionamento, utilize o link encurtador e ao inserir no navegador sera redirecionado ao link original.


---
## EndPoints

- ### POST /encurtar
  - URL: `http://localhost:3000/encurtar`
  - MÉTODO: `POST`
  - Descrição: Encurta uma URL fornecida ou retorna a URL curta existente se já estiver encurtada.
  - Formato da requisição:
    ~~~ json 
        {
        "originalLink": "URL_LONGA_AQUI"
        }
    ~~~
  - Exemplo requisição de sucesso:
    ~~~json
        {
           "https://www.twitch.tv/tck10"
        }
    ~~~
  - Resposta de Sucesso: `200 created`
  - Formato da resposta: 
    ~~~json 
        {
            "short_link": "URL_CURTA_GERADA"
        }
    ~~~
  - Possível falha: `400 bad request`
     ~~~json 
        {
            "error": "Original link is required"
        }
    ~~~
  - Possível falha:  `500 interna server error`
    ~~~json 
        {
             "error": "Internal server error"
        }
    ~~~


  - ### GET /:shortId
  - URL: `http://localhost:3000/:shortId`
  - MÉTODO: `GET`
  - DESCRIÇÃO: Redireciona o usuário para a URL original associada ao ID curto fornecido.
  - Parâmetros da URL: 
    - `shortId`: O ID curto gerado que deve ser fornecido na URL
  - RESPOSTA DE SUCESSO: `302 Redirect`
    - Redireciona o usuário para a URL original;
  - Possível falha: `404 Not found`
    ~~~json 
        {       
            "error": "Link not found"
        }
    ~~~
  - Possível falha: `500 Internal server Error`
      ~~~json 
        {
             "error": "Internal server error"
        }
    ~~~

---

## Estrutura do Projeto

### Arquivos e Diretórios

- `app.js`: Arquivo principal da aplicação, configurando o servidor Express.
- `controllers/linkController.js`: Controlador contendo as funções para encurtar e redirecionar URLs.
- `database/database.js`: Configuração e conexão com o banco de dados.
- `models/Link.js`: Definição do modelo de dados Link usando Sequelize.
- `.env`: Arquivo para armazenar variáveis de ambiente, como credenciais do banco de dados.