# 🔍 sonar-js-vanessa-estudo

Projeto de estudo para integração de análise estática de código JavaScript com **SonarQube**, utilizando **Jest** para cobertura de testes e **GitHub Actions** para CI/CD.

---

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Comandos Principais](#comandos-principais)
- [Configuração do SonarQube](#configuração-do-sonarqube)
  - [Rodando com Docker](#rodando-com-docker)
  - [Rodando com Helm (Kubernetes)](#rodando-com-helm-kubernetes)
  - [sonar-project.properties](#sonar-projectproperties)
- [Cobertura de Testes](#cobertura-de-testes)
- [CI/CD com GitHub Actions](#cicd-com-github-actions)
- [Variáveis de Ambiente](#variáveis-de-ambiente)

---

## Visão Geral

Este projeto demonstra como configurar uma pipeline de qualidade de código JavaScript integrando:

- **Jest** — execução de testes e geração de relatório de cobertura (LCOV)
- **SonarScanner** — análise estática e envio de métricas ao SonarQube
- **GitHub Actions** — automação de testes e análise a cada push/PR

---

## Tecnologias

| Tecnologia | Versão | Finalidade |
|---|---|---|
| Node.js | ≥ 18 | Runtime |
| Jest | ^29.7.0 | Framework de testes |
| jest-environment-jsdom | ^29.7.0 | Ambiente de testes DOM |
| sonar-scanner | ^3.1.0 | Análise de código |
| SonarQube | 10.x | Servidor de qualidade |
| Helm | 3.x | Deploy do SonarQube no Kubernetes |

---

## Estrutura do Projeto

```
sonar-js-vanessa-estudo/
├── .github/
│   └── workflows/          # Pipelines do GitHub Actions
├── .scannerwork/           # Metadados gerados pelo sonar-scanner (não commitar)
├── coverage/               # Relatórios de cobertura gerados pelo Jest
│   └── lcov.info           # Relatório LCOV lido pelo SonarQube
├── src/                    # Código-fonte da aplicação
│   └── ignored.generated.js  # Arquivo excluído da análise
├── tests/                  # Testes unitários
│   └── **/*.test.js
├── package.json
├── sonar-project.properties  # Configuração do SonarQube
└── README.md
```

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18
- [npm](https://www.npmjs.com/) >= 9
- [Java](https://www.java.com/) >= 17 (necessário para o sonar-scanner local)
- [Docker](https://www.docker.com/) (opcional, para rodar o SonarQube localmente)
- [kubectl](https://kubernetes.io/docs/tasks/tools/) + [Helm](https://helm.sh/) (opcional, para deploy em Kubernetes)

---

## Instalação

```bash
# Clone o repositório
git clone https://github.com/vanesssapinheiro/sonar-js-vanessa-estudo.git
cd sonar-js-vanessa-estudo

# Instale as dependências
npm install
```

---

## Comandos Principais

### Testes e Cobertura

```bash
# Rodar os testes com cobertura (gera coverage/lcov.info)
npm test
```

O relatório de cobertura é gerado automaticamente na pasta `coverage/` e o arquivo `lcov.info` é utilizado pelo SonarQube.

### Análise SonarQube

```bash
# Enviar análise para o SonarQube (requer servidor rodando)
npm run sonar

# Ou diretamente via sonar-scanner com parâmetros
npx sonar-scanner \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.token=SEU_TOKEN_AQUI
```

### Rodando tudo de uma vez

```bash
# Testes + cobertura + análise SonarQube
npm test && npm run sonar
```

---

## Configuração do SonarQube

### Rodando com Docker

A forma mais rápida de subir um SonarQube local:

```bash
# Subir o SonarQube
docker run -d \
  --name sonarqube \
  -p 9000:9000 \
  -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true \
  sonarqube:community

# Aguardar a inicialização (pode levar ~1 minuto)
docker logs -f sonarqube
```

Acesse `http://localhost:9000` no navegador.
- Login padrão: `admin` / `admin`
- Na primeira entrada, o sistema pedirá para trocar a senha.

**Para persistir dados com volume:**

```bash
docker run -d \
  --name sonarqube \
  -p 9000:9000 \
  -v sonarqube_data:/opt/sonarqube/data \
  -v sonarqube_extensions:/opt/sonarqube/extensions \
  -v sonarqube_logs:/opt/sonarqube/logs \
  -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true \
  sonarqube:community
```

**Com Docker Compose:**

```yaml
# docker-compose.yml
version: "3.8"

services:
  sonarqube:
    image: sonarqube:community
    container_name: sonarqube
    ports:
      - "9000:9000"
    environment:
      - SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true
    volumes:
      - sonarqube_data:/opt/sonarqube/data
      - sonarqube_extensions:/opt/sonarqube/extensions
      - sonarqube_logs:/opt/sonarqube/logs

volumes:
  sonarqube_data:
  sonarqube_extensions:
  sonarqube_logs:
```

```bash
docker-compose up -d
docker-compose down       # para derrubar
docker-compose logs -f    # acompanhar logs
```

---

### Rodando com Helm (Kubernetes)

Para ambientes de homologação ou produção, o SonarQube pode ser instalado via Helm no Kubernetes.

**Adicionar o repositório Helm do SonarQube:**

```bash
helm repo add sonarqube https://SonarSource.github.io/helm-chart-sonarqube
helm repo update
```

**Instalar o SonarQube:**

```bash
# Instalação padrão (namespace sonarqube)
helm install sonarqube sonarqube/sonarqube \
  --namespace sonarqube \
  --create-namespace

# Verificar o status
kubectl get pods -n sonarqube
kubectl get svc -n sonarqube
```

**Instalação com values customizados:**

```bash
# Criar arquivo de valores customizados
cat <<EOF > sonar-values.yaml
service:
  type: LoadBalancer
  port: 9000

persistence:
  enabled: true
  size: 10Gi

resources:
  requests:
    cpu: "500m"
    memory: "2Gi"
  limits:
    cpu: "2"
    memory: "4Gi"

postgresql:
  enabled: true
  postgresqlUsername: sonar
  postgresqlPassword: sonar
  postgresqlDatabase: sonarqube
EOF

helm install sonarqube sonarqube/sonarqube \
  --namespace sonarqube \
  --create-namespace \
  -f sonar-values.yaml
```

**Comandos Helm úteis:**

```bash
# Listar releases instaladas
helm list -n sonarqube

# Ver status da release
helm status sonarqube -n sonarqube

# Atualizar a release
helm upgrade sonarqube sonarqube/sonarqube \
  --namespace sonarqube \
  -f sonar-values.yaml

# Desinstalar
helm uninstall sonarqube -n sonarqube

# Ver os valores padrão do chart
helm show values sonarqube/sonarqube

# Ver histórico de deploys
helm history sonarqube -n sonarqube

# Rollback para versão anterior
helm rollback sonarqube 1 -n sonarqube
```

**Acessar o SonarQube no Kubernetes:**

```bash
# Port-forward para acesso local
kubectl port-forward svc/sonarqube-sonarqube 9000:9000 -n sonarqube

# Obter a URL do LoadBalancer (se configurado)
kubectl get svc sonarqube-sonarqube -n sonarqube -o jsonpath='{.status.loadBalancer.ingress[0].ip}'
```

---

### sonar-project.properties

O arquivo `sonar-project.properties` na raiz do projeto configura a análise:

```properties
sonar.projectKey=sonar-js-vanessa-estudo
sonar.projectName=sonar-js-vanessa-estudo
sonar.projectVersion=1.0

# Diretórios
sonar.sources=src
sonar.tests=tests
sonar.test.inclusions=tests/**/*.test.js

# Cobertura de testes (gerada pelo Jest)
sonar.javascript.lcov.reportPaths=coverage/lcov.info

# Exclusões
sonar.exclusions=src/ignored.generated.js,**/node_modules/**,**/dist/**,**/build/**,**/coverage/**,**/.git/**,**/*.min.js,**/*.bundle.js

sonar.sourceEncoding=UTF-8

# URL do servidor (altere conforme seu ambiente)
sonar.host.url=http://localhost:9000

# Token de autenticação (use variável de ambiente em CI)
# sonar.token=${SONAR_TOKEN}
```

> ⚠️ **Atenção:** Nunca commite tokens de autenticação reais no repositório. Use variáveis de ambiente ou secrets do GitHub Actions.

---

## Cobertura de Testes

O Jest é configurado no `package.json` para coletar cobertura automaticamente:

```json
"jest": {
  "testEnvironment": "jsdom",
  "collectCoverage": true,
  "coverageDirectory": "coverage",
  "collectCoverageFrom": [
    "src/**/*.js",
    "!src/ignored.generated.js"
  ]
}
```

Após rodar `npm test`, os relatórios ficam em `coverage/`:

```
coverage/
├── lcov.info          # Lido pelo SonarQube
├── lcov-report/       # Relatório HTML navegável
│   └── index.html
└── coverage-summary.json
```

Para visualizar o relatório HTML localmente:

```bash
npm test
open coverage/lcov-report/index.html   # macOS
xdg-open coverage/lcov-report/index.html  # Linux
```

---

## CI/CD com GitHub Actions

O projeto possui workflows em `.github/workflows/` para automação da pipeline.

**Exemplo de workflow completo (`.github/workflows/sonar.yml`):**

```yaml
name: SonarQube Analysis

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  sonar:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0  # necessário para análise de histórico pelo Sonar

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm install

      - name: Run tests and generate coverage
        run: npm test

      - name: Run SonarQube analysis
        uses: SonarSource/sonarqube-scan-action@master
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
          SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}
```

**Configurar os Secrets no GitHub:**

1. Acesse **Settings → Secrets and variables → Actions** no repositório
2. Adicione os seguintes secrets:

| Secret | Descrição |
|---|---|
| `SONAR_TOKEN` | Token de autenticação gerado no SonarQube |
| `SONAR_HOST_URL` | URL do servidor SonarQube (ex: `https://sonarqube.empresa.com`) |

**Como gerar o `SONAR_TOKEN` no SonarQube:**

1. Acesse o SonarQube → **My Account → Security**
2. Em *Generate Tokens*, dê um nome ao token (ex: `github-actions`)
3. Clique em **Generate** e copie o valor
4. Cole como secret no GitHub

---

## Variáveis de Ambiente

Para rodar a análise localmente sem expor o token no arquivo `.properties`, use variáveis de ambiente:

```bash
# Linux / macOS
export SONAR_TOKEN=sqp_seu_token_aqui
export SONAR_HOST_URL=http://localhost:9000

npm run sonar
```

```powershell
# Windows PowerShell
$env:SONAR_TOKEN = "sqp_seu_token_aqui"
$env:SONAR_HOST_URL = "http://localhost:9000"

npm run sonar
```

E no `sonar-project.properties`, referencie via variável:

```properties
sonar.host.url=${env.SONAR_HOST_URL}
sonar.token=${env.SONAR_TOKEN}
```

---

## 📎 Links Úteis

- [Documentação SonarQube](https://docs.sonarsource.com/sonarqube/latest/)
- [sonar-scanner npm](https://www.npmjs.com/package/sonar-scanner)
- [Helm Chart SonarQube](https://github.com/SonarSource/helm-chart-sonarqube)
- [GitHub Actions — SonarQube Scan](https://github.com/SonarSource/sonarqube-scan-action)
- [Jest — Coverage](https://jestjs.io/docs/configuration#collectcoverage-boolean)

---

> Projeto desenvolvido para fins de estudo. 🚀