/**
 * Dados estruturados do Teste de Temperamentos - Célula Esperança
 * Baseado fielmente no material original de Roberta Fázio, adaptado para linguagem adulta e comunitária.
 */

const TEST_DATA = {
  info: {
    title: "Teste de Temperamentos",
    subtitle: "Célula Esperança • Uma jornada de autoconhecimento, relacionamentos e crescimento cristão",
    totalSteps: 2,
    totalQuestions: 33
  },

  // Etapa 1: Quente vs Frio (21 perguntas)
  // Coração = Quente (extrovertido, ativo, expressivo, rápido)
  // Estrela = Frio (introvertido, calmo, reflexivo, contido)
  etapa1: {
    id: 1,
    title: "Etapa 1 — Ritmo e Expressão",
    subtitle: "Descubra se sua tendência natural é Quente ou Fria",
    description: "Escolha em cada item a alternativa que expressa sua reação mais espontânea e natural, sem se preocupar com o que parece ideal.",
    dimension: { A: "Quente", B: "Frio" },
    dimensionLabels: {
      A: { name: "Quente", trait: "Extroversão, espontaneidade e ação rápida" },
      B: { name: "Frio", trait: "Introversão, ponderação e ritmo reflexivo" }
    },
    questions: [
      {
        id: 1,
        text: "Ao ser apresentado(a) a pessoas desconhecidas:",
        optionA: {
          label: "Sinto-me confortável e logo desenvolvo conversa; gosto de conhecer novas pessoas.",
          value: "Quente"
        },
        optionB: {
          label: "Até converso educadamente, mas não me sinto totalmente à vontade logo de início.",
          value: "Frio"
        }
      },
      {
        id: 2,
        text: "Quando chego a um ambiente ou igreja que nunca frequentei:",
        optionA: {
          label: "Logo procuro me aproximar, conversar e me enturmar com as pessoas.",
          value: "Quente"
        },
        optionB: {
          label: "Fico mais quieto(a), observando e analisando o ambiente antes de interagir.",
          value: "Frio"
        }
      },
      {
        id: 3,
        text: "Quando alguém me apresenta uma nova ideia ou proposta:",
        optionA: {
          label: "Reajo com rapidez, emitindo prontamente a minha opinião.",
          value: "Quente"
        },
        optionB: {
          label: "Demoro a me manifestar; sinto necessidade de pensar e amadurecer primeiro.",
          value: "Frio"
        }
      },
      {
        id: 4,
        text: "Diante de uma notícia inesperada ou situação de impacto:",
        optionA: {
          label: "Sinto a necessidade imediata de ligar ou procurar alguém de confiança para desabafar.",
          value: "Quente"
        },
        optionB: {
          label: "Sinto necessidade de me recolher em silêncio para pensar e refletir sobre o acontecido.",
          value: "Frio"
        }
      },
      {
        id: 5,
        text: "Como você costuma processar suas emoções?",
        optionA: {
          label: "Processo melhor as minhas emoções enquanto falo abertamente sobre elas.",
          value: "Quente"
        },
        optionB: {
          label: "Processo melhor as minhas emoções ficando a sós, em silêncio e reflexão interior.",
          value: "Frio"
        }
      },
      {
        id: 6,
        text: "Em momentos de raiva ou forte contrariedade:",
        optionA: {
          label: "Tenho tendência a me irritar ou explodir com facilidade no momento.",
          value: "Quente"
        },
        optionB: {
          label: "Costumo guardar e só explodo após muito tempo de incômodos acumulados.",
          value: "Frio"
        }
      },
      {
        id: 7,
        text: "Sobre sua intensidade ao se interessar por algo:",
        optionA: {
          label: "Considero-me uma pessoa empolgada e até exuberante quando me apaixono por uma causa.",
          value: "Quente"
        },
        optionB: {
          label: "Não costumo demonstrar grande euforia externa; mantenho um tom sereno e contido.",
          value: "Frio"
        }
      },
      {
        id: 8,
        text: "Em sua postura de comunicação interpessoal:",
        optionA: {
          label: "Sou extrovertido(a): comunico-me com facilidade e defendo ativamente minhas ideias.",
          value: "Quente"
        },
        optionB: {
          label: "Sou introvertido(a): guardo minhas opiniões e entendo que nem tudo precisa ser dito.",
          value: "Frio"
        }
      },
      {
        id: 9,
        text: "Sobre convivência social e momentos a sós:",
        optionA: {
          label: "Amo estar com pessoas, receber visitas e ver a casa cheia e animada.",
          value: "Quente"
        },
        optionB: {
          label: "Aprecio as pessoas, mas preciso de solitude e silêncio para recarregar minhas energias.",
          value: "Frio"
        }
      },
      {
        id: 10,
        text: "Em relação a ser o centro das atenções:",
        optionA: {
          label: "Não vejo problema em ser o centro das atenções; sinto-me natural e à vontade.",
          value: "Quente"
        },
        optionB: {
          label: "Não gosto de ser o centro das atenções; prefiro agir com discrição nos bastidores.",
          value: "Frio"
        }
      },
      {
        id: 11,
        text: "Em uma roda de conversa:",
        optionA: {
          label: "Gosto bastante de falar, participo ativamente e me expresso com desenvoltura.",
          value: "Quente"
        },
        optionB: {
          label: "Sou mais introspectivo(a); costumo falar menos e ouvir com atenção.",
          value: "Frio"
        }
      },
      {
        id: 12,
        text: "Ao tomar decisões no dia a dia:",
        optionA: {
          label: "Sou rápido(a) e assertivo(a) para decidir o rumo a seguir.",
          value: "Quente"
        },
        optionB: {
          label: "Demoro mais tempo para ponderar; posso manifestar certa indecisão cautelosa.",
          value: "Frio"
        }
      },
      {
        id: 13,
        text: "Quanto à demonstração exterior dos seus sentimentos:",
        optionA: {
          label: "Demonstro sentimentos e emoções com facilidade, transparência e espontaneidade.",
          value: "Quente"
        },
        optionB: {
          label: "Posso parecer reservado(a) ou frio(a), pois tenho dificuldade em demonstrar emoções abertamente.",
          value: "Frio"
        }
      },
      {
        id: 14,
        text: "Sobre sua tolerância imediata à lentidão ou enrolação:",
        optionA: {
          label: "Tenho o pavio mais curto; sinto urgência e fico inquieto(a) com rodeios.",
          value: "Quente"
        },
        optionB: {
          label: "Mesmo sentindo irritação interior, tenho autocontrole e consigo manter a serenidade.",
          value: "Frio"
        }
      },
      {
        id: 15,
        text: "Quando você percebe alguém em apuros ou com dificuldades:",
        optionA: {
          label: "Às vezes intervenho e tento ajudar de imediato, mesmo sem ter sido chamado(a).",
          value: "Quente"
        },
        optionB: {
          label: "Aguardo abertura ou pedido claro para ajudar; prezo pelo respeito à privacidade.",
          value: "Frio"
        }
      },
      {
        id: 16,
        text: "Em atividades em grupo ou equipe:",
        optionA: {
          label: "Assumo naturalmente a palavra, proponho o caminho e gosto de liderar.",
          value: "Quente"
        },
        optionB: {
          label: "Prefiro ouvir a contribuição das outras pessoas antes de fazer qualquer colocação.",
          value: "Frio"
        }
      },
      {
        id: 17,
        text: "Sobre o seu nível habitual de agitação corporal e energia:",
        optionA: {
          label: "Sou uma pessoa agitada, dinâmica e com ritmo enérgico ao longo do dia.",
          value: "Quente"
        },
        optionB: {
          label: "Sou uma pessoa de ritmo mais calmo e comedido (mesmo ansioso por dentro, transmito calma).",
          value: "Frio"
        }
      },
      {
        id: 18,
        text: "Em relação ao tempo e à urgência das coisas:",
        optionA: {
          label: "Trato quase tudo como urgente; acredito que as decisões e ações não podem esperar.",
          value: "Quente"
        },
        optionB: {
          label: "Prefiro um ritmo mais compassado; preciso de tempo para assimilar questões importantes.",
          value: "Frio"
        }
      },
      {
        id: 19,
        text: "Quanto ao controle dos seus impulsos:",
        optionA: {
          label: "Tenho atitudes impulsivas e por vezes já cometi falhas por agir sem refletir o bastante.",
          value: "Quente"
        },
        optionB: {
          label: "Costumo ponderar cuidadosamente riscos e consequências antes de agir.",
          value: "Frio"
        }
      },
      {
        id: 20,
        text: "Em seus momentos livres de lazer:",
        optionA: {
          label: "Gosto de passear, sair, explorar novos lugares e gastar energia ao ar livre.",
          value: "Quente"
        },
        optionB: {
          label: "Prefiro ficar em casa descansando, lendo ou assistindo a um filme no sossego.",
          value: "Frio"
        }
      },
      {
        id: 21,
        text: "Sobre sua relação com rotina e novidades:",
        optionA: {
          label: "Amo novidades, aventura e movimento; fico entediado(a) com facilidade.",
          value: "Quente"
        },
        optionB: {
          label: "Sou tranquilo(a), valorizo a estabilidade e a previsibilidade da minha rotina.",
          value: "Frio"
        }
      }
    ]
  },

  // Etapa 2: Úmido vs Seco (12 perguntas)
  // Sol = Úmido (flexível, acolhedor, relacional, adaptável, perdoa fácil)
  // Flor = Seco (focado, metódico, firme, memorioso, princípios rígidos)
  etapa2: {
    id: 2,
    title: "Etapa 2 — Flexibilidade e Marcação",
    subtitle: "Descubra se sua tendência natural é Úmida ou Seca",
    description: "Avalie como você lida com relacionamentos, regras, marcas emocionais e divergências de opinião.",
    dimension: { A: "Úmido", B: "Seco" },
    dimensionLabels: {
      A: { name: "Úmido", trait: "Flexibilidade, facilidade para perdoar e adaptabilidade" },
      B: { name: "Seco", trait: "Firmeza, profundidade nas marcas e apego aos princípios" }
    },
    questions: [
      {
        id: 1,
        text: "Quando alguém magoa ou decepciona você:",
        optionA: {
          label: "Costumo perdoar com facilidade; logo penso nos motivos da pessoa e relevo.",
          value: "Úmido"
        },
        optionB: {
          label: "Acho difícil perdoar; sinto-me profundamente marcado(a) e levo a ofensa a sério.",
          value: "Seco"
        }
      },
      {
        id: 2,
        text: "Sobre regras, normas e rigidez:",
        optionA: {
          label: "Não sou muito apegado(a) a regras rígidas; acredito que a convivência precisa de leveza.",
          value: "Úmido"
        },
        optionB: {
          label: "Para mim o certo é certo e o errado é errado; defendo padrões claros sem meio-termo.",
          value: "Seco"
        }
      },
      {
        id: 3,
        text: "Em relação ao foco e à disciplina nas tarefas:",
        optionA: {
          label: "Posso ser disperso(a) ou 'avoado(a)', alternando o foco com facilidade.",
          value: "Úmido"
        },
        optionB: {
          label: "Sou focado(a) em meus objetivos e tenho perseverança férrea para ir até o fim.",
          value: "Seco"
        }
      },
      {
        id: 4,
        text: "Quanto à sua memória de acontecimentos do passado:",
        optionA: {
          label: "Esqueço fatos e sentimentos ruins com rapidez; o passado não costuma me prender.",
          value: "Úmido"
        },
        optionB: {
          label: "Tenho memória detalhada; lembro vividamente de sentimentos e marcas do passado.",
          value: "Seco"
        }
      },
      {
        id: 5,
        text: "Sobre a construção de seus círculos de amizade:",
        optionA: {
          label: "Tenho facilidade para fazer amigos e costumo ter um círculo amplo de relacionamentos.",
          value: "Úmido"
        },
        optionB: {
          label: "Tenho pouquíssimos e verdadeiros amigos, mantendo com eles uma lealdade inabalável.",
          value: "Seco"
        }
      },
      {
        id: 6,
        text: "Diante de mudanças inesperadas de planos ou ambiente:",
        optionA: {
          label: "Acolho mudanças com naturalidade; sou flexível e me adapto facilmente.",
          value: "Úmido"
        },
        optionB: {
          label: "Resisto a mudanças repentinas; prefiro a segurança e solidez do que já conheço.",
          value: "Seco"
        }
      },
      {
        id: 7,
        text: "Ao expressar sua opinião em assuntos delicados:",
        optionA: {
          label: "Penso bastante em como as pessoas vão se sentir, buscando suavizar as palavras.",
          value: "Úmido"
        },
        optionB: {
          label: "Priorizo defender a verdade e os meus valores com firmeza: sou 'sim, sim; não, não'.",
          value: "Seco"
        }
      },
      {
        id: 8,
        text: "Na convivência com pensamentos discordantes:",
        optionA: {
          label: "Convivo harmoniosamente com pessoas de ideias opostas às minhas sem me desgastar.",
          value: "Úmido"
        },
        optionB: {
          label: "Prefiro me relacionar e caminhar com pessoas que compartilhem dos mesmos princípios.",
          value: "Seco"
        }
      },
      {
        id: 9,
        text: "Diante de um sofrimento, luto ou perda pessoal:",
        optionA: {
          label: "Sofro intensamente no momento, mas com o passar do tempo consigo ressignificar e seguir em frente.",
          value: "Úmido"
        },
        optionB: {
          label: "Sofro por longos períodos; sinto uma marca duradoura e acho muito difícil virar a página.",
          value: "Seco"
        }
      },
      {
        id: 10,
        text: "No tempero do seu comportamento diário:",
        optionA: {
          label: "Costumo ser maleável, compreensivo(a) e flexível nas negociações cotidianas.",
          value: "Úmido"
        },
        optionB: {
          label: "Costumo ser mais tenso(a), firme e inflexível quando convicto(a) da minha razão.",
          value: "Seco"
        }
      },
      {
        id: 11,
        text: "Quando confrontado(a) com perspectivas contrárias:",
        optionA: {
          label: "Tenho facilidade para acolher visões divergentes: cada um tem seu modo de ver a vida.",
          value: "Úmido"
        },
        optionB: {
          label: "Tenho dificuldade com ideias que considero erradas; fico desconfortável com a divergência.",
          value: "Seco"
        }
      },
      {
        id: 12,
        text: "Sobre sua facilidade em perdoar e relevar:",
        optionA: {
          label: "Perdoo com tanta facilidade que às vezes fico com receio de parecer ingênuo(a).",
          value: "Úmido"
        },
        optionB: {
          label: "Não perdoo tão facilmente; exijo reparação sincera e coerência de atitudes.",
          value: "Seco"
        }
      }
    ]
  },

  // Conteúdo detalhado dos 4 temperamentos clássicos
  temperamentos: {
    sanguineo: {
      id: "sanguineo",
      name: "Sanguíneo",
      element: "Ar",
      elementTitle: "Elemento Ar (Quente + Úmido)",
      badge: "Expressividade, Entusiasmo e Relacionamentos",
      color: "#243B32",
      accentColor: "#A3AE9B",
      quadrant: { x: -1, y: 1 }, // Quente (cima) e Úmido (esquerda)
      summary: "Pessoas de temperamento sanguíneo são naturalmente calorosas, comunicativas e acolhedoras. Como o ar, movem-se com leveza, conectam pessoas e trazem alegria para os ambientes por onde passam. São motivadas pela interação humana e inspiram ânimo em momentos de desânimo coletivo.",
      qualidades: [
        {
          title: "Sociabilidade e Conexão",
          desc: "Facilidade natural para quebrar o gelo, acolher visitantes e fazer com que todos se sintam bem-vindos e integrados."
        },
        {
          title: "Otimismo e Entusiasmo",
          desc: "Capacidade contagiante de enxergar o lado positivo das circunstâncias, trazendo esperança e alegria para o grupo."
        },
        {
          title: "Flexibilidade e Empatia",
          desc: "Alta capacidade de adaptação a mudanças de planos e sensibilidade genuína em relação às necessidades imediatas do próximo."
        },
        {
          title: "Facilidade para Perdoar",
          desc: "Não costuma cultivar rancores; prefere virar a página e restabelecer a harmonia nos laços relacionais."
        }
      ],
      pontosAtencao: [
        {
          title: "Impulsividade nas Palavras e Ações",
          desc: "Tendência a falar ou agir sem refletir em todas as repercussões, o que pode gerar mal-entendidos ou decisões precipitadas."
        },
        {
          title: "Dispersão e Falta de Foco",
          desc: "Dificuldade em manter a atenção em tarefas rotineiras ou detalhistas quando a novidade inicial perde o brilho."
        },
        {
          title: "Inconstância nos Compromissos",
          desc: "Facilidade para começar projetos com grande entusiasmo, mas propensão a desanimar ou desistir diante de obstáculos complexos."
        },
        {
          title: "Dificuldade em Dizer 'Não'",
          desc: "Desejo de agradar a todos que pode levar à sobrecarga física e emocional por assumir mais do que consegue cumprir."
        }
      ],
      amadurecimento: [
        "Pratique o silêncio intencional: faça pausas antes de responder e exercite a escuta ativa.",
        "Desenvolva o hábito da conclusão: comprometa-se a terminar um projeto antes de iniciar outro.",
        "Estabeleça limites saudáveis na sua agenda para não negligenciar seu descanso e devocional.",
        "Cultive a prestação de contas com um amigo maduro na célula para fortalecer sua constância."
      ],
      convivenciaCelula: "Na Célula Esperança, o sanguíneo é o embaixador do acolhimento. Seu dom natural de aproximar pessoas é vital para recepcionar visitantes e dissipar tensões. O grupo se beneficia grandemente de sua energia positiva, enquanto a célula o ajuda a desenvolver constância, pontualidade e profundidade espiritual.",
      reflexaoCrista: {
        versiculo: "Tiago 1:19",
        textoVersiculo: "Meus amados irmãos, tenham isto em mente: Sejam todos prontos para ouvir, tardios para falar e tardios para irar-se.",
        mensagem: "Deus confiou a você um coração generoso e comunicativo. Lembre-se de que a beleza do temperamento se aperfeiçoa sob a unção do Espírito Santo. Quando você alia seu carisma ao fruto do domínio próprio e da perseverança, torna-se um vaso poderoso de encorajamento para toda a igreja."
      }
    },

    colerico: {
      id: "colerico",
      name: "Colérico",
      element: "Fogo",
      elementTitle: "Elemento Fogo (Quente + Seco)",
      badge: "Iniciativa, Foco e Liderança Resolutiva",
      color: "#243B32",
      accentColor: "#A3AE9B",
      quadrant: { x: 1, y: 1 }, // Quente (cima) e Seco (direita)
      summary: "Pessoas de temperamento colérico são determinadas, práticas e orientadas a objetivos. Como o fogo, possuem energia transformadora, calor para agir e determinação para superar montanhas. São líderes naturais que enxergam soluções onde outros veem obstáculos e mobilizam equipes com coragem.",
      qualidades: [
        {
          title: "Liderança e Iniciativa",
          desc: "Prontidão para assumir responsabilidades, tomar decisões sob pressão e guiar o grupo com segurança e direção clara."
        },
        {
          title: "Foco em Metas e Eficiência",
          desc: "Grande capacidade de planejar estrategicamente, otimizar recursos e trabalhar arduamente até a meta ser atingida."
        },
        {
          title: "Coragem e Resiliência",
          desc: "Enfrenta momentos de crise com bravura; não se intimida diante de adversidades e inspira segurança nos liderados."
        },
        {
          title: "Lealdade Protetora",
          desc: "Defende com firmeza seus princípios e as pessoas que estão sob seu cuidado, demonstrando genuíno zelo fraternal."
        }
      ],
      pontosAtencao: [
        {
          title: "Impaciência e Rigidez",
          desc: "Tendência a se irritar quando os outros têm um ritmo mais lento de compreensão ou execução de tarefas."
        },
        {
          title: "Risco de Postura Autoritária",
          desc: "Comunicação direta que pode soar áspera ou impositiva, magoando pessoas mais sensíveis sem perceber."
        },
        {
          title: "Foco Excessivo em Resultados",
          desc: "Perigo de priorizar prazos e tarefas em detrimento do cuidado pastoral e do bem-estar emocional das pessoas."
        },
        {
          title: "Dificuldade em Pedir Perdão e Ceder",
          desc: "A firmeza de convicção pode se transformar em orgulho ou teimosia para admitir fragilidades e erros."
        }
      ],
      amadurecimento: [
        "Exercite a empatia ativa: lembre-se de que cada irmão possui um ritmo de maturação único.",
        "Adote o modelo de Jesus: 'o maior entre vós seja como aquele que serve' (Lc 22:26).",
        "Aprenda a delegar com confiança, celebrando o progresso da equipe em vez de cobrar perfeição imediata.",
        "Peça perdão prontamente quando notar que suas palavras foram duras ou desmedidas."
      ],
      convivenciaCelula: "Na Célula Esperança, o colérico é o motor das ações concretas e dos projetos de serviço. Ele ajuda o grupo a não se acomodar, organizando escalas, eventos e metas de discipulado. O desafio na célula é cultivar a mansidão e ouvir com o coração, permitindo que o amor preceda a produtividade.",
      reflexaoCrista: {
        versiculo: "Colossenses 3:12-13",
        textoVersiculo: "Revesti-vos, pois, como eleitos de Deus, santos e amados, de coração compassivo, de benignidade, humildade, mansidão, longanimidade. Suportai-vos uns aos outros e perdoai-vos mutuamente.",
        mensagem: "Sua força de vontade e capacidade de realização são presentes do Criador para edificar o Seu Reino. Quando essa chama é moldada pela graça e pela humildade de Cristo, você não apenas atinge grandes alvos, mas cura e inspira profundamente os corações que lidera."
      }
    },

    fleumatico: {
      id: "fleumatico",
      name: "Fleumático",
      element: "Água",
      elementTitle: "Elemento Água (Frio + Úmido)",
      badge: "Estabilidade, Paz e Conciliação",
      color: "#243B32",
      accentColor: "#A3AE9B",
      quadrant: { x: -1, y: -1 }, // Frio (baixo) e Úmido (esquerda)
      summary: "Pessoas de temperamento fleumático são serenas, equilibradas e pacificadoras. Como a água fresca, trazem refrigério, estabilidade emocional e senso de harmonia para qualquer ambiente. São companheiras fiéis, excelentes ouvintes e mantêm o controle e a sobriedade mesmo em tempestades.",
      qualidades: [
        {
          title: "Calma e Equilíbrio Emocional",
          desc: "Capacidade singular de manter a serenidade e a clareza em situações tensas, acalmando os ânimos ao seu redor."
        },
        {
          title: "Paciência e Escuta Atenciosa",
          desc: "Sabe ouvir sem julgar precipitadamente, proporcionando um ambiente acolhedor e seguro para quem precisa desabafar."
        },
        {
          title: "Mediação e Pacificação",
          desc: "Habilidade natural para reconciliar divergências e construir pontes de entendimento entre pessoas em conflito."
        },
        {
          title: "Constância e Confiabilidade",
          desc: "Leal em seus compromissos diários; alguém com quem a liderança e os amigos podem sempre contar com segurança."
        }
      ],
      pontosAtencao: [
        {
          title: "Tendência à Passividade e Procrastinação",
          desc: "Propensão a adiar decisões difíceis ou tarefas desafiadoras para evitar desconforto ou desgaste de energia."
        },
        {
          title: "Fuga do Confronto Necessário",
          desc: "Preocupação excessiva em manter a paz superficial que pode levar a tolerar atitudes inadequadas sem posicionamento firme."
        },
        {
          title: "Reserva Excessiva de Opiniões",
          desc: "Dificuldade em manifestar seus próprios desejos, sentimentos e necessidades, anulando-se em favor dos outros."
        },
        {
          title: "Resistência à Mudança",
          desc: "Apego à zona de conforto e certa relutância em abraçar novos desafios espirituais ou responsabilidades ministeriais."
        }
      ],
      amadurecimento: [
        "Exercite a voz ativa: compartilhe suas ideias na célula mesmo quando achar que são simples.",
        "Encare o confronto com maturidade cristã: a verdadeira paz muitas vezes exige conversas francas e amorosas.",
        "Defina prazos pessoais e dê o primeiro passo em tarefas desafiadoras, vencendo a inércia.",
        "Assuma protagonismo: coloque sua calma a serviço da liderança de momentos práticos na comunidade."
      ],
      convivenciaCelula: "Na Célula Esperança, o fleumático é o porto seguro e o abraço acolhedor. Ele equilibra a intensidade dos perfis mais explosivos e garante que os relacionamentos sejam preservados com gentileza e respeito. Seu crescimento se dá quando se dispõe a dar um passo à frente com ousadia santa.",
      reflexaoCrista: {
        versiculo: "Josué 1:9",
        textoVersiculo: "Não fui eu que ordenei a você? Seja forte e corajoso! Não se apavore nem desanime, pois o Senhor, o seu Deus, estará com você por onde você andar.",
        mensagem: "Sua doçura e sobriedade são reflexos visíveis da paz de Deus no meio da célula. O Senhor convida você a não esconder seus talentos na tranquilidade do silêncio, mas a ser um instrumento corajoso de edificação e transformação nas vidas de seus irmãos."
      }
    },

    melancolico: {
      id: "melancolico",
      name: "Melancólico",
      element: "Terra",
      elementTitle: "Elemento Terra (Frio + Seco)",
      badge: "Profundidade, Excelência e Lealdade",
      color: "#243B32",
      accentColor: "#A3AE9B",
      quadrant: { x: 1, y: -1 }, // Frio (baixo) e Seco (direita)
      summary: "Pessoas de temperamento melancólico são reflexivas, profundas e extremamente detalhistas. Como a terra fértil, possuem raízes sólidas, amor pelo que é nobre e verdadeiro, e apreço pela beleza e pela ordem. São leais até o fim aos seus amigos e colocam esmero e excelência em cada serviço que prestam.",
      qualidades: [
        {
          title: "Profundidade e Sensibilidade",
          desc: "Compreensão rica da vida, da Bíblia e dos sentimentos alheios; capacidade rara de se conectar de coração a coração."
        },
        {
          title: "Apreço pela Excelência e Ordem",
          desc: "Capricho admirável em tudo o que faz, desde a organização de um encontro até o zelo com o ensino e a verdade."
        },
        {
          title: "Lealdade e Fidelidade Incondicionais",
          desc: "Investimento profundo e duradouro nas amizades e nos votos assumidos perante Deus e a igreja."
        },
        {
          title: "Capacidade Analítica e Prudência",
          desc: "Excelente habilidade para avaliar riscos, prever detalhes cruciais e planejar com prudência e critério."
        }
      ],
      pontosAtencao: [
        {
          title: "Perfeccionismo e Autocrítica Rigorosa",
          desc: "Exigência de padrões ideais que geram frustração constante consigo mesmo(a) e com as limitações dos outros."
        },
        {
          title: "Dificuldade em Perdoar e Esquecer",
          desc: "Tendência a remoer mágoas e cicatrizes antigas, mantendo vivo o ressentimento mesmo após pedidos de perdão."
        },
        {
          title: "Pessimismo e Ansiedade Interior",
          desc: "Inclinação a antecipar o pior cenário em situações incertas, alimentando preocupações excessivas."
        },
        {
          title: "Isolamento Emocional",
          desc: "Fechamento em si mesmo(a) quando sobrecarregado(a), erguendo barreiras que dificultam o apoio dos irmãos."
        }
      ],
      amadurecimento: [
        "Acolha a graça da imperfeição: o Reino de Deus cresce em vasos de barro dependentes da misericórdia divina.",
        "Exercite o perdão deliberado: decida soltar as ofensas passadas como um ato de obediência e cura.",
        "Alimente a gratidão diária: registre os motivos de louvor para contrabalançar o olhar crítico sobre as falhas.",
        "Compartilhe suas dores: permita que pessoas maduras da célula orem e caminhem com você em seus desertos."
      ],
      convivenciaCelula: "Na Célula Esperança, o melancólico é o guardião da verdade, do discipulado zeloso e da intercessão silenciosa. Seu olhar atento percebe o sofrimento invisível de quem está no canto da sala. Na convivência comunitária, ele é desafiado a experimentar a leveza da comunhão e o descanso na soberania do Senhor.",
      reflexaoCrista: {
        versiculo: "Filipenses 4:8",
        textoVersiculo: "Finalmente, irmãos, tudo o que for verdadeiro, tudo o que for nobre, tudo o que for correto, tudo o que for puro, tudo o que for amável, tudo o que for de boa fama, se houver algo de excelente ou digno de louvor, pensem nessas coisas.",
        mensagem: "Deus formou sua sensibilidade e profundidade para produzir frutos eternos de amor e cuidado pastoral. Ao colocar seus fardos e anseios de controle nas mãos do Pai, sua alma encontra o verdadeiro repouso, refletindo a fidelidade e a beleza de Cristo em cada relacionamento."
      }
    }
  },

  // Nuances dos 3 subtipos (conforme páginas 11-13 do PDF)
  nuances: {
    sanguineo: [
      {
        cond: (q, f, u, s) => q >= 14,
        title: "Sanguíneo com Forte Intensidade Quente",
        text: "Sua quentura acentuada intensifica o dinamismo, a liderança e a rapidez de iniciativa, aproximando certas atitudes do perfil Colérico (coragem para agir e falar diretamente)."
      },
      {
        cond: (q, f, u, s) => u >= 8,
        title: "Sanguíneo com Forte Intensidade Úmida",
        text: "Sua umidade acentuada acentua a flexibilidade, a doçura e a capacidade de conciliação, aproximando traços do perfil Fleumático (maior empatia e tolerância na convivência)."
      },
      {
        cond: (q, f, u, s) => s >= 4,
        title: "Sanguíneo com Aporte Seco",
        text: "Embora predominantemente úmido, você possui um aporte seco relevante, o que lhe confere maior foco, apego a valores inegociáveis e perseverança para não abandonar projetos importantes."
      }
    ],
    colerico: [
      {
        cond: (q, f, u, s) => q >= 14,
        title: "Colérico com Forte Intensidade Quente",
        text: "A quentura dominante amplia a expansividade, o entusiasmo e a comunicação, compartilhando traços do Sanguíneo (capacidade de mobilizar e motivar com calor humano)."
      },
      {
        cond: (q, f, u, s) => s >= 8,
        title: "Colérico com Forte Intensidade Seca",
        text: "A secura dominante confere alta precisão, disciplina e rigor nos detalhes, compartilhando traços do Melancólico (senso crítico aguçado e busca por padrões elevados)."
      },
      {
        cond: (q, f, u, s) => u >= 4,
        title: "Colérico com Aporte Úmido",
        text: "A presença de aporte úmido suaviza a sua comunicação e lhe confere maior facilidade para perdoar e se colocar no lugar do outro, enriquecendo sua liderança com empatia."
      }
    ],
    fleumatico: [
      {
        cond: (q, f, u, s) => f >= 14,
        title: "Fleumático com Forte Intensidade Fria",
        text: "A frieza expressiva acentua a introspecção, a sobriedade e a reserva, compartilhando características do Melancólico (profundidade analítica e cuidado com os passos dados)."
      },
      {
        cond: (q, f, u, s) => u >= 8,
        title: "Fleumático com Forte Intensidade Úmida",
        text: "A umidade destacada amplia a doçura, o carinho relacional e a facilidade de integração, compartilhando traços do Sanguíneo (facilidade para acolher e deixar os outros confortáveis)."
      },
      {
        cond: (q, f, u, s) => s >= 4,
        title: "Fleumático com Aporte Seco",
        text: "O aporte seco confere firmeza e perseverança aos seus propósitos, ajudando a vencer a inércia natural e mantendo uma fidelidade rigorosa aos seus compromissos."
      }
    ],
    melancolico: [
      {
        cond: (q, f, u, s) => f >= 14,
        title: "Melancólico com Forte Intensidade Fria",
        text: "A frieza dominante reforça a discrição, a tranquilidade exterior e o ritmo paciente, compartilhando características do Fleumático (serenidade para analisar os fatos sem pressa)."
      },
      {
        cond: (q, f, u, s) => s >= 8,
        title: "Melancólico com Forte Intensidade Seca",
        text: "A secura dominante reforça a determinação inabalável, a disciplina férrea e o foco em metas difíceis, aproximando-o do Colérico na hora de defender a verdade a qualquer custo."
      },
      {
        cond: (q, f, u, s) => u >= 4,
        title: "Melancólico com Aporte Úmido",
        text: "O aporte úmido atua como bálsamo suavizador, conferindo maior leveza para ressignificar dores, perdoar com mais rapidez e não se prender a exigências intransigentes."
      }
    ]
  }
};

// Export para CommonJS e Browser
if (typeof module !== "undefined" && module.exports) {
  module.exports = TEST_DATA;
}
