# 🧠 MindEase – Plataforma de Acessibilidade Cognitiva (Mobile)

Aplicação **mobile** desenvolvida com **React Native + Expo**, derivada do projeto **MindEase Web**, como evolução multiplataforma da proposta criada no **Hackathon Final da Pós-Graduação FIAP (Front-End)**.

O foco central permanece o mesmo: **Acessibilidade Cognitiva**, com atenção especial a usuários que enfrentam desafios como:

* TDAH
* TEA (Autismo)
* Dislexia
* Burnout e sobrecarga mental
* Ansiedade em interfaces digitais
* Dificuldades de foco, organização e autorregulação

O **MindEase Mobile** não é uma simples adaptação visual da versão web. Ele foi **reprojetado para o contexto mobile**, respeitando limitações, padrões de interação e recursos nativos, mantendo o máximo possível da **lógica de domínio, regras e estados compartilhados**.

---

## 🎯 Objetivo do Projeto

O objetivo do projeto é expandir o MindEase para o ecossistema mobile, garantindo:

* Reuso de lógica e regras de negócio da versão web
* Arquitetura limpa e sustentável (Clean Architecture)
* Experiência mobile previsível, guiada e com baixa carga cognitiva
* Uso consciente de recursos nativos (gestos, notificações, acessibilidade)
* Persistência de preferências por usuário
* Autenticação segura

Além do aspecto técnico, o projeto prioriza **decisões de UX baseadas em neurodiversidade**, adaptadas ao uso em dispositivos móveis.

---

## 📱 Contexto Mobile

Diferente da web, o ambiente mobile apresenta desafios específicos:

* Interação predominantemente por toque e gestos
* Ausência de teclado físico como padrão
* Navegação não baseada em URLs
* Acessibilidade orientada a leitores de tela e gestos

Por isso, o MindEase Mobile foi estruturado para:

* Minimizar decisões simultâneas
* Guiar o usuário por fluxos claros
* Reduzir estímulos visuais desnecessários
* Manter consistência entre telas

---

## ♿ Acessibilidade Cognitiva (Pilar Central)

A aplicação segue princípios práticos de **Cognitive Load Reduction**, aplicados especificamente ao mobile:

* Sessões de foco com tempo controlado e pausas orientadas
* Modo foco para reduzir estímulos visuais
* Alertas cognitivos contextuais e não intrusivos
* Ritmo guiado de uso (evita hiperfoco prolongado)
* Interface progressiva (menos informações por tela)
* Animações opcionais e controladas

### Acessibilidade no React Native

A aplicação utiliza recursos nativos de acessibilidade:

* `accessibilityLabel`
* `accessibilityHint`
* `accessibilityRole`
* Compatibilidade com leitores de tela (TalkBack / VoiceOver)

> ⚠️ Diferente da web, não há dependência de ARIA ou navegação por teclado.

---

## 🧠 Estrutura Funcional e Responsabilidade das Telas

Cada tela possui **responsabilidade única**, evitando sobrecarga cognitiva.

### 🔐 Autenticação

* Login com Google via Firebase Authentication
* Fluxo compatível com Expo (OAuth nativo)
* Criação automática do perfil do usuário no Firestore

### 🧠 Home / Dashboard Cognitivo

* Visão resumida do estado atual do usuário
* Ativação rápida do modo foco
* Acesso direto às sessões de foco e tarefas
* Exibição apenas de informações relevantes no momento

### ⏱️ Sessão de Foco

* Timer adaptável inspirado no Pomodoro
* Opções pré-definidas de foco e pausa
* Pausas obrigatórias para evitar hiperfoco
* Feedback visual e cognitivo claro ao final de ciclos

### 🚨 Alertas Cognitivos

* Intervenções conscientes, não notificações constantes
* Exibidos apenas quando:

  * O tempo de foco ultrapassa limites seguros
  * É necessário iniciar ou encerrar uma pausa
  * O usuário retorna ao app após inatividade

### ✅ Organizador de Tarefas

* Tarefas simples e hierarquizadas
* Subtarefas em checklist
* Redução de decisões simultâneas
* Integração opcional com sessões de foco

### ⚙️ Perfil e Preferências

* Tamanho de fonte
* Espaçamento
* Contraste
* Redução de movimento
* Persistência automática por usuário

---

## 🧱 Arquitetura

O projeto segue **Clean Architecture**, com separação clara entre:

* **Domain**: regras de negócio, lógica de foco, alertas e validações
* **Application**: hooks e contexts compartilhados
* **Infrastructure**: Firebase, storage, autenticação
* **UI (Mobile)**: componentes e telas React Native

A lógica compartilhada foi extraída da versão web sempre que possível, evitando duplicação.

---

## 🚀 Stack Utilizada (Mobile)

### Mobile

* **React Native**
* **Expo**
* **TypeScript**
* **NativeWind** (Tailwind no React Native)
* **Expo Router**
* **Firebase Authentication**
* **Firestore**
* **Zod**

### Animações

* **react-native-reanimated** (uso pontual e opcional)

---

## 🧪 Testes

Os testes no ambiente mobile seguem abordagens específicas:

* **Testes unitários**: Jest + jest-expo + React Native Testing Library (funções puras e poucos componentes simples).
* Testes de lógica e domínio reutilizados
* Testes de componentes com Testing Library (React Native)
* Testes E2E planejados com Detox (futuro)

O foco principal é validar **comportamento do usuário** e não implementação interna.

### Rodar os testes unitários

```bash
npm run test
```

Para modo watch (re-executa ao alterar arquivos):

```bash
npm run test:watch
```

Os arquivos de teste ficam em pastas `__tests__` ao lado do código (ex.: `utils/timer/__tests__/timer-helpers-test.ts`, `components/ui/button/__tests__/ButtonText-test.tsx`).

---

## 📦 Como Rodar o Projeto

> ⚠️ **Importante**: Este projeto utiliza módulos nativos e **NÃO funciona com Expo Go**. É necessário um **development build**.

### Pré-requisitos

| Requisito | Descrição |
|-----------|-----------|
| **Node.js 22+** | Runtime JavaScript |
| **Android Studio** | Para builds Android (inclui emulador) |
| **Xcode** | Para builds iOS (apenas macOS) |
| **Conta Firebase** | Autenticação e banco de dados |
| **Conta Google Cloud** | Configuração OAuth |

### 1. Instalação

```bash
git clone https://github.com/Brendhon/MindEase-Mobile.git
cd MindEase-Mobile
npm install
```

### 2. Configuração do Firebase

Antes de executar o projeto, configure o Firebase e Google Sign-In:

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
2. Habilite **Authentication > Google**
3. Registre os apps Android e iOS
4. Baixe os arquivos de configuração e coloque na raiz do projeto:
   - `google-services.json` (Android)
   - `GoogleService-Info.plist` (iOS)

> 📖 Guia completo: [`docs/guidelines/google-auth.md`](docs/guidelines/google-auth.md)

### 3. Variáveis de Ambiente

```bash
cp environment.example .env
```

Preencha o `.env` com suas credenciais Firebase:

```bash
EXPO_PUBLIC_FIREBASE_API_KEY=your-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
EXPO_PUBLIC_FIREBASE_APP_ID=your-app-id

# Google OAuth
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your-web-client-id
```

### 4. Build e Execução

```bash
# Gerar código nativo (obrigatório na primeira vez)
npm run prebuild

# Executar no Android
npm run android

# Executar no iOS (apenas macOS)
cd ios && pod install && cd ..
npm run ios
```

### Troubleshooting: Android SDK não encontrado

Se ao executar `npm run android` você receber erro relacionado ao SDK não encontrado, crie manualmente o arquivo `android/local.properties`:

```properties
sdk.dir=C:\\Users\\SEU_USUARIO\\AppData\\Local\\Android\\Sdk
```

> **Por que isso acontece?** O Gradle precisa saber onde o Android SDK está instalado. Normalmente ele detecta via variável de ambiente `ANDROID_HOME`, mas no Windows isso pode falhar se a variável não estiver configurada ou o terminal foi aberto antes da configuração.

**Para evitar isso no futuro**, configure a variável de ambiente:
1. Abra "Variáveis de Ambiente" do Windows
2. Adicione `ANDROID_HOME` com valor `C:\Users\SEU_USUARIO\AppData\Local\Android\Sdk`
3. Reinicie o terminal/IDE

### Dispositivos Suportados

| Plataforma | Requisito |
|------------|-----------|
| **Android** | Emulador com Google Play ou dispositivo físico |
| **iOS** | Simulador ou dispositivo físico (apenas macOS) |

---

## 📲 Gerar APK para Android (app de teste / distribuição)

Para compartilhar um app de teste (por exemplo, via Google Drive) para outras pessoas instalarem no Android, é necessário gerar um APK. O passo a passo completo está em um documento dedicado:

> 📖 **[Como gerar o APK para Android](docs/guidelines/building-android-apk.md)** — EAS Build (recomendado) e build local, assinatura e resumo para distribuição no Drive.

---

## 🔁 Relação com o Projeto Web

* O MindEase Mobile reutiliza a lógica central do projeto web
* UI e navegação foram recriadas para mobile
* Acessibilidade foi reinterpretada para leitores de tela e gestos

Projeto Web:
- Site: [https://mind-ease-web.vercel.app](https://mind-ease-web.vercel.app)
- GitHub: [https://github.com/Brendhon/MindEase](https://github.com/Brendhon/MindEase)

---

## 👥 Autor

**Brendhon Moreira**

* LinkedIn: [https://www.linkedin.com/in/brendhon-moreira](https://www.linkedin.com/in/brendhon-moreira)
* Email: [brendhon.e.c.m@gmail.com](mailto:brendhon.e.c.m@gmail.com)
