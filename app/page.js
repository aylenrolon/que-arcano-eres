"use client";

import { useState } from "react";

/* ============================================================
   BASE DE DATOS ESTÁTICA: 22 ARCANOS MAYORES
   (Numerados del 1 al 22 para encajar con el rango del algoritmo.
    El Loco, tradicionalmente el "0", se asigna aquí al 22)
   ============================================================ */
const ARCANOS = {
  1: {
    nombre: "El Mago",
    energia: "Voluntad y manifestación",
    descripcion:
      "Eres el canal directo entre el cielo y la tierra. El Mago representa el dominio absoluto de tus recursos internos y externos: tienes absolutamente todo lo que necesitas para manifestar tus ideas en el plano físico. Posees una mente brillante, gran capacidad de iniciativa y un magnetismo natural para iniciar proyectos desde cero. Tu mayor desafío y superpoder es alinear tu voluntad con un propósito claro, entendiendo que cada palabra que pronuncias y cada decisión que tomas es una herramienta de creación consciente. No esperas a que las cosas sucedan; las provocas con tu ingenio y tu agilidad mental.",
    imagen: "/images/mago.jpg",
  },
  2: {
    nombre: "La Sacerdotisa",
    energia: "Intuición y misterio",
    descripcion:
      "Guardiana de los grandes misterios del subconsciente, habitas el espacio sagrado entre lo visible y lo invisible. Posees una intuición prodigiosa y una capacidad innata para percibir la verdad profunda de las situaciones y de las personas mucho antes de que se expongan con palabras. No necesitas hacer ruido para imponerte; tu presencia transmite calma, profundidad y un conocimiento sutil que desconcierta y fascina. Tu mayor fortaleza reside en el silencio, la reflexión y la confianza ciega en tu voz interior. Eres el refugio donde las respuestas se gestan antes de salir a la luz.",
    imagen: "/images/sacerdotiza.jpg",
  },
  3: {
    nombre: "La Emperatriz",
    energia: "Abundancia, creación y liderazgo fértil.",
    descripcion:
      "Símbolo absoluto de la fertilidad, la naturaleza y la creatividad en su máxima expresión. Tu energía nutre, sostiene y hace florecer todo aquello en lo que pones tu atención y tu amor. Posees un talento innato para dar vida a proyectos, materializar la belleza a tu alrededor y ejercer un liderazgo magnético y generoso. Comprendes el valor del crecimiento constante y disfrutas de los frutos de tu propio esfuerzo con orgullo. Eres la fuerza creadora que armoniza la pasión con el disfrute de la vida.",
    imagen: "/images/emperatriz.jpg",
  },
  4: {
    nombre: "El Emperador",
    energia: "Orden, estructura y autoridad consciente.",
    descripcion:
      "Arquitecto de la realidad, representas la capacidad de construir cimientos sólidos y duraderos en un mundo caótico. Tienes una mente estructurada, un gran sentido de la disciplina y la firmeza necesaria para sostener responsabilidades y liderar equipos o proyectos con total solvencia. No te dejas llevar por impulsos pasajeros; analizas el terreno, planificas con estrategia y proteges con lealtad lo que has construido. Tu poder radica en el autocontrol, la estabilidad y la maestría para transformar el desorden en un sistema funcional.",
    imagen: "/images/emperador.jpg",
  },
5: {
    nombre: "El Sumo Sacerdote",
    energia: "Tradición, mentoría y guia espiritual.",
    descripcion: "El puente sagrado entre lo terrenal y lo divino. Posees una profunda vocación por el conocimiento, el estudio y la transmisión de saberes que aportan estructura y sentido al mundo. Te fascina descifrar sistemas, comprender las reglas profundas que rigen a las comunidades y actuar como un mentor o guía confiable para quienes te rodean. Tu sabiduría no es improvisada; se basa en el respeto por los procesos bien hechos, la ética y la capacidad de integrar la razón con la filosofía de vida.",
    imagen: "/images/sacerdote.jpg",
  },
6: {
    nombre: "Los Enamorados",
    energia: "Amor, elección y armonía (Arcano Central)",
    descripcion:
      "El corazón como brújula y la libertad como premisa fundamental. Este arcano rige las grandes decisiones que se toman desde la autenticidad y el sentimiento profundo. Eres una persona sumamente empática, con una gran capacidad para conectar con la sensibilidad ajena, apreciar la belleza y tejer redes de vínculos significativos. Tu aprendizaje constante es elegir desde el amor propio y la coherencia interna, entendiendo que cada vínculo y cada decisión son un reflejo directo de quién eres y de la armonía que buscas construir en tu vida.",
    imagen: "/images/enamorados.jpg",
},  
7: {
    nombre: "El Carro",
    energia: "Voluntad indomable, dirección y avance.",
    descripcion:
      "Impulso puro, determinación y victoria sobre los obstáculos. Representa la capacidad de tomar las riendas de tu destino con valentía y enfocar toda tu energía hacia una meta concreta. No te detienes ante los contratiempos; sabes integrar fuerzas opuestas y canalizarlas para avanzar con seguridad y velocidad hacia el éxito. Eres quien conduce su propia vida sin depender de las circunstancias externas.",
    imagen: "/images/carro.jpg",
  },
  8: {
    nombre: "La Justicia",
    energia: "Ecuanimidad, claridad analítica y ley de causa-efecto.",
    descripcion:
      "La balanza de la verdad y la objetividad. Posees una mente afilada, un gran sentido de la equidad y una habilidad natural para ver las situaciones desde la lógica y la imparcialidad. Comprendes perfectamente que cada acción tiene una consecuencia y buscas siempre la armonía a través de decisiones justas y conscientes. Tu claridad mental te permite cortar con lo innecesario y actuar con absoluta integridad.",
    imagen: "/images/justicia.jpg",
  },
  9: {
    nombre: "El Ermitaño",
    energia: "Introspección, sabiduría profunda y búsqueda de la verdad.",
    descripcion:
      "El faro de la luz interior en medio de la oscuridad. Posees una mente analítica y una profunda independencia intelectual que te impulsa a buscar respuestas más allá de lo superficial. No temes a la soledad; por el contrario, la valoras como el espacio sagrado donde recargas tu energía, reflexionas y encuentras tu propia verdad. Eres una guía silenciosa pero firme, capaz de iluminar el camino para otros gracias a la madurez y la lucidez de tus propias experiencias.",
    imagen: "/images/ermitano.jpg",
  },
  10: {
    nombre: "La Rueda de la Fortuna",
    energia: "Ciclos, adaptabilidad y fluidez con el destino.",
    descripcion:
      "El fluir constante de los cambios y la inteligencia para moverte con ellos. Comprendes que la vida se compone de etapas, giros y oportunidades dinámicas que hay que saber aprovechar en el momento justo. Lejos de resistirte a las transformaciones, te adaptas con agilidad y visión estratégica, sabiendo que cada ciclo trae un aprendizaje valioso. Eres el motor que entiende el ritmo del tiempo y fluye con él hacia la evolución.",
    imagen: "/images/fortuna.jpg",
  },
  11: {
    nombre: "La Fuerza",
    energia: "Coraje, dominio interior y pasión.",
    descripcion:
      "Una fuerza interna inagotable y magnética. No necesitas la violencia ni la imposición para liderar o conseguir lo que deseas; tu poder radica en la templanza, la valentía y la capacidad de dominar tus propios impulsos con elegancia. Combinas una gran pasión con una paciencia férrea, transformando cualquier desafío en una oportunidad para demostrar tu temple y resiliencia.",
    imagen: "/images/fuerza.jpg",
  },
  12: {
    nombre: "El Colgado",
    energia: "Perspectiva única, pausa y visión alternativa.",
    descripcion:
      "La capacidad excepcional de ver el mundo desde un ángulo completamente diferente al de los demás. No temes detenerte, hacer una pausa o soltar el control cuando el entorno lo exige, porque sabes que esa distancia te otorga una claridad superior. Aportas soluciones creativas, una empatía profunda y una sabiduría desapegada que rompe con los esquemas rígidos de pensamiento.",
    imagen: "/images/colgado.jpg",
  },
  13: {
    nombre: "La Muerte",
    energia: "Transformación radical y renacimiento.",
    descripcion:
      "No te asustes. El arcano 13 es el arte de la metamorfosis constante. No le temes a los finales porque entiendes que son el requisito indispensable para los nuevos comienzos. Posees una capacidad innata para soltar estructuras obsoletas, limpiar el terreno y reinventarte cuantas veces sea necesario con una madurez impresionante. Eres renovación pura y evolución sin ataduras.",
    imagen: "/images/muerte.jpg",
  },
  14: {
    nombre: "La Templanza",
    energia: "Alquimia, moderación y paz interior.",
    descripcion:
      "Un alma pacífica y equilibrada que actúa como un puente armonioso entre los opuestos. Tienes el talento natural de mezclar la lógica con la sensibilidad, encontrando siempre el punto exacto de mesura y sanación. Tu presencia transmite calma y estabilidad, y sabes cómo dosificar tu energía con paciencia para que todo madure a su debido tiempo.",
    imagen: "/images/templanza.jpg",
  },
  15: {
    nombre: "El Diablo",
    energia: "Magnetismo, intensidad y poder personal.",
    descripcion:
      "No te asustes. El arcano 15 tiene una presencia magnética, cautivadora e imposible de ignorar. Posees una visión profunda y sin filtros de la naturaleza humana, la ambición y la sombra. Lejos de asustarte ante la intensidad, sabes usar ese poder de atracción para seducir, negociar y conseguir tus metas con una astucia impresionante. Tienes un talento único para despertar el deseo, conectar con el juego del poder y desatar una energía desbordante.",
    imagen: "/images/diablo.jpg",
  },
  16: {
    nombre: "La Torre",
    energia: "Revelación, ruptura y reconstrucción.",
    descripcion:
      "El rayo que despierta conciencias y destruye lo falso en un instante. No te asustan las crisis ni los cambios abruptos porque sabes que son necesarios para derrumbar estructuras obsoletas que ya no te sirven. Posees una mente revolucionaria capaz de demoler viejos paradigmas para levantar, sobre bases reales y verdaderas, algo completamente nuevo y auténtico. Eres el despertar que no admite medias tintas.",
    imagen: "/images/torre.jpg",
  },
  17: {
    nombre: "La Estrella",
    energia: "Inspiración, brillo y esperanza.",
    descripcion:
      "Un faro de luz pura que inspira y proyecta confianza hacia el futuro. Tienes una visión sumamente clara, optimista y elevada de lo que está por venir, acompañada de un talento artístico o expresivo que cautiva a los demás. Tu energía fluye limpia y generosa, conectándote con tus sueños más altos y sirviendo de guía para quienes te rodean. Eres la promesa de que lo mejor siempre está por manifestarse.",
    imagen: "/images/estrella.jpg",
  },
  18: {
    nombre: "La Luna",
    energia: "Imaginación, profundidad y mundo inconsciente.",
    descripcion:
      "Un universo interior tan rico como enigmático. Posees una sensibilidad artística desbordante, una intuición capaz de leer entre líneas y una conexión profunda con los sueños, las emociones ocultas y el arte. No todo en ti es lineal; habitas con comodidad las zonas de misterio, la poesía y la reflexión nocturna, comprendiendo los matices más sutiles que escapan a simple vista de los demás.",
    imagen: "/images/luna.jpg",
  },
  19: {
    nombre: "El Sol",
    energia: "Éxito, alegría y brillo vital.",
    descripcion:
      "Una energía radiante que ilumina todo a su paso. Posees un optimismo natural, una alegría contagiosa y una capacidad innata para destacar y llevar claridad a cualquier espacio o proyecto que lideres. No temes mostrar tu autenticidad ni brillar con fuerza propia; tu presencia disipa las dudas y atrae el reconocimiento, el éxito y la calidez humana de manera totalmente orgánica.",
    imagen: "/images/sol.jpg",
  },
  20: {
    nombre: "El Juicio",
    energia: "Despertar, llamado interior y renovación.",
    descripcion:
      "El gran salto de conciencia y la conexión con un propósito mayor. Posees la habilidad de escuchar los llamados importantes de la vida, reevaluar tu pasado con absoluta madurez y renacer hacia un nivel superior de comunicación y claridad. Eres capaz de sacudirte las culpas o los condicionamientos externos para responder, por fin, al llamado de tu verdadera vocación con total honestidad.",
    imagen: "/images/juicio.jpg",
  },
  21: {
    nombre: "El Mundo",
    energia: "Expansión global, integración y plenitud.",
    descripcion:
      "Una mirada amplia, internacional e integradora que no conoce fronteras. Tienes la capacidad de conectar múltiples disciplinas, ver el panorama completo y cerrar grandes ciclos con un éxito rotundo. Te impulsa el deseo de trascender, conectar con horizontes abiertos, aprender de diversas culturas o sistemas y sentir la profunda satisfacción de haber completado una gran etapa para ir por más.",
    imagen: "/images/mundo.jpg",
  },
  22: {
    nombre: "El Loco",
    energia: "Libertad absoluta, audacia y nuevo comienzo.",
    descripcion:
      "El espíritu libre y audaz que no teme dar el salto hacia lo desconocido. Posees una frescura mental única, una apertura total a la aventura y una valentía innata para romper moldes sin mirar atrás. Para ti, la vida es un lienzo en blanco y cada paso es una reinvención. No te atan las expectativas ajenas; caminas liviana, curiosa y lista para explorar cualquier camino por primera vez.",
    imagen: "/images/loco.jpg",
  },
};

/* ============================================================
   ALGORITMO: Matriz del Destino — Arcano Central (Zona de Confort)

   Reduce cada componente de la fecha al rango 1-22 (todo lo
   mayor a 22 se reduce sumando sus dígitos; el 0 se mapea a 22)
   y combina las cuatro esquinas del cuadrado según la técnica:

     Día    -> Esquina izquierda
     Mes    -> Esquina superior
     Año    -> suma de sus 4 dígitos, reducida -> Esquina derecha
     Base   -> (Día + Mes + Año) reducida       -> Esquina inferior
     Centro -> (Día + Mes + Año + Base) reducida -> Arcano Central
   ============================================================ */
function reducir(numero) {
  let n = numero;
  while (n > 22) {
    n = String(n)
      .split("")
      .reduce((acc, d) => acc + Number(d), 0);
  }
  if (n === 0) n = 22;
  return n;
}

function calcularArcanoCentral(fechaStr) {
  const [anioStr, mesStr, diaStr] = fechaStr.split("-");

  const dia = reducir(parseInt(diaStr, 10));
  const mes = reducir(parseInt(mesStr, 10));

  const sumaAnio = anioStr
    .split("")
    .reduce((acc, d) => acc + Number(d), 0);
  const anio = reducir(sumaAnio);

  const base = reducir(dia + mes + anio);
  const central = reducir(dia + mes + anio + base);

  return { dia, mes, anio, base, central };
}

export default function Home() {
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [lugar, setLugar] = useState("");
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !fecha) {
      setError("Por favor completá tu nombre y fecha de nacimiento.");
      return;
    }

    setError("");
    const matriz = calcularArcanoCentral(fecha);
    const arcano = ARCANOS[matriz.central];

    setResultado({ numero: matriz.central, arcano, matriz });
  };

  const handleReset = () => {
    setResultado(null);
    setNombre("");
    setFecha("");
    setLugar("");
    setError("");
  };

  return (
    <main className="min-h-screen w-full bg-[#0b0512] text-violet-100 flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Glow decorativo de fondo */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 bg-violet-700/20 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-96 h-96 bg-fuchsia-700/20 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        {!resultado ? (
          <div className="bg-[#150a23]/80 backdrop-blur-md border border-violet-800/40 rounded-2xl shadow-2xl shadow-violet-950/50 p-8">
            <div className="text-center mb-8">
              <p className="text-violet-400 text-4xl mb-2">✦</p>
              <h1 className="text-2xl font-semibold tracking-wide text-violet-100">
                ¿Qué Arcano Eres?
              </h1>
              <p className="text-violet-400/70 text-sm mt-2">
                Descubrí el Arcano Mayor que guía tu esencia
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-violet-400 mb-1.5">
                  Nombre
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full bg-[#0b0512] border border-violet-800/50 rounded-lg px-4 py-2.5 text-violet-100 placeholder-violet-500/40 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-violet-400 mb-1.5">
                  Fecha de nacimiento
                </label>
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full bg-[#0b0512] border border-violet-800/50 rounded-lg px-4 py-2.5 text-violet-100 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition [color-scheme:dark]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-violet-400 mb-1.5">
                  Lugar de origen{" "}
                  <span className="text-violet-500/50 normal-case">(opcional)</span>
                </label>
                <input
                  type="text"
                  value={lugar}
                  onChange={(e) => setLugar(e.target.value)}
                  placeholder="Ciudad, país"
                  className="w-full bg-[#0b0512] border border-violet-800/50 rounded-lg px-4 py-2.5 text-violet-100 placeholder-violet-500/40 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                />
              </div>

              {error && (
                <p className="text-rose-400 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-medium py-3 rounded-lg transition shadow-lg shadow-violet-900/50 tracking-wide"
              >
                Descubrir mi Arcano
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-[#150a23]/80 backdrop-blur-md border border-violet-800/40 rounded-2xl shadow-2xl shadow-violet-950/50 p-8 text-center animate-[fadeIn_0.4s_ease-in-out]">
            <p className="text-violet-400/70 text-sm mb-1">
              {nombre}, tu Arcano es
            </p>
            <h2 className="text-2xl font-semibold text-violet-100 mb-4">
              {resultado.arcano.nombre}
            </h2>

            <img
              src={resultado.arcano.imagen}
              alt={resultado.arcano.nombre}
              className="w-48 mx-auto rounded-lg border border-violet-700/50 shadow-lg shadow-violet-950/60 mb-5"
            />

            <p className="uppercase text-xs tracking-widest text-fuchsia-400 mb-2">
              {resultado.arcano.energia}
            </p>
            <p className="text-violet-200/80 text-sm leading-relaxed mb-2">
              {resultado.arcano.descripcion}
            </p>

            <div className="grid grid-cols-4 gap-2 mt-5 mb-2">
              <div className="bg-[#0b0512] border border-violet-800/40 rounded-lg py-2">
                <p className="text-[10px] uppercase text-violet-500/70">Día</p>
                <p className="text-violet-200 font-medium">{resultado.matriz.dia}</p>
              </div>
              <div className="bg-[#0b0512] border border-violet-800/40 rounded-lg py-2">
                <p className="text-[10px] uppercase text-violet-500/70">Mes</p>
                <p className="text-violet-200 font-medium">{resultado.matriz.mes}</p>
              </div>
              <div className="bg-[#0b0512] border border-violet-800/40 rounded-lg py-2">
                <p className="text-[10px] uppercase text-violet-500/70">Año</p>
                <p className="text-violet-200 font-medium">{resultado.matriz.anio}</p>
              </div>
              <div className="bg-[#0b0512] border border-violet-800/40 rounded-lg py-2">
                <p className="text-[10px] uppercase text-violet-500/70">Base</p>
                <p className="text-violet-200 font-medium">{resultado.matriz.base}</p>
              </div>
            </div>

            {lugar && (
              <p className="text-violet-500/60 text-xs mt-3 italic">
                Origen: {lugar}
              </p>
            )}

            <button
              onClick={handleReset}
              className="mt-6 w-full border border-violet-700/60 hover:bg-violet-800/30 text-violet-200 font-medium py-2.5 rounded-lg transition tracking-wide"
            >
              Consultar de nuevo
            </button>
          </div>
        )}

        <p className="text-center text-violet-600/40 text-xs mt-6">
          ✦ Solo con fines lúdicos y de entretenimiento ✦
        </p>
      </div>
    </main>
  );
}
