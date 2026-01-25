# Configuração da Autenticação Google - MindEase Mobile

Este documento descreve o passo a passo completo para configurar a autenticação com Google Sign-In usando Firebase no aplicativo MindEase Mobile.

---

## Sumário

1. [Pré-requisitos](#pré-requisitos)
2. [Configuração do Firebase Console](#1-configuração-do-firebase-console)
3. [Configuração do Google Cloud Console](#2-configuração-do-google-cloud-console)
4. [Download dos Arquivos de Configuração](#3-download-dos-arquivos-de-configuração)
5. [Configuração do Projeto](#4-configuração-do-projeto)
6. [Build do Aplicativo](#5-build-do-aplicativo)
7. [Troubleshooting](#troubleshooting)

---

## Pré-requisitos

- Conta Google com acesso ao Firebase Console
- Node.js 18+ instalado
- Android Studio (para builds Android)
- Xcode (para builds iOS - apenas macOS)
- Expo CLI instalado (`npm install -g expo-cli`)

---

## 1. Configuração do Firebase Console

### 1.1 Criar ou Acessar o Projeto Firebase

1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Clique em **"Adicionar projeto"** ou selecione um projeto existente
3. Siga o wizard de criação (pode desabilitar Google Analytics se preferir)

### 1.2 Habilitar Autenticação por Google

1. No menu lateral, vá para **Build > Authentication**
2. Clique na aba **"Sign-in method"**
3. Clique em **"Google"** na lista de provedores
4. Ative o toggle **"Habilitar"**
5. Selecione um **email de suporte do projeto** (seu email)
6. Clique em **"Salvar"**

### 1.3 Registrar o App Android

1. Na página inicial do projeto, clique no ícone **Android** (robô)
2. Preencha os campos:
   - **Nome do pacote Android**: `com.mindease.mobile`
   - **Apelido do app**: MindEase Mobile (opcional)
   - **Certificado de assinatura SHA-1**: (veja abaixo como obter)

#### Obter SHA-1 para Debug

Execute no terminal (na pasta do projeto):

```bash
# Para obter o SHA-1 de debug
cd android
./gradlew signingReport
```

Ou se ainda não fez o prebuild:

```bash
# Usando keytool (debug keystore padrão)
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

Copie o valor **SHA1** e cole no Firebase.

3. Clique em **"Registrar app"**
4. Baixe o arquivo **`google-services.json`**
5. Clique em **"Próximo"** até finalizar

### 1.4 Registrar o App iOS

1. Na página inicial do projeto, clique no ícone **iOS** (maçã)
2. Preencha os campos:
   - **ID do pacote iOS**: `com.mindease.mobile`
   - **Apelido do app**: MindEase Mobile (opcional)
   - **ID da App Store**: (deixe em branco por enquanto)
3. Clique em **"Registrar app"**
4. Baixe o arquivo **`GoogleService-Info.plist`**
5. Clique em **"Próximo"** até finalizar

---

## 2. Configuração do Google Cloud Console

O Firebase cria automaticamente um projeto no Google Cloud, mas precisamos verificar e configurar as credenciais OAuth.

### 2.1 Acessar o Google Cloud Console

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. No topo da página, selecione o projeto do Firebase (mesmo nome)

### 2.2 Verificar Credenciais OAuth

1. No menu lateral, vá para **APIs e serviços > Credenciais**
2. Você verá credenciais criadas automaticamente:
   - **Web client (auto created by Google Service)** - usado para `webClientId`
   - **Android client** - para o app Android
   - **iOS client** - para o app iOS

### 2.3 Configurar Tela de Consentimento OAuth

1. No menu lateral, vá para **APIs e serviços > Tela de consentimento OAuth**
2. Se ainda não configurado, selecione:
   - **Tipo de usuário**: Externo (para testes) ou Interno (se usar Google Workspace)
3. Preencha as informações obrigatórias:
   - **Nome do app**: MindEase
   - **Email de suporte ao usuário**: seu email
   - **Email do desenvolvedor**: seu email
4. Clique em **"Salvar e continuar"**
5. Em **Escopos**, adicione:
   - `email`
   - `profile`
   - `openid`
6. Em **Usuários de teste** (se tipo Externo):
   - Adicione os emails das pessoas que vão testar o app
   - **IMPORTANTE**: Enquanto o app estiver em modo de teste, apenas esses emails poderão fazer login

### 2.4 Obter o Web Client ID

1. Volte para **APIs e serviços > Credenciais**
2. Clique no **Web client (auto created by Google Service)**
3. Copie o **ID do cliente** - esse é o `webClientId`
4. Guarde esse valor para usar nas variáveis de ambiente

---

## 3. Download dos Arquivos de Configuração

### 3.1 Localização dos Arquivos

Após baixar do Firebase Console, coloque os arquivos na **raiz** do projeto mobile:

```
mind_ease_mobile/
├── google-services.json      # Android
├── GoogleService-Info.plist  # iOS
├── app.json
├── package.json
└── ...
```

### 3.2 Verificar Conteúdo do google-services.json

O arquivo deve conter algo similar a:

```json
{
  "project_info": {
    "project_number": "123456789",
    "project_id": "mindease-xxxxx",
    "storage_bucket": "mindease-xxxxx.appspot.com"
  },
  "client": [
    {
      "client_info": {
        "mobilesdk_app_id": "1:123456789:android:abc123",
        "android_client_info": {
          "package_name": "com.mindease.mobile"
        }
      },
      "oauth_client": [
        {
          "client_id": "123456789-xxxxx.apps.googleusercontent.com",
          "client_type": 3
        }
      ],
      "api_key": [
        {
          "current_key": "AIza..."
        }
      ]
    }
  ]
}
```

### 3.3 Verificar Conteúdo do GoogleService-Info.plist

O arquivo deve conter chaves como:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "...">
<plist version="1.0">
<dict>
    <key>CLIENT_ID</key>
    <string>123456789-xxxxx.apps.googleusercontent.com</string>
    <key>REVERSED_CLIENT_ID</key>
    <string>com.googleusercontent.apps.123456789-xxxxx</string>
    <key>API_KEY</key>
    <string>AIza...</string>
    <key>GCM_SENDER_ID</key>
    <string>123456789</string>
    <key>PLIST_VERSION</key>
    <string>1</string>
    <key>BUNDLE_ID</key>
    <string>com.mindease.mobile</string>
    <key>PROJECT_ID</key>
    <string>mindease-xxxxx</string>
    <key>STORAGE_BUCKET</key>
    <string>mindease-xxxxx.appspot.com</string>
    <key>GOOGLE_APP_ID</key>
    <string>1:123456789:ios:abc123</string>
</dict>
</plist>
```

---

## 4. Configuração do Projeto

### 4.1 Variáveis de Ambiente

Crie ou atualize o arquivo `.env` na raiz do projeto:

```env
# Firebase Configuration
EXPO_PUBLIC_FIREBASE_API_KEY=AIza...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=mindease-xxxxx.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=mindease-xxxxx
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=mindease-xxxxx.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# Google OAuth (opcional - usando autoDetect)
# EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=123456789-xxxxx.apps.googleusercontent.com
```

> **Nota**: O `webClientId` está configurado como `autoDetect` no código, então ele será detectado automaticamente dos arquivos de configuração do Firebase.

### 4.2 Verificar app.json

Confirme que o `app.json` está configurado corretamente:

```json
{
  "expo": {
    "plugins": ["@react-native-google-signin/google-signin"],
    "ios": {
      "supportsTablet": true,
      "googleServicesFile": "./GoogleService-Info.plist",
      "bundleIdentifier": "com.mindease.mobile"
    },
    "android": {
      "googleServicesFile": "./google-services.json",
      "package": "com.mindease.mobile"
    }
  }
}
```

### 4.3 Adicionar ao .gitignore

**IMPORTANTE**: Os arquivos de configuração contêm chaves sensíveis. Adicione ao `.gitignore`:

```gitignore
# Firebase config files (contain API keys)
google-services.json
GoogleService-Info.plist

# Environment variables
.env
.env.local
```

---

## 5. Build do Aplicativo

### 5.1 Instalar Dependências

```bash
cd mind_ease_mobile
npm install
```

### 5.2 Gerar Código Nativo (Prebuild)

Como `@react-native-google-signin/google-signin` é um módulo nativo, precisamos fazer o prebuild:

```bash
npx expo prebuild
```

Isso criará as pastas `android/` e `ios/` com o código nativo.

### 5.3 Build para Android

```bash
# Desenvolvimento local
npx expo run:android

# Ou usando Android Studio
cd android
./gradlew assembleDebug
```

### 5.4 Build para iOS (apenas macOS)

```bash
# Instalar pods
cd ios
pod install
cd ..

# Desenvolvimento local
npx expo run:ios

# Ou usando Xcode
open ios/MindEaseMobile.xcworkspace
```

---

## Troubleshooting

### Erro: "DEVELOPER_ERROR" no Android

**Causa**: SHA-1 não configurado ou incorreto no Firebase.

**Solução**:
1. Verifique se adicionou o SHA-1 correto no Firebase Console
2. Para debug, use o SHA-1 do `debug.keystore`
3. Para release, use o SHA-1 do keystore de produção
4. Após adicionar, baixe novamente o `google-services.json`

```bash
# Obter SHA-1 de debug
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

### Erro: "Sign in failed" ou "SIGN_IN_CANCELLED"

**Possíveis causas**:
1. Usuário cancelou o login
2. Credenciais OAuth não configuradas corretamente
3. Tela de consentimento não configurada

**Solução**:
1. Verifique a configuração da Tela de Consentimento OAuth no Google Cloud
2. Adicione seu email como usuário de teste
3. Verifique se o app está usando o `webClientId` correto

### Erro: "Play Services not available"

**Causa**: Google Play Services não está instalado ou atualizado no dispositivo/emulador.

**Solução**:
1. Use um emulador com Google Play (imagem "Google Play" no AVD Manager)
2. Atualize o Google Play Services no dispositivo

### Erro: "Network error" ou "Timeout"

**Causa**: Problema de conectividade ou configuração de rede.

**Solução**:
1. Verifique a conexão com internet
2. Se usando emulador, verifique as configurações de proxy
3. Desabilite VPN temporariamente para testar

### iOS: "Invalid bundle ID"

**Causa**: O Bundle ID no Firebase não corresponde ao do app.

**Solução**:
1. Verifique se `bundleIdentifier` no `app.json` é `com.mindease.mobile`
2. Verifique se o Bundle ID no Firebase iOS é o mesmo
3. Refaça o prebuild após alterações: `npx expo prebuild --clean`

### Limpar Cache e Rebuild

Se tiver problemas persistentes, limpe o cache:

```bash
# Limpar cache do Expo
npx expo start --clear

# Limpar e refazer prebuild
rm -rf android ios
npx expo prebuild --clean

# Limpar cache do npm
rm -rf node_modules
rm package-lock.json
npm install
```

---

## Checklist Final

- [ ] Projeto criado no Firebase Console
- [ ] Autenticação Google habilitada no Firebase
- [ ] App Android registrado com SHA-1 correto
- [ ] App iOS registrado com Bundle ID correto
- [ ] Tela de Consentimento OAuth configurada
- [ ] Usuários de teste adicionados (se app em modo teste)
- [ ] `google-services.json` baixado e na raiz do projeto
- [ ] `GoogleService-Info.plist` baixado e na raiz do projeto
- [ ] Arquivos sensíveis adicionados ao `.gitignore`
- [ ] Variáveis de ambiente configuradas no `.env`
- [ ] `npm install` executado
- [ ] `npx expo prebuild` executado
- [ ] Build testado com sucesso

---

## Recursos Úteis

- [Firebase Console](https://console.firebase.google.com/)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Documentação @react-native-google-signin](https://react-native-google-signin.github.io/docs/intro)
- [Documentação Expo - Config Plugins](https://docs.expo.dev/config-plugins/introduction/)
- [Firebase Auth - Google Sign-In](https://firebase.google.com/docs/auth/android/google-signin)

---

*Documento criado para o projeto MindEase Mobile*
