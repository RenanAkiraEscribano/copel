import "./infoPage.css";

import ParallaxSection from './ParallaxSection';
import Navbar from './NavBar';
import heroImage from '../../assets/hero.jpg';
import biomassImage from '../../assets/food.jpg';
import biodigesterImage from '../../assets/biogas.jpg';

//import syngasImage from '../../assets/syngas-production.jpg';
import syngasImage from '../../assets/syngas.jpg';
import psaImage from '../../assets/psa-system.jpg';
import fuelCellImage from '../../assets/fuel-cell.jpg';
import automationImage from '../../assets/automation-control.jpg';
import aiImage from '../../assets/ai-machine-learning.jpg';
import bike from '../../assets/bike.jpg';

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
          Planta Piloto de Produção de Hidrogênio
        </h1>
        <p className="section-subtitle">
          Uma parceria inovadora com a Copel
        </p>
        <p className="section-description mt-6">
          Tecnologia sustentável para conversão de biomassa em energia limpa através de processos industriais avançados
        </p>
      </ParallaxSection>

      {/* Biomass Section */}
      <ParallaxSection
        id="biomassa"
        bgImage={biomassImage}
        strength={300}
      >
        <h2 className="section-title text-secondary">
          Origem da Biomassa
        </h2>
        <p className="section-description">
          Resíduos do Restaurante Universitário são utilizados como matéria-prima sustentável, 
          promovendo economia circular e reduzindo desperdício de alimentos orgânicos.
        </p>
      </ParallaxSection>

      {/* Biodigester Section */}
      <ParallaxSection
        id="biodigestor"
        bgImage={biodigesterImage}
        strength={300}
      >
        <h2 className="section-title text-primary">
          Biodigestor
        </h2>
        <p className="section-description">
          Conversão da biomassa em biogás através de um processo biológico controlado. 
          Sistema anaeróbio otimizado para máxima eficiência na produção de metano e CO₂.
        </p>
      </ParallaxSection>

      {/* Syngas Section */}
      <ParallaxSection
        id="syngas"
        bgImage={syngasImage}
        strength={300}
      >
        <h2 className="section-title text-accent">
          Produção de Syngas
        </h2>
        <p className="section-description">
          O biogás é reformado para produzir Syngas (gás de síntese), composto principalmente 
          por hidrogênio (H₂) e monóxido de carbono (CO) através de reforma a vapor em alta temperatura.
        </p>
      </ParallaxSection>

      {/* PSA Section */}
      <ParallaxSection
        id="psa"
        bgImage={psaImage}
        strength={300}
      >
        <h2 className="section-title text-secondary">
          Obtenção de Hidrogênio de Alta Pureza
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
        strength={600}
      >
        <h2 className="section-title text-primary">
          Célula a Combustível PEM
        </h2>
        <p className="section-description">
          O hidrogênio purificado é convertido em eletricidade limpa através de células 
          PEM (Proton Exchange Membrane), gerando energia elétrica com alta eficiência.
        </p>
      </ParallaxSection>

      {/* Hydrogen Bike */}
      <ParallaxSection
        id="bike"
        bgImage={bike}
        strength={300}
      >
        <h2 className="section-title text-primary">
          Mobilidade Sustentável com Bicicleta Elétrica
        </h2>
        <p className="section-description">
          Texto
        </p>
      </ParallaxSection>

      {/* Automation Section */}
      <ParallaxSection
        id="automation"
        bgImage={automationImage}
        strength={300}
      >
        <h2 className="section-title text-accent">
          Processo Automatizado e Monitorado
        </h2>
        <p className="section-description">
          Toda a planta é supervisionada por sistemas SCADA integrados, garantindo 
          operação segura, eficiente e controle preciso de todos os parâmetros do processo.
        </p>
      </ParallaxSection>

      {/* AI/ML Section */}
      <ParallaxSection
        id="ml"
        bgImage={aiImage}
        strength={300}
      >
        <h2 className="section-title text-primary">
          Supervisão com apoio de Inteligência Artificial
        </h2>
        <p className="section-description">
          Algoritmos de machine learning analisam e otimizam a operação em tempo real, 
          prevendo falhas, maximizando eficiência e garantindo produção contínua de hidrogênio.
        </p>
      </ParallaxSection>
    </div>
  );
}