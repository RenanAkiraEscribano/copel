import "./infoPage.css";

import ParallaxSection from './ParallaxSection';
import Navbar from './NavBar';
import heroImage from '../../assets/hero.jpg';
import biomassImage from '../../assets/food.jpg';
import biodigesterImage from '../../assets/biogas.jpg';
import certificadoImage from '../../assets/certificado.jpg';
import syngasImage from '../../assets/syngas.jpg';
import psaImage from '../../assets/psa-system.jpg';
import fuelCellImage from '../../assets/fuel-cell.jpg';
import automationImage from '../../assets/automation-control.jpg';
import aiImage from '../../assets/ai-machine-learning.jpg';
import bike from '../../assets/bike.jpg';
import amonia from '../../assets/amonia.jpg';

import VideoMiniPlayer from "./VideoMiniPlayer";

export default function HydrogenProduction() {
  return (
    <div className="relative">
      <Navbar />
      {/* Hero Section */}
      <ParallaxSection
        id="hero"
        bgImage={heroImage}
        strength={0}
        className="pt-20"
      >
        <h1 className="section-title bg-gradient-primary">
          Projeto B2H2: Produção e Usos do Hidrogênio Renovável em Escala Piloto
        </h1>
        <p className="section-subtitle">
          OBTENÇÃO DE H<sub>2</sub> DE ALTA PUREZA, SEM USO DE ÁGUA E COM BAIXA EMISSÃO DE CARBONO, A PARTIR DE RESÍDUOS DE ALIMENTOS
        </p>
        <p className="section-description mt-6">
          Conheça o projeto B2H2 (Biogas-to-Hydrogen): a primeira planta piloto do Brasil dedicada à produção de hidrogênio renovável de alta pureza a partir do biogás de resíduos orgânicos, em um processo inovador que dispensa o uso de água e minimiza a pegada de carbono.
          O sistema integra módulos avançados — conversão termoquímica, purificação via PSA, armazenamento, e conversão em eletricidade por Células a Combustível — com aplicações demonstrativas em Amônia e Mobilidade Urbana. Toda a operação é controlada por um sistema de automação com apoio de Inteligência Artificial na gestão de dados e otimização dos processos.
        </p>
      </ParallaxSection>
      <VideoMiniPlayer />
      {/* Biomass Section */}
      <ParallaxSection
        id="biomassa"
        bgImage={biomassImage}
        strength={0}
      >
        <h2 className="section-title text-secondary">
          Origem da Biomassa
        </h2>
        <p className="section-description">
          O Restaurante Universitário (RU) da UFPR atende toda a comunidade universitária, e serve diariamente cerca de 14.000 refeições, entre café da manhã, almoço e jantar, no modelo self-service. O grande volume de refeições acaba gerando certa quantidade de resíduos orgânicos (alimentos) com potencial para a produção de biogás. A planta piloto - B2H2, recebe parte destes resíduos devidamente processados para conversão em biogás por meio da biodigestão anaeróbia.
        </p>
      </ParallaxSection>

      {/* Biodigester Section */}
      <ParallaxSection
        id="biodigestor"
        bgImage={biodigesterImage}
        strength={0}
      >
        <h2 className="section-title text-primary">
          Biodigestão Anaeróbia - Biogás
        </h2>
        <p className="section-description">
          Os resíduos de alimentos do RU são submetidos ao processo de biodigestão anaeróbia, que compreende ciclos fundamentais como hidrólise, acidogênese,
          acetogênese e metanogênese, gerando o biogás, um recurso energético amplamente
          empregado como insumo para a produção de energia que consiste, principalmente, na mistura de metano (CH4) e dióxido de carbono (CO2).
        </p>
      </ParallaxSection>

      {/* Syngas Section */}
      <ParallaxSection
        id="syngas"
        bgImage={syngasImage}
        strength={0}
      >
        <h2 className="section-title text-accent">
          Produção de Syngas
        </h2>
        <p className="section-description">
          O biogás (mistura de CH4 e CO2) é submetido a um processo termoquímico a 800 oC na presença de um catalisador, desenvolvido exclusivamente para o projeto B2H2, capaz de convertê-lo em syngas (gás de síntese), que consiste em um mistura gasosa de hidrogênio (H2) e monóxido de carbo o (CO). O syngas que se caracteriza como matéria prima para a produção de vários produtos de interesse industrial (metanol, BioQAv, etc) ou para o fornecimento do hidrogênio, quando este é separado e purificado.
        </p>
      </ParallaxSection>

      {/* PSA Section */}
      <ParallaxSection
        id="psa"
        bgImage={psaImage}
        strength={0}
      >
        <h2 className="section-title text-secondary">
          Hidrogênio Renovável de Alta Pureza
        </h2>
        <p className="section-description">
          O processo de Pressure Swing Adsorption (PSA) garante a purificação do hidrogênio,
          removendo impurezas e concentrando H₂ para uso em células a combustível.
        </p>
      </ParallaxSection>

      {/* Fuel Cell Section */}
      <ParallaxSection
        id="fuelcell"
        bgImage={fuelCellImage}
        strength={0}
      >
        <h2 className="section-title text-primary">
          Célula a Combustível PEM
        </h2>
        <p className="section-description">
          O hidrogênio purificado é convertido em eletricidade através de células PEM (Proton Exchange Membrane), gerando energia elétrica sem emissões de poluentes.
        </p>
      </ParallaxSection>

      {/* Amonia */}
      <ParallaxSection
        id="amonia"
        bgImage={amonia}
        strength={0}
      >
        <h2 className="section-title text-primary">
          Amonia Renovável
        </h2>
        <p className="section-description">
          O hidrogênio de alta pureza produzido na planta B2H2 é um insumo essencial para a síntese da Amônia (NH3) Renovável. A Amônia é um dos principais vetores de energia junto ao hidrogênio. A Amônia renovável é crucial para a descarbonização de setores como a agricultura (fertilizantes) e o transporte marítimo (combustível), e o projeto B2H2 demonstra como o hidrogênio renovável, obtido de resíduos orgânicos, pode alimentar essa importante cadeia de valor industrial, promovendo uma economia circular e sustentável.        </p>
      </ParallaxSection>

      {/* Hydrogen Bike */}
      <ParallaxSection
        id="bike"
        bgImage={bike}
        strength={0}
      >
        <h2 className="section-title text-primary">
          Mobilidade Sustentável com Bicicleta Elétrica
        </h2>
        <p className="section-description">
          O projeto B2H2 não se limita à produção de hidrogênio; ele também demonstra seu uso final em aplicações práticas, promovendo a mobilidade urbana sustentável dentro do campus.
          Esta aplicação ilustra de forma tangível como a tecnologia de conversão de resíduos em H2 e eletricidade pode ser integrada ao dia a dia, servindo como um modelo de estação de carregamento limpa e local que contribui para a redução da emissão de poluentes no transporte.
        </p>
      </ParallaxSection>

      {/* Automation Section */}
      <ParallaxSection
        id="automation"
        bgImage={automationImage}
        strength={0}
      >
        <h2 className="section-title text-accent">
          Processo Automatizado e Monitorado
        </h2>
        <p className="section-description">
          A planta B2H2 é instrumentada com sensores, válvulas, medidores e atuadores, comandados por um Controlador Lógico Programável (CLP). A comunicação com o nível de supervisão ocorre via Ethernet para um servidor de dados desenvolvido em linguagem Python, responsável pela aquisição, validação e registro das variáveis de processo em banco de dados MySQL. O monitoramento e o controle em tempo real são realizados por um sistema supervisório via Web, complementado por uma IHM local que oferece recursos para operação por especialistas.
        </p>
      </ParallaxSection>

      {/* AI/ML Section */}
      <ParallaxSection
        id="ml"
        bgImage={aiImage}
        strength={0}
      >
        <h2 className="section-title text-primary">
          Supervisão com apoio de Inteligência Artificial
        </h2>
        <p className="section-description">
          O sistema proposto integra um Sistema Especialista (SE) para recomendar ações de uso do equipamento e modelos de Aprendizado de Máquina (AM) para a identificação precoce de falhas, promovendo o uso adequado dos recursos, com economia e eficiência dos processos. A transmissão e persistência dos dados é uma inovação no contexto da reforma a seco, e representa a base para aplicações em Inteligência Artificial (IA), uma vez que não há IA sem dados de qualidade. Esses dados poderão ser aplicados em algoritmos de AM para geração de novos conhecimento e otimização dos processos.
        </p>
      </ParallaxSection>

      {/* Carbono/blockchain */}
      <ParallaxSection
        id="certificado"
        bgImage={certificadoImage}
        strength={0}
      >
        <h2 className="section-title text-primary">
          Metodologia de Certificação e Rastreabilidade para Hidrogênio de Baixo Carbono
        </h2>
        <p className="section-description">
          A principal contribuição está na proposição de uma metodologia robusta e transparente para certificar o hidrogênio de baixo carbono produzido via reforma a seco de resíduos alimentares. O projeto inclui o desenvolvimento de uma calculadora de pegada de carbono baseada nas normas ISO 14040, 14044 e 14067:2023, permitindo a avaliação consistente dos fluxos de entrada e saída do processo produtivo. A ferramenta é prática, auditável e adequada a aplicações técnicas e de certificação. O diferencial está na integração da metodologia com rastreabilidade digital via blockchain, possibilitando a emissão de certificados digitais de conformidade e assegurando a integridade e imutabilidade dos dados, fortalecendo a confiança de stakeholders e compradores de hidrogênio sustentável.
        </p>
      </ParallaxSection>
    </div>
  );
}