# Célula Esperança — Teste de Temperamentos (Web App Mobile-First)

Aplicativo web mobile-first desenvolvido especialmente para a **Célula Esperança**, transformando a dinâmica impressa em uma experiência digital agradável, moderna, acolhedora e 100% privativa.

---

## 🌟 Principais Recursos

- **100% Mobile-First**: Desenvolvido com área de toque mínima de 48px, botões largos, tipografia moderna e leitura confortável em qualquer celular.
- **Privacidade Total**: Sem cadastro, sem login, sem cookies de identificação e sem envio de dados para servidores. Toda a apuração do teste ocorre **localmente na memória do dispositivo**.
- **Fidelidade Metodológica ao PDF Original**:
  - **Etapa 1 (21 itens)**: Apuração do ritmo e expressão (**Quente** vs **Frio**).
  - **Etapa 2 (12 itens)**: Apuração da flexibilidade e marcas (**Úmido** vs **Seco**).
  - **Combinação dos 4 Temperamentos Clássicos**:
    - **Sanguíneo**: Quente + Úmido (Elemento Ar)
    - **Colérico**: Quente + Seco (Elemento Fogo)
    - **Fleumático**: Frio + Úmido (Elemento Água)
    - **Melancólico**: Frio + Seco (Elemento Terra)
  - **Tratamento de Nuances e Subtipos**: Identifica intensidades acentuadas e aportes secundários conforme as páginas 11 a 13 do material.
  - **Tratamento de Empates**: Apresenta com clareza o equilíbrio entre temperamentos irmãos quando a pontuação na etapa 2 for 6 × 6.
- **Gráfico Visual Interativo**: Mapa dos 4 quadrantes clássicos em SVG com a posição exata do participante.
- **Conteúdo Cristão e Comunitário**: Forças, pontos de atenção, caminhos de amadurecimento, atuação prática na Célula Esperança e reflexão com versículo bíblico.
- **Exportação em PDF**: Geração de relatório limpo e profissional direto no aparelho.
- **Compartilhamento Nativo**: Compartilha o resumo no WhatsApp ou copia o texto formatado com 1 clique.
- **Identidade Visual Oficial**: Paleta institucional da Célula Esperança (`#243B32`, `#A3AE9B`, `#F6F4EF`, `#343936`) e o logotipo oficial em alta resolução.

---

## 🚀 Como Publicar Gratuitamente no Google Apps Script (2 minutos)

O Google Apps Script permite que você publique este Web App com um link público oficial do Google (`https://script.google.com/...`) de forma **100% gratuita**, sem custos mensais nem necessidade de gerenciar servidores.

### Passo a Passo:

1. Acesse **[script.google.com](https://script.google.com)** com sua conta Google e clique em **"+ Novo projeto"**.
2. Dê um nome ao projeto (exemplo: `Célula Esperança - Teste de Temperamentos`).
3. No arquivo padrão `Código.gs`, apague o conteúdo existente e cole o código do arquivo:
   - `google-apps-script/Codigo.gs`
4. Clique no botão **"+"** (Adicionar arquivo) ao lado de *Arquivos* e escolha **HTML**.
5. Nomeie o arquivo exatamente como **`Index`** (o Google criará `Index.html`).
6. Apague o código padrão do `Index.html` e cole todo o conteúdo do arquivo:
   - `google-apps-script/Index.html` (já contém CSS, scripts e a logo embutidos em Base64).
7. Clique em **Salvar** (ícone de disquete).
8. No canto superior direito, clique em **Implantar** > **Nova implantação**.
9. Na engrenagem de configuração, selecione **App da Web**.
10. Preencha:
    - **Descrição**: `Versão 1.0`
    - **Executar como**: `Eu (seu-email@gmail.com)`
    - **Quem pode acessar**: `Qualquer pessoa` *(essencial para os membros da célula abrirem sem precisar de login)*
11. Clique em **Implantar** e copie a **URL do app da Web**.
12. Pronto! Envie esse link no grupo de WhatsApp da célula para todos realizarem o teste nos seus celulares!

---

## 🌐 Outras Opções de Hospedagem Gratuita

### Opção A: GitHub Pages
1. Crie um repositório no GitHub.
2. Faça upload dos arquivos da raiz (`index.html`, `style.css`, `app.js`, `data.js` e a pasta `assets`).
3. Vá em **Settings** > **Pages** > Branch `main` > Save.
4. Seu link estará no ar em segundos!

### Opção B: Vercel ou Netlify
1. Basta arrastar a pasta do projeto para o painel da [Netlify Drop](https://app.netlify.com/drop) ou [Vercel](https://vercel.com).
2. O site é publicado imediatamente com certificado SSL gratuito.

### Opção C: Uso Local Offline
- Você pode simplesmente dar um duplo clique no arquivo `index.html` em qualquer computador ou transferir para o celular. O aplicativo funciona normalmente sem precisar de internet ativa.

---

## 📁 Estrutura de Arquivos

```
app-temperamentos/
├── assets/
│   ├── logo_green.png           # Logo oficial verde profundo em fundo transparente
│   ├── logo_white.png           # Logo oficial branca em fundo transparente
│   └── logo_original.png        # Arquivo original enviado
├── google-apps-script/
│   ├── Codigo.gs                # Arquivo de backend doGet() para o Google Apps Script
│   └── Index.html               # Versão unificada autocontida (com assets base64) para o GAS
├── index.html                   # Estrutura HTML5 semântica e mobile-first
├── style.css                    # Design system, paleta e regras de impressão/PDF
├── data.js                      # Perguntas, textos e regras de apuração dos temperamentos
├── app.js                       # Máquina de estados, navegação, gráficos e compartilhamento
├── build_gas.js                 # Script para regerar a versão autocontida do Google Apps Script
└── README.md                    # Documentação do projeto
```

---

*Célula Esperança • Comunidade Cristã em Células • 2026*
