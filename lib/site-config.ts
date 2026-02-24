import { SiInstagram, SiWhatsapp, SiFacebook } from "@icons-pack/react-simple-icons"
import { 
  TreePine, Bird, Droplets, Shield, Plane, Calendar, Backpack, Cloud, 
  ShieldCheck, Compass, GraduationCap, Binoculars, Leaf, Heart 
} from "lucide-react"
import type { Locale } from "@/components/language-switcher"

export const siteConfig = {
  name: "Esteros del Ibera",
  companyName: "Esteros del Ibera",
  location: "Colonia Carlos Pellegrini, Corrientes, Argentina",
  email: "contacto@esterosdibera.com",
  phone: "+54 9 3773 00-0000",
  whatsappUrl: "https://wa.me/5493773000000?text=Hola!%20Me%20interesa%20conocer%20mas%20sobre%20las%20experiencias%20en%20los%20Esteros%20del%20Ibera.",
  
  navLinks: [
    { label: { es: "Inicio", en: "Home", pt: "Inicio" }, href: "#hero" },
    { label: { es: "Experiencias", en: "Experiences", pt: "Experiencias" }, href: "#packages" },
    { label: { es: "Sobre Mi", en: "About Me", pt: "Sobre Mim" }, href: "#about" },
    { label: { es: "Galeria", en: "Gallery", pt: "Galeria" }, href: "#gallery" },
    { label: { es: "Mapa", en: "Map", pt: "Mapa" }, href: "#map" },
    { label: { es: "Planifica", en: "Travel Tips", pt: "Planeje" }, href: "#travel-tips" },
    { label: { es: "Alojamiento", en: "Hotels", pt: "Hospedagem" }, href: "#hotels" },
    { label: { es: "Contacto", en: "Contact", pt: "Contato" }, href: "#contact" },
  ],

  hero: {
    image: "/images/hero-wetlands.jpg",
    location: { es: "Corrientes, Argentina", en: "Corrientes, Argentina", pt: "Corrientes, Argentina" },
    heading: {
      es: "Descubri los Esteros del Ibera",
      en: "Discover the Ibera Wetlands",
      pt: "Descubra os Esteros del Ibera",
    },
    sub: {
      es: "Experiencias guiadas por una guardaparques que vive, protege y comparte uno de los humedales mas extraordinarios del planeta.",
      en: "Guided experiences by a park ranger who lives, protects, and shares one of the most extraordinary wetlands on the planet.",
      pt: "Experiencias guiadas por uma guarda-parques que vive, protege e compartilha um dos pantanais mais extraordinarios do planeta.",
    },
    cta1: { es: "Ver Experiencias", en: "View Experiences", pt: "Ver Experiencias" },
    cta2: { es: "Contactar", en: "Contact", pt: "Contato" },
    scroll: { es: "Conoce mas", en: "Learn more", pt: "Saiba mais" },
  },

  about: {
    image: "/images/ranger-portrait.jpg",
    label: { es: "Sobre Mi", en: "About Me", pt: "Sobre Mim" },
    heading: {
      es: "Guardaparques, guia y apasionada por la naturaleza",
      en: "Park ranger, guide, and passionate about nature",
      pt: "Guarda-parques, guia e apaixonada pela natureza",
    },
    p1: {
      es: "Soy guardaparques y guia de naturaleza en los Esteros del Ibera, Corrientes. Desde chica creci rodeada de este paisaje increible, y eso desperto en mi una vocacion profunda por la conservacion y la educacion ambiental.",
      en: "I am a park ranger and nature guide in the Ibera Wetlands, Corrientes. I grew up surrounded by this incredible landscape, which awakened a deep vocation for conservation and environmental education.",
      pt: "Sou guarda-parques e guia de natureza nos Esteros del Ibera, Corrientes. Desde pequena cresci rodeada por esta paisagem incrivel, o que despertou em mim uma vocacao profunda pela conservacao e educacao ambiental.",
    },
    p2: {
      es: "Estudie Ciencias Ambientales y dedique mi carrera a proteger este ecosistema unico. Hoy, ademas de mi trabajo en el parque, organizo experiencias turisticas que buscan generar un impacto positivo: conectar a las personas con la naturaleza, apoyar la economia local y contribuir a la conservacion de la biodiversidad.",
      en: "I studied Environmental Sciences and dedicated my career to protecting this unique ecosystem. Today, in addition to my work in the park, I organize tourism experiences that seek to generate a positive impact: connecting people with nature, supporting the local economy, and contributing to biodiversity conservation.",
      pt: "Estudei Ciencias Ambientais e dediquei minha carreira a proteger este ecossistema unico. Hoje, alem do meu trabalho no parque, organizo experiencias turisticas que buscam gerar um impacto positivo: conectar as pessoas com a natureza, apoiar a economia local e contribuir para a conservacao da biodiversidade.",
    },
    highlights: [
      {
        icon: GraduationCap,
        title: { es: "Formacion Academica", en: "Academic Background", pt: "Formacao Academica" },
        text: {
          es: "Licenciada en Ciencias Ambientales con especializacion en conservacion de humedales y biodiversidad.",
          en: "Degree in Environmental Sciences with specialization in wetland and biodiversity conservation.",
          pt: "Licenciada em Ciencias Ambientais com especializacao em conservacao de pantanais e biodiversidade.",
        },
      },
      {
        icon: Binoculars,
        title: { es: "Guardaparques", en: "Park Ranger", pt: "Guarda-parques" },
        text: {
          es: "Mas de 8 anos de experiencia trabajando en areas protegidas, relevamiento de fauna y monitoreo ambiental.",
          en: "Over 8 years of experience working in protected areas, wildlife surveys, and environmental monitoring.",
          pt: "Mais de 8 anos de experiencia trabalhando em areas protegidas, levantamento de fauna e monitoramento ambiental.",
        },
      },
      {
        icon: Leaf,
        title: { es: "Conservacion Activa", en: "Active Conservation", pt: "Conservacao Ativa" },
        text: {
          es: "Colaboradora en proyectos de reintroduccion de especies y restauracion de ecosistemas en los Esteros del Ibera.",
          en: "Collaborator in species reintroduction projects and ecosystem restoration in the Ibera Wetlands.",
          pt: "Colaboradora em projetos de reintroducao de especies e restauracao de ecossistemas nos Esteros del Ibera.",
        },
      },
      {
        icon: Heart,
        title: { es: "Pasion por la Naturaleza", en: "Passion for Nature", pt: "Paixao pela Natureza" },
        text: {
          es: "Cada recorrido es una oportunidad para transmitir el valor de la biodiversidad y conectar a las personas con la naturaleza.",
          en: "Every tour is an opportunity to convey the value of biodiversity and connect people with nature.",
          pt: "Cada passeio e uma oportunidade para transmitir o valor da biodiversidade e conectar as pessoas com a natureza.",
        },
      },
    ],
  },

  conservation: {
    heading: {
      es: "Conservacion que inspira",
      en: "Conservation That Inspires",
      pt: "Conservacao que Inspira",
    },
    sub: {
      es: "Los Esteros del Ibera son el segundo humedal mas grande de Sudamerica y uno de los proyectos de rewilding mas ambiciosos del mundo.",
      en: "The Ibera Wetlands are the second-largest wetland in South America and one of the most ambitious rewilding projects in the world.",
      pt: "Os Esteros del Ibera sao o segundo maior pantanal da America do Sul e um dos projetos de rewilding mais ambiciosos do mundo.",
    },
    stats: [
      {
        icon: TreePine,
        value: "1.300.000",
        label: { es: "hectareas protegidas", en: "protected hectares", pt: "hectares protegidos" },
      },
      {
        icon: Bird,
        value: "350+",
        label: { es: "especies de aves", en: "bird species", pt: "especies de aves" },
      },
      {
        icon: Droplets,
        value: "60+",
        label: { es: "lagunas y esteros", en: "lagoons & wetlands", pt: "lagoas e pantanais" },
      },
      {
        icon: Shield,
        value: "100%",
        label: { es: "turismo responsable", en: "responsible tourism", pt: "turismo responsavel" },
      },
    ],
  },

  packages: {
    label: { es: "Experiencias", en: "Experiences", pt: "Experiencias" },
    heading: {
      es: "Elegi la experiencia que mejor se adapte a vos",
      en: "Choose the experience that suits you best",
      pt: "Escolha a experiencia que melhor se adapta a voce",
    },
    sub: {
      es: "Cada paquete esta disenado para ofrecer una conexion genuina con los Esteros del Ibera, respetando el entorno natural y las comunidades locales.",
      en: "Each package is designed to offer a genuine connection with the Ibera Wetlands, respecting the natural environment and local communities.",
      pt: "Cada pacote foi projetado para oferecer uma conexao genuina com os Esteros del Ibera, respeitando o ambiente natural e as comunidades locais.",
    },
    featured: { es: "Mas elegido", en: "Most popular", pt: "Mais escolhido" },
    cta: { es: "Reservar Ahora", en: "Book Now", pt: "Reservar Agora" },
    perPerson: { es: "ARS / persona", en: "ARS / person", pt: "ARS / pessoa" },
    items: [
      {
        name: { es: "Esencia", en: "Essence", pt: "Esencia" },
        duration: { es: "1 dia", en: "1 day", pt: "1 dia" },
        price: "$45.000",
        description: {
          es: "Una jornada completa para descubrir los paisajes y la fauna mas emblematica de los Esteros del Ibera.",
          en: "A full day to discover the most iconic landscapes and wildlife of the Ibera Wetlands.",
          pt: "Uma jornada completa para descobrir as paisagens e a fauna mais emblematica dos Esteros del Ibera.",
        },
        includes: {
          es: ["Navegacion guiada por las lagunas", "Avistaje de fauna silvestre", "Almuerzo regional incluido", "Caminata interpretativa por senderos", "Material informativo y binoculares", "Guia guardaparques durante todo el dia"],
          en: ["Guided boat ride through the lagoons", "Wildlife watching", "Regional lunch included", "Interpretive trail walk", "Informational material and binoculars", "Park ranger guide all day"],
          pt: ["Navegacao guiada pelas lagoas", "Avistamento de fauna silvestre", "Almoco regional incluido", "Caminhada interpretativa por trilhas", "Material informativo e binoculos", "Guia guarda-parques durante todo o dia"],
        },
      },
      {
        name: { es: "Inmersion", en: "Immersion", pt: "Imersao" },
        duration: { es: "2 dias / 1 noche", en: "2 days / 1 night", pt: "2 dias / 1 noite" },
        price: "$85.000",
        description: {
          es: "Una experiencia mas profunda para conectar con el humedal, su biodiversidad y su magia al amanecer y al atardecer.",
          en: "A deeper experience to connect with the wetland, its biodiversity, and its magic at sunrise and sunset.",
          pt: "Uma experiencia mais profunda para conectar com o pantanal, sua biodiversidade e sua magia ao amanhecer e ao entardecer.",
        },
        includes: {
          es: ["Todo lo incluido en el plan Esencia", "Navegacion al amanecer o atardecer", "Avistaje nocturno de fauna", "Alojamiento en posada local", "Desayuno y cena regional", "Charla sobre conservacion y rewilding", "Traslados internos"],
          en: ["Everything in the Essence plan", "Sunrise or sunset boat ride", "Night wildlife watching", "Local inn accommodation", "Regional breakfast and dinner", "Conservation and rewilding talk", "Internal transfers"],
          pt: ["Tudo incluido no plano Essencia", "Navegacao ao amanhecer ou entardecer", "Avistamento noturno de fauna", "Hospedagem em pousada local", "Cafe da manha e jantar regional", "Palestra sobre conservacao e rewilding", "Traslados internos"],
        },
        featured: true,
      },
      {
        name: { es: "Expedicion", en: "Expedition", pt: "Expedicao" },
        duration: { es: "3 dias / 2 noches", en: "3 days / 2 nights", pt: "3 dias / 2 noites" },
        price: "$120.000",
        description: {
          es: "La experiencia completa para quienes quieren vivir Ibera en toda su dimension: fauna, paisajes, cultura y conservacion.",
          en: "The complete experience for those who want to live Ibera in all its dimensions: wildlife, landscapes, culture, and conservation.",
          pt: "A experiencia completa para quem quer viver Ibera em toda sua dimensao: fauna, paisagens, cultura e conservacao.",
        },
        includes: {
          es: ["Todo lo incluido en el plan Inmersion", "Visita al Centro de Reintroduccion de Especies", "Cabalgata o paseo en kayak", "Encuentro con la comunidad local", "Pension completa con gastronomia regional", "Registro fotografico de la experiencia", "Certificado de participacion en turismo responsable"],
          en: ["Everything in the Immersion plan", "Visit to the Species Reintroduction Center", "Horseback ride or kayak trip", "Meeting with the local community", "Full board with regional cuisine", "Photographic record of the experience", "Responsible tourism participation certificate"],
          pt: ["Tudo incluido no plano Imersao", "Visita ao Centro de Reintroducao de Especies", "Cavalgada ou passeio de caiaque", "Encontro com a comunidade local", "Pensao completa com gastronomia regional", "Registro fotografico da experiencia", "Certificado de participacao en turismo responsavel"],
        },
      },
    ],
  },

  map: {
    label: { es: "Mapa Interactivo", en: "Interactive Map", pt: "Mapa Interativo" },
    heading: { es: "Portales de acceso al Iberá", en: "Access Portals to the Iberá", pt: "Portais de acesso ao Iberá" },
    subheading: {
      es: "Los Esteros del Iberá cuentan con múltiples portales de acceso distribuidos en la provincia de Corrientes. Explorá cada uno para conocer sus características.",
      en: "The Iberá Wetlands have multiple access portals distributed across Corrientes Province. Explore each one to discover its features.",
      pt: "Os Esteros del Iberá possuem múltiplos portais de acesso distribuídos na província de Corrientes. Explore cada um para conhecer suas características.",
    },
    hoverHint: {
      es: "Pasá el cursor sobre cada punto para ver información del portal",
      en: "Hover over each point to see portal information",
      pt: "Passe o cursor sobre cada ponto para ver informações do portal",
    },
    selectPortal: { es: "Seleccioná un portal", en: "Select a portal", pt: "Selecione um portal" },
    selectPortalDesc: {
      es: "Hacé clic o pasá el cursor sobre los puntos del mapa para descubrir los distintos accesos a los Esteros del Iberá.",
      en: "Click or hover over the dots on the map to discover the different access points to the Iberá Wetlands.",
      pt: "Clique ou passe o cursor sobre os pontos do mapa para descobrir os diferentes acessos aos Esteros del Iberá.",
    },
    askAccess: { es: "Consultar acceso", en: "Ask about access", pt: "Consultar acesso" },
    portals: [
      {
        id: "cambyreta",
        name: { es: "Portal Cambyretá", en: "Cambyretá Portal", pt: "Portal Cambyretá" },
        description: {
          es: "Acceso noreste con senderos interpretativos, avistaje de fauna acuática y recorridos en lancha por los esteros.",
          en: "Northeast access with interpretive trails, aquatic wildlife watching, and boat tours through the wetlands.",
          pt: "Acesso nordeste com trilhas interpretativas, observação de fauna aquática e passeios de barco pelos esteros.",
        },
        x: 68, y: 18,
      },
      {
        id: "san-antonio",
        name: { es: "Portal San Antonio", en: "San Antonio Portal", pt: "Portal San Antonio" },
        description: {
          es: "Punto de acceso central con navegaciones guiadas, observación de aves y atardeceres sobre la laguna.",
          en: "Central access point with guided boat tours, birdwatching, and sunset views over the lagoon.",
          pt: "Ponto de acesso central com navegações guiadas, observação de aves e pôr do sol sobre a lagoa.",
        },
        x: 50, y: 27,
      },
      {
        id: "san-nicolas",
        name: { es: "Portal San Nicolás", en: "San Nicolás Portal", pt: "Portal San Nicolás" },
        description: {
          es: "Acceso este, ideal para explorar lagunas interiores y realizar safaris fotográficos de fauna silvestre.",
          en: "Eastern access, ideal for exploring interior lagoons and wildlife photo safaris.",
          pt: "Acesso leste, ideal para explorar lagoas interiores e realizar safáris fotográficos de fauna silvestre.",
        },
        x: 58, y: 35,
      },
      {
        id: "carambola",
        name: { es: "Portal Carambola", en: "Carambola Portal", pt: "Portal Carambola" },
        description: {
          es: "Portal oeste con monte nativo, senderos de selva y acceso a lagunas rodeadas de palmares.",
          en: "Western portal with native forest, jungle trails, and access to lagoons surrounded by palm groves.",
          pt: "Portal oeste com mata nativa, trilhas de selva e acesso a lagoas cercadas por palmeiras.",
        },
        x: 28, y: 42,
      },
      {
        id: "laguna-ibera",
        name: { es: "Portal Laguna Iberá", en: "Laguna Iberá Portal", pt: "Portal Laguna Iberá" },
        description: {
          es: "Vista directa a la Laguna Iberá, la más grande del sistema. Navegaciones, kayak y senderismo interpretativo.",
          en: "Direct view of Laguna Iberá, the largest in the system. Boat tours, kayaking, and interpretive hiking.",
          pt: "Vista direta da Laguna Iberá, a maior do sistema. Navegações, caiaque e caminhadas interpretativas.",
        },
        x: 54, y: 48,
      },
      {
        id: "uguay",
        name: { es: "Portal Uguay", en: "Uguay Portal", pt: "Portal Uguay" },
        description: {
          es: "Portal sur con paisajes de palmares y pastizales, turismo rural y acceso al Rincón del Socorro.",
          en: "Southern portal with palm groves and grassland landscapes, rural tourism, and access to Rincón del Socorro.",
          pt: "Portal sul com paisagens de palmeiras e pastagens, turismo rural e acesso ao Rincón del Socorro.",
        },
        x: 44, y: 55,
      },
    ],
  },

  travelTips: {
    label: { es: "Planifica tu Viaje", en: "Plan Your Trip", pt: "Planeje sua Viagem" },
    heading: { es: "Informacion practica para tu visita", en: "Practical Information for Your Visit", pt: "Informacoes praticas para sua visita" },
    subheading: {
      es: "Todo lo que necesitas saber antes de viajar a los Esteros del Ibera. Planifica con anticipacion para disfrutar al maximo tu experiencia.",
      en: "Everything you need to know before traveling to the Ibera Wetlands. Plan ahead to make the most of your experience.",
      pt: "Tudo o que voce precisa saber antes de viajar aos Esteros del Ibera. Planeje com antecedencia para aproveitar ao maximo sua experiencia.",
    },
    categories: [
      {
        icon: Plane,
        title: { es: "Como llegar", en: "How to Get There", pt: "Como Chegar" },
        items: {
          es: [
            "El acceso principal es por Colonia Carlos Pellegrini, a 120 km de Mercedes (Corrientes).",
            "Vuelos nacionales llegan al Aeropuerto de Corrientes o Resistencia. Desde ahi, se puede alquilar auto o tomar transfer.",
            "Desde Buenos Aires, hay micros directos a Mercedes (aprox. 8 hs). Desde Mercedes, son 120 km por ruta de ripio en buen estado.",
            "Tambien se puede acceder desde Ituzaingo (portal norte) o desde Concepcion del Yaguarete Cora.",
            "Recomendamos vehiculo alto (camioneta o SUV) para los caminos rurales, especialmente en epoca de lluvias.",
          ],
          en: [
            "The main access is through Colonia Carlos Pellegrini, 120 km from Mercedes (Corrientes).",
            "Domestic flights arrive at Corrientes or Resistencia airports. From there, you can rent a car or book a transfer.",
            "From Buenos Aires, direct buses go to Mercedes (approx. 8 hrs). From Mercedes, it is 120 km on a well-maintained gravel road.",
            "You can also access from Ituzaingo (northern portal) or from Concepcion del Yaguarete Cora.",
            "We recommend a high-clearance vehicle (pickup or SUV) for rural roads, especially during the rainy season.",
          ],
          pt: [
            "O acesso principal e por Colonia Carlos Pellegrini, a 120 km de Mercedes (Corrientes).",
            "Voos domesticos chegam ao Aeroporto de Corrientes ou Resistencia. De la, voce pode alugar um carro ou contratar transfer.",
            "Desde Buenos Aires, ha onibus diretos ate Mercedes (aprox. 8 hrs). De Mercedes, sao 120 km por estrada de cascalho em bom estado.",
            "Tambem e possivel acessar por Ituzaingo (portal norte) ou por Concepcion del Yaguarete Cora.",
            "Recomendamos veiculo alto (caminhonete ou SUV) para as estradas rurais, especialmente na epoca de chuvas.",
          ],
        },
      },
      {
        icon: Calendar,
        title: { es: "Mejor epoca para visitar", en: "Best Time to Visit", pt: "Melhor Epoca para Visitar" },
        items: {
          es: [
            "La mejor epoca es de abril a noviembre (otono, invierno y primavera), con temperaturas agradables y menos mosquitos.",
            "El invierno (junio-agosto) es ideal: clima seco, cielos despejados y fauna muy activa.",
            "La primavera (septiembre-noviembre) ofrece flora en maxima expresion y crias de muchas especies.",
            "El verano (diciembre-marco) es caluroso y humedo, con lluvias frecuentes, pero el paisaje esta exuberante.",
            "Consulta siempre el estado de los caminos antes de viajar en epoca de lluvias.",
          ],
          en: [
            "The best time is April to November (autumn, winter, and spring), with pleasant temperatures and fewer mosquitoes.",
            "Winter (June-August) is ideal: dry climate, clear skies, and very active wildlife.",
            "Spring (September-November) offers flora at its peak and offspring of many species.",
            "Summer (December-March) is hot and humid with frequent rains, but the landscape is lush.",
            "Always check road conditions before traveling during the rainy season.",
          ],
          pt: [
            "A melhor epoca e de abril a novembro (outono, inverno e primavera), com temperaturas agradaveis e menos mosquitos.",
            "O inverno (junho-agosto) e ideal: clima seco, ceus limpos e fauna muito ativa.",
            "A primavera (setembro-novembro) oferece flora em sua maxima expressao e filhotes de muitas especies.",
            "O verao (dezembro-marco) e quente e umido com chuvas frequentes, mas a paisagem e exuberante.",
            "Consulte sempre o estado das estradas antes de viajar na epoca de chuvas.",
          ],
        },
      },
      {
        icon: Backpack,
        title: { es: "Que llevar", en: "What to Bring", pt: "O que Levar" },
        items: {
          es: [
            "Ropa comoda y liviana en capas. Las mananas y noches pueden ser frescas, incluso en verano.",
            "Protector solar de alto factor, sombrero y lentes de sol.",
            "Repelente de insectos (fundamental, especialmente en primavera y verano).",
            "Calzado cerrado y comodo, idealmente botas de trekking impermeables.",
            "Binoculares si tenes (si no, los proporcionamos). Camara fotografica con buen zoom.",
            "Botella reutilizable para agua. Compromiso con el medio ambiente.",
          ],
          en: [
            "Comfortable, lightweight layered clothing. Mornings and evenings can be cool, even in summer.",
            "High-SPF sunscreen, hat, and sunglasses.",
            "Insect repellent (essential, especially in spring and summer).",
            "Closed, comfortable footwear, ideally waterproof trekking boots.",
            "Binoculars if you have them (otherwise we provide them). Camera with good zoom.",
            "Reusable water bottle. Commitment to the environment.",
          ],
          pt: [
            "Roupas confortaveis e leves em camadas. As manhas e noites podem ser frescas, mesmo no verao.",
            "Protetor solar de alto fator, chapeu e oculos de sol.",
            "Repelente de insetos (fundamental, especialmente na primavera e verao).",
            "Calcado fechado e confortavel, idealmente botas de trekking impermeaveis.",
            "Binoculos se voce tiver (caso contrario, nos fornecemos). Camera fotografica com bom zoom.",
            "Garrafa reutilizavel para agua. Compromisso com o ambiente.",
          ],
        },
      },
      {
        icon: Cloud,
        title: { es: "Clima y condiciones", en: "Weather & Conditions", pt: "Clima e Condicoes" },
        items: {
          es: [
            "Clima subtropical humedo con temperaturas de 10 C a 35 C segun la estacion.",
            "Las lluvias son mas frecuentes entre octubre y marzo. Los caminos pueden volverse intransitables.",
            "En invierno, las heladas son posibles pero poco frecuentes. Llevar abrigo para navegaciones al amanecer.",
            "La humedad es alta todo el ano. La sensacion termica puede ser mayor a la temperatura real.",
            "Siempre verificar el pronostico antes de salir. Las tormentas subtropicales pueden ser intensas pero breves.",
          ],
          en: [
            "Humid subtropical climate with temperatures from 10 C to 35 C depending on the season.",
            "Rains are more frequent between October and March. Roads can become impassable.",
            "In winter, frosts are possible but infrequent. Bring warm layers for sunrise boat rides.",
            "Humidity is high year-round. The wind chill can feel higher than the actual temperature.",
            "Always check the forecast before heading out. Subtropical storms can be intense but brief.",
          ],
          pt: [
            "Clima subtropical umido com temperaturas de 10 C a 35 C dependendo da estacao.",
            "As chuvas sao mais frequentes entre outubro e marco. As estradas podem ficar intransitaveis.",
            "No inverno, geadas sao possiveis mas pouco frequentes. Leve agasalho para navegacoes ao amanhecer.",
            "A umidade e alta durante todo o ano. A sensacao termica pode ser maior que a temperatura real.",
            "Sempre verifique a previsao antes de sair. As tempestades subtropicais podem ser intensas mas breves.",
          ],
        },
      },
      {
        icon: ShieldCheck,
        title: { es: "Seguridad y recomendaciones", en: "Safety & Recommendations", pt: "Seguranca e Recomendacoes" },
        items: {
          es: [
            "Siempre respetar las indicaciones de la guia. La fauna silvestre debe observarse a distancia segura.",
            "No alimentar ni tocar a los animales. Es fundamental para su bienestar y para tu seguridad.",
            "Mantenerse en los senderos marcados y no alejarse del grupo.",
            "Llevar un botiquin basico con antihistaminicos, analgesicos y curitas.",
            "En caso de emergencia, la localidad mas cercana con centro de salud es Mercedes o Ituzaingo.",
          ],
          en: [
            "Always follow the guide's instructions. Wildlife must be observed from a safe distance.",
            "Do not feed or touch animals. It is essential for their well-being and your safety.",
            "Stay on marked trails and do not wander away from the group.",
            "Bring a basic first-aid kit with antihistamines, painkillers, and bandages.",
            "In case of emergency, the nearest town with a health center is Mercedes or Ituzaingo.",
          ],
          pt: [
            "Sempre respeite as orientacoes da guia. A fauna silvestre deve ser observada a distancia segura.",
            "Nao alimente nem toque os animais. E fundamental para o bem-estar deles e para sua seguranca.",
            "Permaneca nas trilhas marcadas e nao se afaste do grupo.",
            "Leve um kit basico de primeiros socorros com anti-histaminicos, analgesicos e curativos.",
            "Em caso de emergencia, a localidade mais proxima com centro de saude e Mercedes ou Ituzaingo.",
          ],
        },
      },
      {
        icon: Compass,
        title: { es: "Recomendaciones generales", en: "General Recommendations", pt: "Recomendacoes Gerais" },
        items: {
          es: [
            "Reserva tu experiencia con anticipacion, especialmente en temporada alta (julio-septiembre).",
            "Si viajas desde el exterior, asegura tu cobertura medica para zonas rurales.",
            "No hay cajeros automaticos en Colonia Carlos Pellegrini. Lleva efectivo suficiente o consulta medios de pago.",
            "La senal de telefono es limitada. Aprovechar para desconectar y vivir la experiencia plenamente.",
            "Respeta el entorno: no dejes residuos, no arranques plantas, lleva tu basura de vuelta.",
            "Consulta conmigo cualquier duda antes de viajar. Estoy para ayudarte a planificar la mejor experiencia.",
          ],
          en: [
            "Book your experience in advance, especially during peak season (July-September).",
            "If traveling from abroad, ensure medical coverage for rural areas.",
            "There are no ATMs in Colonia Carlos Pellegrini. Bring enough cash or ask about payment methods.",
            "Phone signal is limited. Take the opportunity to disconnect and fully enjoy the experience.",
            "Respect the environment: leave no waste, do not pull plants, take your trash back with you.",
            "Ask me any questions before traveling. I am here to help you plan the best experience.",
          ],
          pt: [
            "Reserve sua experiencia com antecedencia, especialmente na temporada alta (julho-setembro).",
            "Se voce viaja do exterior, garanta cobertura medica para areas rurais.",
            "Nao ha caixas eletronicos em Colonia Carlos Pellegrini. Leve dinheiro suficiente ou consulte meios de pagamento.",
            "O sinal de telefone e limitado. Aproveite para desconectar e viver a experiencia plenamente.",
            "Respeite o ambiente: nao deixe residuos, nao arranque plantas, leve seu lixo de volta.",
            "Consulte-me sobre qualquer duvida antes de viajar. Estou aqui para ajudar voce a planejar a melhor experiencia.",
          ],
        },
      },
    ],
  },

  hotels: {
    label: { es: "Alojamiento", en: "Accommodation", pt: "Hospedagem" },
    heading: { es: "Alojamientos recomendados", en: "Recommended Accommodations", pt: "Hospedagens recomendadas" },
    sub: {
      es: "Seleccione los mejores alojamientos de la zona para que tu estadia sea tan especial como la experiencia en los Esteros.",
      en: "I selected the best accommodations in the area so your stay is as special as the Wetlands experience.",
      pt: "Selecionei as melhores hospedagens da regiao para que sua estadia seja tao especial quanto a experiencia nos Esteros.",
    },
    moreInfo: { es: "Mas informacion", en: "More information", pt: "Mais informacoes" },
    items: [
      {
        name: "Aguape Lodge",
        image: "/images/hotel-lodge.jpg",
        location: "Colonia Carlos Pellegrini",
        description: {
          es: "Lodge boutique con vista directa a la laguna Ibera. Arquitectura en madera, gastronomia regional y un compromiso genuino con la sustentabilidad.",
          en: "Boutique lodge with direct views of Laguna Ibera. Wooden architecture, regional cuisine, and a genuine commitment to sustainability.",
          pt: "Lodge boutique com vista direta para a lagoa Ibera. Arquitetura em madeira, gastronomia regional e um compromisso genuino com a sustentabilidade.",
        },
        rating: "4.8",
        priceRange: "$$$$",
      },
      {
        name: "Posada de la Laguna",
        image: "/images/hotel-posada.jpg",
        location: "Colonia Carlos Pellegrini",
        description: {
          es: "Una posada encantadora con jardines nativos, habitaciones amplias y un ambiente calido. Ideal para quienes buscan descanso y conexion con la naturaleza.",
          en: "A charming inn with native gardens, spacious rooms, and a warm atmosphere. Ideal for those seeking rest and connection with nature.",
          pt: "Uma pousada encantadora com jardins nativos, quartos amplos e um ambiente acolhedor. Ideal para quem busca descanso e conexao com a natureza.",
        },
        rating: "4.6",
        priceRange: "$$$",
      },
      {
        name: "Cabanas del Estero",
        image: "/images/hotel-cabin.jpg",
        location: "Colonia Carlos Pellegrini",
        description: {
          es: "Cabanas independientes rodeadas de vegetacion nativa. Una opcion mas intima y accesible, perfecta para familias y grupos pequenos.",
          en: "Independent cabins surrounded by native vegetation. A more intimate and affordable option, perfect for families and small groups.",
          pt: "Cabanas independentes rodeadas de vegetacao nativa. Uma opcao mais intima e acessivel, perfeita para familias e grupos pequenos.",
        },
        rating: "4.5",
        priceRange: "$$",
      },
    ],
  },

  reviews: {
    label: { es: "Testimonios", en: "Testimonials", pt: "Depoimentos" },
    heading: {
      es: "Lo que dicen quienes vivieron la experiencia",
      en: "What those who lived the experience say",
      pt: "O que dizem aqueles que viveram a experiencia",
    },
    items: [
      {
        name: "Martina Aguero",
        location: "Buenos Aires, Argentina",
        text: {
          es: "Una experiencia transformadora. La dedicacion y el conocimiento de la guia nos hicieron sentir la inmensidad de los Esteros de una forma que jamas imaginamos. Vimos carpinchos, yacares y aves increibles. Volveria sin dudarlo.",
          en: "A transformative experience. The guide's dedication and knowledge made us feel the immensity of the Wetlands in a way we never imagined. We saw capybaras, caimans, and incredible birds. I would return without hesitation.",
          pt: "Uma experiencia transformadora. A dedicacao e o conhecimento da guia nos fizeram sentir a imensidao dos Esteros de uma forma que jamais imaginamos. Vimos capivaras, jacares e aves incriveis. Voltaria sem hesitar.",
        },
        rating: 5,
      },
      {
        name: "Lucas Fernandez",
        location: "Rosario, Argentina",
        text: {
          es: "Hicimos el plan de 2 dias y fue espectacular. El avistaje nocturno fue algo que nunca voy a olvidar. Todo estuvo perfectamente organizado y la atencion fue impecable.",
          en: "We did the 2-day plan and it was spectacular. The night wildlife watching was something I will never forget. Everything was perfectly organized and the service was impeccable.",
          pt: "Fizemos o plano de 2 dias e foi espetacular. O avistamento noturno foi algo que nunca vou esquecer. Tudo esteve perfeitamente organizado e o atendimento foi impecavel.",
        },
        rating: 5,
      },
      {
        name: "Sophie Durand",
        location: "Lyon, France",
        text: {
          es: "Como fotografa de vida silvestre, esta fue una de las mejores experiencias guiadas que he tenido. El conocimiento de la guia sobre el comportamiento animal fue extraordinario. Los humedales al amanecer fueron impresionantes.",
          en: "As a wildlife photographer, this was one of the best guided experiences I have ever had. The ranger's knowledge of animal behavior was extraordinary. The wetlands at sunrise were breathtaking.",
          pt: "Como fotografa de vida selvagem, esta foi uma das melhores experiencias guiadas que ja tive. O conhecimento da guia sobre o comportamento animal foi extraordinario. Os pantanais ao amanhecer foram impressionantes.",
        },
        rating: 5,
      },
      {
        name: "Carlos Mendez",
        location: "Montevideo, Uruguay",
        text: {
          es: "Viajamos en familia y todos quedamos maravillados. La charla sobre conservacion y el contacto con la comunidad local le dieron un valor especial al viaje. Una forma autentica de hacer turismo.",
          en: "We traveled as a family and we were all amazed. The conservation talk and contact with the local community gave special value to the trip. An authentic way to experience tourism.",
          pt: "Viajamos em familia e todos ficamos maravilhados. A palestra sobre conservacao e o contato com a comunidade local deram um valor especial a viagem. Uma forma autentica de fazer turismo.",
        },
        rating: 5,
      },
    ],
  },

  contact: {
    label: { es: "Contacto", en: "Contact", pt: "Contato" },
    heading: {
      es: "Planifica tu proxima aventura",
      en: "Plan your next adventure",
      pt: "Planeje sua proxima aventura",
    },
    sub: {
      es: "Escribime para consultar disponibilidad, armar un itinerario a medida o resolver cualquier duda sobre la experiencia en los Esteros.",
      en: "Write to me to check availability, create a custom itinerary, or resolve any questions about the Wetlands experience.",
      pt: "Escreva-me para consultar disponibilidade, montar um roteiro personalizado o resolver qualquer duvida sobre a experiencia nos Esteros.",
    },
    emailLabel: { es: "Email", en: "Email", pt: "Email" },
    whatsappLabel: { es: "WhatsApp", en: "WhatsApp", pt: "WhatsApp" },
    locationLabel: { es: "Ubicacion", en: "Location", pt: "Localizacao" },
    waCta: { es: "Escribime por WhatsApp", en: "Message me on WhatsApp", pt: "Escreva-me pelo WhatsApp" },
    form: {
      name: { es: "Nombre completo", en: "Full name", pt: "Nome completo" },
      namePh: { es: "Tu nombre", en: "Your name", pt: "Seu nombre" },
      email: { es: "Email", en: "Email", pt: "Email" },
      package: { es: "Experiencia de interes", en: "Experience of interest", pt: "Experiencia de interesse" },
      packagePh: { es: "Selecciona una experiencia", en: "Select an experience", pt: "Selecione uma experiencia" },
      dates: { es: "Fechas estimadas", en: "Estimated dates", pt: "Datas estimadas" },
      datesPh: { es: "Ej: 15-18 de marzo 2026", en: "E.g.: March 15-18, 2026", pt: "Ex: 15-18 de marco 2026" },
      message: { es: "Mensaje", en: "Message", pt: "Mensagem" },
      messagePh: {
        es: "Contame que te gustaria saber o como te puedo ayudar...",
        en: "Tell me what you would like to know or how I can help...",
        pt: "Conte-me o que gostaria de saber ou como posso ajudar...",
      },
      submit: { es: "Enviar Consulta", en: "Send Inquiry", pt: "Enviar Consulta" },
    },
    success: {
      title: { es: "Mensaje enviado", en: "Message sent", pt: "Mensagem enviada" },
      message: {
        es: "Gracias por tu consulta. Te respondere a la brevedad.",
        en: "Thank you for your inquiry. I will respond shortly.",
        pt: "Obrigado pela sua consulta. Responderei em breve.",
      },
    },
  },

  footer: {
    navLabel: { es: "Navegacion", en: "Navigation", pt: "Navegacao" },
    commitmentLabel: { es: "Compromiso Ambiental", en: "Environmental Commitment", pt: "Compromisso Ambiental" },
    commitmentText: {
      es: "Cada experiencia contribuye directamente a la conservacion del ecosistema de los Esteros del Ibera y al desarrollo sustentable de las comunidades locales.",
      en: "Each experience directly contributes to the conservation of the Ibera Wetlands ecosystem and the sustainable development of local communities.",
      pt: "Cada experiencia contribui diretamente para a conservacao do ecossistema dos Esteros del Ibera e o desenvolvimento sustentavel das comunidades locais.",
    },
    tagline: {
      es: "Experiencias guiadas de naturaleza y conservacion en los Esteros del Ibera, Corrientes, Argentina.",
      en: "Guided nature and conservation experiences in the Ibera Wetlands, Corrientes, Argentina.",
      pt: "Experiencias guiadas de natureza e conservacao nos Esteros del Ibera, Corrientes, Argentina.",
    },
    rights: {
      es: "Turismo Responsable. Todos los derechos reservados.",
      en: "Responsible Tourism. All rights reserved.",
      pt: "Turismo Responsavel. Todos os direitos reservados.",
    },
    socials: [
      { icon: SiInstagram, href: "https://instagram.com/esterosdibera", label: "Instagram" },
      { icon: SiWhatsapp, href: "https://wa.me/5493773000000", label: "WhatsApp" },
      { icon: SiFacebook, href: "https://facebook.com/esterosdibera", label: "Facebook" },
    ]
  }
}
