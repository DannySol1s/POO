export const challenges = [
  // ══════════════════════════════════════
  // CLASES
  // ══════════════════════════════════════

  // --- FÁCIL ---
  {
    id: "cls_001",
    topic: "clases",
    difficulty: "facil",
    question: "¿Qué función especial se ejecuta automáticamente al crear una instancia con 'nuevo'?",
    code: null,
    options: ["constructor", "init", "create", "start"],
    correctIndex: 0,
    explanation: "El método 'constructor' es el único que se invoca automáticamente al usar 'nuevo'. Aquí se inicializan las propiedades del nuevo objeto.",
    hint: "Este método tiene el mismo nombre en todos los lenguajes OOP modernos — y en inglés significa exactamente lo que hace.",
  },
  {
    id: "cls_002",
    topic: "clases",
    difficulty: "facil",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Coche:
  CONSTRUCTOR(marca):
    yo.marca = marca

c = NUEVO Coche("Toyota")
IMPRIMIR c.marca`,
    options: ['"Toyota"', '"marca"', "indefinido", '"Coche"'],
    correctIndex: 0,
    explanation: "En el constructor, 'yo.marca = marca' asigna el argumento al objeto. Al acceder a c.marca obtenemos \"Toyota\".",
    hint: "Dentro del constructor, 'yo' representa el objeto que se está creando — la propiedad queda guardada en él.",
  },
  {
    id: "cls_008",
    topic: "clases",
    difficulty: "facil",
    question: "¿Qué palabra clave se usa para declarar una clase en POO?",
    code: null,
    options: ["clase / class", "estructura", "objeto", "tipo"],
    correctIndex: 0,
    explanation: "La palabra clave 'class' (o 'clase' en pseudocódigo) introduce una definición de clase. Es el bloque base de la POO.",
    hint: "La misma palabra en inglés que la traducción directa de 'clase' en programación.",
  },
  {
    id: "cls_009",
    topic: "clases",
    difficulty: "facil",
    question: "¿Qué ocurre si no defines un constructor en una clase?",
    code: null,
    options: [
      "Se usa un constructor vacío por defecto",
      "La clase no puede instanciarse",
      "Se genera un error al usar 'nuevo'",
      "El constructor se hereda del Object global",
    ],
    correctIndex: 0,
    explanation: "Si no declaras constructor, el lenguaje usa implícitamente uno vacío. La clase funciona normalmente y el objeto se crea sin inicialización adicional.",
    hint: "El lenguaje siempre tiene un plan B cuando falta el constructor — nunca deja al objeto sin nacer.",
  },
  {
    id: "cls_010",
    topic: "clases",
    difficulty: "facil",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Persona:
  ESTATICO especie = "Homo sapiens"

IMPRIMIR Persona.especie`,
    options: ['"Homo sapiens"', "indefinido", "Error", "nulo"],
    correctIndex: 0,
    explanation: "Los campos estáticos pertenecen a la clase, no a las instancias. Se acceden con NombreClase.campo, sin crear ningún objeto.",
    hint: "Los campos 'estáticos' son de la clase misma — se acceden directamente desde el nombre de la clase.",
  },

  // --- MEDIO ---
  {
    id: "cls_003",
    topic: "clases",
    difficulty: "medio",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Contador:
  count = 0
  METODO subir():
    yo.count = yo.count + 1

c = NUEVO Contador()
c.subir()
c.subir()
c.subir()
IMPRIMIR c.count`,
    options: ["3", "0", "1", "indefinido"],
    correctIndex: 0,
    explanation: "El campo 'count = 0' se inicializa por instancia. Cada llamada a subir() lo incrementa en 1. Tras tres llamadas, count vale 3.",
    hint: null,
  },
  {
    id: "cls_004",
    topic: "clases",
    difficulty: "medio",
    question: "¿Cuál es la diferencia entre un método estático y uno de instancia?",
    code: null,
    options: [
      "El estático se llama con la clase, sin instancia",
      "El estático puede acceder a 'yo' de instancia",
      "Los de instancia son más rápidos",
      "No hay diferencia en POO",
    ],
    correctIndex: 0,
    explanation: "Los métodos estáticos se invocan sobre la clase (Clase.metodo()) y no tienen acceso a 'yo' de instancia. Los de instancia requieren un objeto creado con 'nuevo'.",
    hint: null,
  },
  {
    id: "cls_005",
    topic: "clases",
    difficulty: "medio",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Animal:
  CONSTRUCTOR(nombre):
    yo.nombre = nombre
  METODO presentarse():
    RETORNA "Soy " + yo.nombre

a = NUEVO Animal("León")
IMPRIMIR a.presentarse()`,
    options: ['"Soy León"', '"Soy nombre"', "Error", '"León"'],
    correctIndex: 0,
    explanation: "El método concatena 'Soy ' con yo.nombre (que es \"León\"). El resultado retornado es \"Soy León\".",
    hint: null,
  },
  {
    id: "cls_011",
    topic: "clases",
    difficulty: "medio",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Geometria:
  ESTATICO METODO area(b, h):
    RETORNA b * h
  ESTATICO METODO perimetro(b, h):
    RETORNA 2 * (b + h)

IMPRIMIR Geometria.area(3, 4) + Geometria.perimetro(3, 4)`,
    options: ["26", "12", "14", "Error"],
    correctIndex: 0,
    explanation: "area(3,4) = 3×4 = 12. perimetro(3,4) = 2×(3+4) = 14. La suma es 26. Ambos son métodos estáticos — se llaman con el nombre de la clase.",
    hint: null,
  },
  {
    id: "cls_012",
    topic: "clases",
    difficulty: "medio",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Jugador:
  nivel = 1
  puntaje = 0
  METODO subir():
    yo.nivel = yo.nivel + 1
    yo.puntaje = yo.puntaje + 100

j = NUEVO Jugador()
j.subir(); j.subir()
IMPRIMIR j.nivel + "-" + j.puntaje`,
    options: ['"3-200"', '"2-100"', '"1-0"', "Error"],
    correctIndex: 0,
    explanation: "Los campos nivel=1 y puntaje=0 se inicializan por instancia. Dos llamadas a subir(): nivel 1→2→3, puntaje 0→100→200.",
    hint: null,
  },

  // --- DIFÍCIL ---
  {
    id: "cls_006",
    topic: "clases",
    difficulty: "dificil",
    question: "¿Puede una clase tener más de un método constructor?",
    code: null,
    options: [
      "No, solo se permite un constructor por clase",
      "Sí, hasta dos",
      "Sí, con distintos parámetros",
      "Sí, si uno es estático",
    ],
    correctIndex: 0,
    explanation: "En la mayoría de lenguajes OOP solo se permite un único 'constructor' por clase. Para múltiples formas de inicialización se usan parámetros por defecto o métodos fábrica.",
    hint: null,
  },
  {
    id: "cls_007",
    topic: "clases",
    difficulty: "dificil",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Rectangulo:
  CONSTRUCTOR(w, h):
    yo.w = w; yo.h = h
  METODO area(): RETORNA yo.w * yo.h
  METODO perimetro(): RETORNA 2 * (yo.w + yo.h)

r = NUEVO Rectangulo(4, 5)
IMPRIMIR r.area() + r.perimetro()`,
    options: ["38", "20", "18", "40"],
    correctIndex: 0,
    explanation: "area() = 4 × 5 = 20. perimetro() = 2 × (4 + 5) = 18. La suma es 38.",
    hint: null,
  },
  {
    id: "cls_013",
    topic: "clases",
    difficulty: "dificil",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Token:
  privado valor
  privado usos = 0
  CONSTRUCTOR(v): yo.valor = v
  METODO consumir():
    yo.usos = yo.usos + 1
    RETORNA yo.valor
  PROPIEDAD info: RETORNA yo.valor + ":" + yo.usos

t = NUEVO Token("abc")
t.consumir(); t.consumir()
IMPRIMIR t.info`,
    options: ['"abc:2"', '"abc:0"', '"abc:1"', "Error"],
    correctIndex: 0,
    explanation: "consumir() incrementa 'usos' privado en cada llamada. Tras dos llamadas, usos = 2. La propiedad 'info' retorna \"abc:2\".",
    hint: null,
  },
  {
    id: "cls_014",
    topic: "clases",
    difficulty: "dificil",
    question: "¿Cuál es la forma correcta de simular una clase abstracta en POO?",
    code: null,
    options: [
      "Lanzar un error en el constructor si se intenta instanciar directamente",
      "Declarar la clase con la palabra clave 'abstract'",
      "Usar solo métodos estáticos",
      "No definir constructor",
    ],
    correctIndex: 0,
    explanation: "Muchos lenguajes tienen 'abstract', pero donde no existe (como JS) se simula lanzando un error en el constructor: si se intenta instanciar la clase base directamente, falla.",
    hint: null,
  },
  {
    id: "cls_015",
    topic: "clases",
    difficulty: "dificil",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Cache:
  privado datos = {}
  METODO guardar(k, v):
    yo.datos[k] = v
    RETORNA yo
  METODO leer(k): RETORNA yo.datos[k]

c = NUEVO Cache()
c.guardar("x", 10).guardar("y", 20)
IMPRIMIR c.leer("x") + c.leer("y")`,
    options: ["30", "indefinido", "Error", '"1020"'],
    correctIndex: 0,
    explanation: "guardar() retorna 'yo', permitiendo encadenamiento de métodos. Se guardan x=10 e y=20. leer(\"x\") + leer(\"y\") = 10 + 20 = 30.",
    hint: null,
  },

  // ══════════════════════════════════════
  // OBJETOS
  // ══════════════════════════════════════

  // --- FÁCIL ---
  {
    id: "obj_001",
    topic: "objetos",
    difficulty: "facil",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Libro

l = NUEVO Libro()
IMPRIMIR tipoDe(l)`,
    options: ['"objeto"', '"clase"', '"Libro"', '"función"'],
    correctIndex: 0,
    explanation: "En POO, tipoDe() sobre una instancia de clase siempre retorna 'objeto'. Las clases en sí son de tipo 'función' (en implementaciones como JS), pero sus instancias son objetos.",
    hint: "Los objetos (instancias de clase) tienen un solo tipo posible: objeto.",
  },
  {
    id: "obj_002",
    topic: "objetos",
    difficulty: "facil",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Punto:
  CONSTRUCTOR(x, y):
    yo.x = x; yo.y = y

p1 = NUEVO Punto(1, 2)
p2 = NUEVO Punto(3, 4)
IMPRIMIR p1.x + p2.x`,
    options: ["4", "2", "3", "6"],
    correctIndex: 0,
    explanation: "Cada instancia tiene sus propias propiedades independientes. p1.x = 1, p2.x = 3. La suma es 4.",
    hint: "Cada objeto creado con 'nuevo' tiene sus propias copias de las propiedades — son independientes entre sí.",
  },
  {
    id: "obj_008",
    topic: "objetos",
    difficulty: "facil",
    question: "¿Cuántas instancias se pueden crear de una clase?",
    code: null,
    options: [
      "Sin límite (limitado solo por memoria)",
      "Solo una (Singleton por defecto)",
      "Máximo 100",
      "Las que defina el constructor",
    ],
    correctIndex: 0,
    explanation: "Puedes crear tantas instancias como permita la memoria. El patrón Singleton es una restricción manual, no un comportamiento por defecto.",
    hint: "El lenguaje no impone ningún límite — piensa en cuántos objetos puede haber en un videojuego.",
  },
  {
    id: "obj_009",
    topic: "objetos",
    difficulty: "facil",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Caja:
  CONSTRUCTOR(v): yo.v = v

a = NUEVO Caja(5)
b = a
b.v = 99
IMPRIMIR a.v`,
    options: ["99", "5", "indefinido", "Error"],
    correctIndex: 0,
    explanation: "'b = a' no clona el objeto, copia la referencia. Ambas variables apuntan al mismo objeto. Al modificar b.v, también cambia a.v.",
    hint: "Asignar un objeto a otra variable no lo copia — ambas variables comparten la misma dirección en memoria.",
  },
  {
    id: "obj_010",
    topic: "objetos",
    difficulty: "facil",
    question: "¿Qué método permite verificar si un objeto tiene una propiedad propia (no heredada)?",
    code: null,
    options: [
      "tienePropiaPropiedad() / hasOwnProperty()",
      "tienePropiedad()",
      "posee()",
      "operador 'en'",
    ],
    correctIndex: 0,
    explanation: "obj.hasOwnProperty('prop') retorna verdadero solo si la propiedad está directamente en el objeto, no en su cadena de prototipos. El operador 'in' incluye propiedades heredadas.",
    hint: "'Own' en inglés significa 'propio' — el método pregunta si la propiedad es del objeto, no heredada.",
  },

  // --- MEDIO ---
  {
    id: "obj_003",
    topic: "objetos",
    difficulty: "medio",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Config

a = NUEVO Config()
b = NUEVO Config()
IMPRIMIR (a == b)`,
    options: ["falso", "verdadero", "indefinido", "Error"],
    correctIndex: 0,
    explanation: "La comparación de objetos verifica referencias, no contenido. Aunque 'a' y 'b' son de la misma clase, son objetos distintos en memoria. Retorna falso.",
    hint: null,
  },
  {
    id: "obj_004",
    topic: "objetos",
    difficulty: "medio",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Config:
  debug = verdadero
  METODO toggle(): yo.debug = NO yo.debug

a = NUEVO Config()
b = a
a.toggle()
IMPRIMIR b.debug`,
    options: ["falso", "verdadero", "indefinido", "Error"],
    correctIndex: 0,
    explanation: "'b = a' copia la referencia, no el objeto. Ambas apuntan al mismo objeto. Al llamar a.toggle(), b.debug también cambia de verdadero a falso.",
    hint: null,
  },
  {
    id: "obj_005",
    topic: "objetos",
    difficulty: "medio",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Vehiculo
CLASE Moto HEREDA Vehiculo

m = NUEVO Moto()
IMPRIMIR (m ES_INSTANCIA_DE Vehiculo)`,
    options: ["verdadero", "falso", "Error", "indefinido"],
    correctIndex: 0,
    explanation: "ES_INSTANCIA_DE recorre la cadena de herencia. Como Moto hereda de Vehiculo, las instancias de Moto también son instancias de Vehiculo.",
    hint: null,
  },
  {
    id: "obj_011",
    topic: "objetos",
    difficulty: "medio",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Punto:
  CONSTRUCTOR(x, y): yo.x = x; yo.y = y
  METODO clonar(): RETORNA NUEVO Punto(yo.x, yo.y)

p1 = NUEVO Punto(3, 4)
p2 = p1.clonar()
p2.x = 99
IMPRIMIR p1.x`,
    options: ["3", "99", "indefinido", "Error"],
    correctIndex: 0,
    explanation: "clonar() crea una instancia nueva con los mismos valores. p2 es un objeto independiente. Modificar p2.x no afecta p1.x, que mantiene su valor de 3.",
    hint: null,
  },
  {
    id: "obj_012",
    topic: "objetos",
    difficulty: "medio",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Sensor:
  CONSTRUCTOR(tipo):
    yo.tipo = tipo
    yo.lecturas = []
  METODO registrar(v): yo.lecturas.agregar(v)

s1 = NUEVO Sensor("temp")
s2 = NUEVO Sensor("temp")
s1.registrar(25)
IMPRIMIR s2.lecturas.tamaño`,
    options: ["0", "1", "25", "Error"],
    correctIndex: 0,
    explanation: "Cada instancia tiene su propio arreglo 'lecturas' (inicializado en el constructor). s1 y s2 son independientes. Agregar a s1 no afecta a s2.",
    hint: null,
  },

  // --- DIFÍCIL ---
  {
    id: "obj_006",
    topic: "objetos",
    difficulty: "dificil",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Animal:
  CONSTRUCTOR(nombre): yo.nombre = nombre

gato = NUEVO Animal("Gato")
gato.velocidad = 50
IMPRIMIR gato.velocidad`,
    options: ["50", "indefinido", "Error", "nulo"],
    correctIndex: 0,
    explanation: "Se puede añadir propiedades a una instancia después de crearla. 'gato.velocidad = 50' crea una propiedad propia solo en ese objeto, sin afectar a Animal ni otras instancias.",
    hint: null,
  },
  {
    id: "obj_007",
    topic: "objetos",
    difficulty: "dificil",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Persona:
  CONSTRUCTOR(nombre): yo.nombre = nombre
  METODO saludar(): RETORNA "Hola"

p = NUEVO Persona("Ana")
IMPRIMIR tiene_propiedad(p, "nombre")`,
    options: ["verdadero", "falso", "Error", '"nombre"'],
    correctIndex: 0,
    explanation: "La función tiene_propiedad verifica si la propiedad existe en el objeto. 'nombre' fue asignado en el constructor, por lo que es una propiedad propia de p: verdadero.",
    hint: null,
  },
  {
    id: "obj_013",
    topic: "objetos",
    difficulty: "dificil",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Nodo:
  CONSTRUCTOR(v): yo.valor = v; yo.siguiente = nulo

n1 = NUEVO Nodo(1); n2 = NUEVO Nodo(2); n3 = NUEVO Nodo(3)
n1.siguiente = n2; n2.siguiente = n3
IMPRIMIR n1.siguiente.siguiente.valor`,
    options: ["3", "2", "1", "nulo"],
    correctIndex: 0,
    explanation: "n1.siguiente → n2, n2.siguiente → n3. n1.siguiente.siguiente.valor = n3.valor = 3. Este patrón es el de una lista enlazada simple.",
    hint: null,
  },
  {
    id: "obj_014",
    topic: "objetos",
    difficulty: "dificil",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Registro:
  CONSTRUCTOR(): yo.items = {}
  METODO agregar(k, v): yo.items[k] = v
  METODO obtener(k):
    SI yo.items[k] EXISTE: RETORNA yo.items[k]
    SINO: RETORNA "no existe"

r = NUEVO Registro()
r.agregar("a", 1)
IMPRIMIR r.obtener("b")`,
    options: ['"no existe"', "indefinido", "nulo", '"1"'],
    correctIndex: 0,
    explanation: "Al buscar la clave \"b\" que no fue agregada, el SI comprueba que no existe y el SINO retorna \"no existe\".",
    hint: null,
  },
  {
    id: "obj_015",
    topic: "objetos",
    difficulty: "dificil",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Config:
  CONSTRUCTOR(opciones):
    PARA CADA (k, v) EN opciones:
      yo[k] = v

c = NUEVO Config({debug: verdadero, version: "2.0", timeout: 30})
IMPRIMIR cantidadPropiedades(c)`,
    options: ["3", "1", "0", "Error"],
    correctIndex: 0,
    explanation: "El constructor itera sobre las opciones y copia cada par clave-valor directamente al objeto. Se copian 3 propiedades: debug, version y timeout.",
    hint: null,
  },

  // ══════════════════════════════════════
  // HERENCIA
  // ══════════════════════════════════════

  // --- FÁCIL ---
  {
    id: "her_001",
    topic: "herencia",
    difficulty: "facil",
    question: "¿Qué palabra clave se usa para que una clase herede de otra?",
    code: null,
    options: ["extends / HEREDA", "inherits", "super", "implements"],
    correctIndex: 0,
    explanation: "'extends' (o 'HEREDA' en pseudocódigo) establece la relación de herencia: class Hijo extends Padre. El hijo hereda todos los métodos y propiedades del padre.",
    hint: "La misma palabra en inglés que usas para 'extender' algo — hace que la clase hija amplíe a la padre.",
  },
  {
    id: "her_002",
    topic: "herencia",
    difficulty: "facil",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Vehiculo:
  METODO tipo(): RETORNA "vehículo"

CLASE Coche HEREDA Vehiculo

c = NUEVO Coche()
IMPRIMIR c.tipo()`,
    options: ['"vehículo"', "indefinido", '"Coche"', "Error"],
    correctIndex: 0,
    explanation: "Coche hereda tipo() de Vehiculo. Al no definir su propio tipo(), el sistema lo busca en la cadena de herencia y ejecuta el del padre.",
    hint: "Si la clase hija no define el método, se busca automáticamente en el padre.",
  },
  {
    id: "her_008",
    topic: "herencia",
    difficulty: "facil",
    question: "¿Qué es la herencia en Programación Orientada a Objetos?",
    code: null,
    options: [
      "Una clase hija adquiere propiedades y métodos de una clase padre",
      "Una clase puede tener múltiples constructores",
      "Los objetos comparten la misma referencia en memoria",
      "Un método puede retornar distintos tipos",
    ],
    correctIndex: 0,
    explanation: "La herencia permite que una clase (hija/subclase) reutilice el código de otra (padre/superclase). Se usa 'extends' o 'HEREDA' para establecer esta relación.",
    hint: "En la vida real, heredar significa recibir algo de quien viene antes — en POO es exactamente lo mismo.",
  },
  {
    id: "her_009",
    topic: "herencia",
    difficulty: "facil",
    question: "¿Qué ocurre si la clase hija define un constructor sin llamar a SUPER()?",
    code: null,
    options: [
      "Error: 'yo' no está disponible hasta llamar SUPER()",
      "Se ignora el constructor del padre",
      "El constructor del padre se llama automáticamente",
      "Error de sintaxis al definir la clase",
    ],
    correctIndex: 0,
    explanation: "Si una clase hereda y define constructor, debe llamar a SUPER() antes de usar 'yo'. De lo contrario, el objeto aún no ha sido inicializado por el padre.",
    hint: "Antes de usar 'yo' en la clase hija, el padre debe haber preparado el objeto — eso es exactamente lo que hace SUPER().",
  },
  {
    id: "her_010",
    topic: "herencia",
    difficulty: "facil",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Animal:
  CONSTRUCTOR(nombre): yo.nombre = nombre

CLASE Perro HEREDA Animal

p = NUEVO Perro("Rex")
IMPRIMIR p.nombre`,
    options: ['"Rex"', "indefinido", "Error", '"Perro"'],
    correctIndex: 0,
    explanation: "Si Perro no define constructor, usa automáticamente el del padre. El argumento \"Rex\" pasa al constructor de Animal que asigna yo.nombre.",
    hint: "Si no hay constructor en la clase hija, el padre se encarga de todo — automáticamente.",
  },

  // --- MEDIO ---
  {
    id: "her_003",
    topic: "herencia",
    difficulty: "medio",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Figura:
  CONSTRUCTOR(color): yo.color = color

CLASE Circulo HEREDA Figura:
  CONSTRUCTOR(color, radio):
    SUPER(color)
    yo.radio = radio

c = NUEVO Circulo("rojo", 5)
IMPRIMIR c.color + " " + c.radio`,
    options: ['"rojo 5"', '"indefinido indefinido"', "Error", '"5 rojo"'],
    correctIndex: 0,
    explanation: "SUPER(color) invoca el constructor de Figura, que asigna yo.color = 'rojo'. Luego yo.radio = 5. Ambas propiedades quedan en la instancia.",
    hint: null,
  },
  {
    id: "her_004",
    topic: "herencia",
    difficulty: "medio",
    question: "¿Puede una clase heredar de múltiples clases a la vez en POO clásica?",
    code: null,
    options: [
      "Depende del lenguaje — muchos solo permiten herencia simple",
      "Sí, siempre con 'extends Clase1, Clase2'",
      "Sí, automáticamente con mixins",
      "Sí, con 'implements'",
    ],
    correctIndex: 0,
    explanation: "Lenguajes como Java y JavaScript solo soportan herencia simple (una clase padre). Python y C++ permiten herencia múltiple. Para reutilizar múltiples comportamientos se usan mixins o composición.",
    hint: null,
  },
  {
    id: "her_005",
    topic: "herencia",
    difficulty: "medio",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE A:
  METODO saludo(): RETORNA "Hola desde A"

CLASE B HEREDA A:
  METODO saludo(): RETORNA "Hola desde B"

b = NUEVO B()
IMPRIMIR b.saludo()`,
    options: ['"Hola desde B"', '"Hola desde A"', "Error", '"Hola desde A y B"'],
    correctIndex: 0,
    explanation: "La clase hija sobreescribe el método del padre. El sistema busca primero en la clase hija antes de subir al padre. El método de B tiene prioridad.",
    hint: null,
  },
  {
    id: "her_011",
    topic: "herencia",
    difficulty: "medio",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Empleado:
  CONSTRUCTOR(nombre, salario):
    yo.nombre = nombre; yo.salario = salario
  METODO info(): RETORNA yo.nombre + " $" + yo.salario

CLASE Gerente HEREDA Empleado:
  CONSTRUCTOR(nombre, salario, area):
    SUPER(nombre, salario); yo.area = area
  METODO info(): RETORNA SUPER.info() + " - " + yo.area

g = NUEVO Gerente("Luis", 5000, "TI")
IMPRIMIR g.info()`,
    options: ['"Luis $5000 - TI"', '"Luis $5000"', '"-TI"', "Error"],
    correctIndex: 0,
    explanation: "Gerente.info() llama SUPER.info() (\"Luis $5000\") y concatena \" - TI\". Extensión perfecta del comportamiento del padre.",
    hint: null,
  },
  {
    id: "her_012",
    topic: "herencia",
    difficulty: "medio",
    question: "¿Puede una clase hija acceder a métodos del padre que sobreescribió?",
    code: null,
    options: [
      "Sí, usando SUPER.metodo()",
      "No, el método padre queda inaccesible",
      "Sí, pero solo dentro del constructor",
      "No, se debe copiar el código manualmente",
    ],
    correctIndex: 0,
    explanation: "SUPER.metodo() permite a la clase hija invocar la versión del padre incluso si lo ha sobreescrito. Esto es clave para extender comportamiento sin duplicar código.",
    hint: null,
  },

  // --- DIFÍCIL ---
  {
    id: "her_006",
    topic: "herencia",
    difficulty: "dificil",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE A:
  METODO m(): RETORNA "A"
CLASE B HEREDA A:
  METODO m(): RETORNA SUPER.m() + "B"
CLASE C HEREDA B:
  METODO m(): RETORNA SUPER.m() + "C"

c = NUEVO C()
IMPRIMIR c.m()`,
    options: ['"ABC"', '"CBA"', '"AB"', '"CB"'],
    correctIndex: 0,
    explanation: "C.m() llama SUPER.m() (B) + 'C'. B.m() llama SUPER.m() (A) + 'B'. A.m() retorna 'A'. Se construye de adentro hacia afuera: 'A'+'B'+'C' = 'ABC'.",
    hint: null,
  },
  {
    id: "her_007",
    topic: "herencia",
    difficulty: "dificil",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Base:
  CONSTRUCTOR(x): yo.x = x
  METODO doble(): RETORNA yo.x * 2

CLASE Derivada HEREDA Base:
  CONSTRUCTOR(x, y):
    SUPER(x); yo.y = y
  METODO suma(): RETORNA yo.doble() + yo.y

d = NUEVO Derivada(5, 3)
IMPRIMIR d.suma()`,
    options: ["13", "10", "8", "15"],
    correctIndex: 0,
    explanation: "SUPER(5) asigna yo.x = 5. yo.y = 3. doble() retorna 5 × 2 = 10. suma() retorna 10 + 3 = 13.",
    hint: null,
  },
  {
    id: "her_013",
    topic: "herencia",
    difficulty: "dificil",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Forma:
  CONSTRUCTOR(color): yo.color = color
  METODO toString(): RETORNA "[" + yo.color + "]"

CLASE Circulo HEREDA Forma:
  CONSTRUCTOR(r, color):
    SUPER(color); yo.r = r
  METODO toString():
    RETORNA "Circulo" + SUPER.toString() + " r=" + yo.r

c = NUEVO Circulo(7, "rojo")
IMPRIMIR c.toString()`,
    options: ['"Circulo[rojo] r=7"', '"Circulo r=7"', '"[rojo]"', "Error"],
    correctIndex: 0,
    explanation: "SUPER.toString() retorna \"[rojo]\". Circulo.toString() concatena \"Circulo\" + \"[rojo]\" + \" r=7\" = \"Circulo[rojo] r=7\".",
    hint: null,
  },
  {
    id: "her_014",
    topic: "herencia",
    difficulty: "dificil",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE A: CONSTRUCTOR(): yo.tipo = "A"
CLASE B HEREDA A: CONSTRUCTOR(): SUPER(); yo.tipo = "B"
CLASE C HEREDA B: CONSTRUCTOR(): SUPER(); yo.tipo = "C"

c = NUEVO C()
IMPRIMIR (c ES_INSTANCIA_DE A), (c ES_INSTANCIA_DE B), (c ES_INSTANCIA_DE C)`,
    options: ["verdadero verdadero verdadero", "falso falso verdadero", "falso verdadero verdadero", "verdadero falso verdadero"],
    correctIndex: 0,
    explanation: "ES_INSTANCIA_DE recorre la cadena de herencia completa. C hereda de B que hereda de A, por lo que una instancia de C también es instancia de B y de A.",
    hint: null,
  },
  {
    id: "her_015",
    topic: "herencia",
    difficulty: "dificil",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Vehiculo:
  privado velocidad = 0
  METODO acelerar(n): yo.velocidad = yo.velocidad + n
  PROPIEDAD speed: RETORNA yo.velocidad

CLASE Auto HEREDA Vehiculo:
  METODO turbo(): yo.acelerar(50)

a = NUEVO Auto()
a.acelerar(30); a.turbo()
IMPRIMIR a.speed`,
    options: ["80", "50", "30", "Error"],
    correctIndex: 0,
    explanation: "Auto hereda acelerar() y la propiedad speed de Vehiculo. acelerar(30) → velocidad=30, turbo() llama acelerar(50) → velocidad=80.",
    hint: null,
  },

  // ══════════════════════════════════════
  // POLIMORFISMO
  // ══════════════════════════════════════

  // --- FÁCIL ---
  {
    id: "pol_001",
    topic: "polimorfismo",
    difficulty: "facil",
    question: "¿Qué es el polimorfismo en POO?",
    code: null,
    options: [
      "Diferentes clases responden al mismo mensaje de forma distinta",
      "Heredar de múltiples clases",
      "Ocultar los datos internos de una clase",
      "Crear múltiples constructores",
    ],
    correctIndex: 0,
    explanation: "Polimorfismo ('muchas formas') permite que objetos de distintas clases respondan al mismo método de manera específica a su tipo. Es un pilar clave de POO.",
    hint: "'Poli' = muchos, 'morfo' = forma. El mismo método, muchos comportamientos distintos.",
  },
  {
    id: "pol_002",
    topic: "polimorfismo",
    difficulty: "facil",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Animal:
  METODO hablar(): RETORNA "..."
CLASE Perro HEREDA Animal:
  METODO hablar(): RETORNA "¡Guau!"
CLASE Gato HEREDA Animal:
  METODO hablar(): RETORNA "¡Miau!"

g = NUEVO Gato()
IMPRIMIR g.hablar()`,
    options: ['"¡Miau!"', '"..."', '"¡Guau!"', "Error"],
    correctIndex: 0,
    explanation: "Gato sobreescribe hablar() de Animal. El sistema ejecuta la versión de Gato, retornando '¡Miau!'.",
    hint: "El sistema busca el método primero en la clase del objeto — si lo tiene, lo usa sin subir al padre.",
  },
  {
    id: "pol_008",
    topic: "polimorfismo",
    difficulty: "facil",
    question: "¿Qué significa 'sobreescribir' un método en POO?",
    code: null,
    options: [
      "Redefinir en la clase hija un método que ya existe en el padre",
      "Definir un método con el mismo nombre pero distinto número de parámetros",
      "Hacer privado un método público del padre",
      "Eliminar un método heredado",
    ],
    correctIndex: 0,
    explanation: "La sobreescritura (override) permite que una clase hija proporcione su propia implementación de un método heredado. Simplemente se redefine en la clase hija.",
    hint: "'Sobreescribir' = escribir encima. La clase hija escribe su propia versión encima del método del padre.",
  },
  {
    id: "pol_009",
    topic: "polimorfismo",
    difficulty: "facil",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Forma: METODO nombre(): RETORNA "Forma"
CLASE Circulo HEREDA Forma: METODO nombre(): RETORNA "Circulo"
CLASE Cuadrado HEREDA Forma: METODO nombre(): RETORNA "Cuadrado"

formas = [NUEVO Forma(), NUEVO Circulo(), NUEVO Cuadrado()]
IMPRIMIR formas[0].nombre() + ", " + formas[1].nombre() + ", " + formas[2].nombre()`,
    options: ['"Forma, Circulo, Cuadrado"', '"Forma, Forma, Forma"', '"Circulo, Cuadrado, Forma"', "Error"],
    correctIndex: 0,
    explanation: "Cada objeto responde con su propia versión de nombre(). El mismo método produce resultados distintos según el tipo. Eso es polimorfismo en su expresión más directa.",
    hint: "Cada clase tiene su propia versión del método — todas se llaman igual pero hacen cosas distintas.",
  },
  {
    id: "pol_010",
    topic: "polimorfismo",
    difficulty: "facil",
    question: "¿Qué ventaja ofrece el polimorfismo al trabajar con colecciones de objetos?",
    code: null,
    options: [
      "Permite procesar objetos de distintos tipos con el mismo código",
      "Garantiza que todos los objetos sean iguales",
      "Elimina la necesidad de constructores",
      "Aumenta automáticamente el rendimiento",
    ],
    correctIndex: 0,
    explanation: "Con polimorfismo puedes iterar un arreglo con objetos de tipos distintos y llamar el mismo método en todos. Cada objeto responde según su implementación.",
    hint: "Imagina una función que llama .hablar() en cualquier Animal — sin importar si es Perro, Gato o Pájaro.",
  },

  // --- MEDIO ---
  {
    id: "pol_003",
    topic: "polimorfismo",
    difficulty: "medio",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Forma: METODO area(): RETORNA 0
CLASE Cuadrado HEREDA Forma:
  CONSTRUCTOR(l): yo.l = l
  METODO area(): RETORNA yo.l * yo.l
CLASE Triangulo HEREDA Forma:
  CONSTRUCTOR(b, h): yo.b = b; yo.h = h
  METODO area(): RETORNA (yo.b * yo.h) / 2

formas = [NUEVO Cuadrado(3), NUEVO Triangulo(4, 6)]
IMPRIMIR formas[0].area() + ", " + formas[1].area()`,
    options: ['"9, 12"', '"0, 0"', '"9, 24"', "Error"],
    correctIndex: 0,
    explanation: "Cuadrado.area() = 3² = 9. Triangulo.area() = (4×6)/2 = 12. El mismo método area() produce resultados distintos según el tipo — eso es polimorfismo.",
    hint: null,
  },
  {
    id: "pol_004",
    topic: "polimorfismo",
    difficulty: "medio",
    question: "¿Qué concepto describe usar objetos de distintas clases sin herencia, siempre que compartan el mismo método?",
    code: null,
    options: [
      "Duck typing",
      "Type casting",
      "Herencia múltiple",
      "Sobrecarga de métodos",
    ],
    correctIndex: 0,
    explanation: "Duck typing: 'Si camina como pato y hace cuac como pato, es un pato'. No se requiere herencia formal; basta que los objetos tengan los métodos esperados.",
    hint: null,
  },
  {
    id: "pol_005",
    topic: "polimorfismo",
    difficulty: "medio",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Notificacion:
  METODO enviar(): RETORNA "notificación"

CLASE Email HEREDA Notificacion:
  METODO enviar(): RETORNA "email: " + SUPER.enviar()

e = NUEVO Email()
IMPRIMIR e.enviar()`,
    options: ['"email: notificación"', '"notificación"', '"email: email: notificación"', "Error"],
    correctIndex: 0,
    explanation: "Email.enviar() llama SUPER.enviar() (retorna 'notificación') y lo concatena. Resultado: 'email: notificación'. Extiende el comportamiento sin reemplazarlo.",
    hint: null,
  },
  {
    id: "pol_011",
    topic: "polimorfismo",
    difficulty: "medio",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Impuesto:
  METODO calcular(base): RETORNA base * 0.16
CLASE Reducido HEREDA Impuesto:
  METODO calcular(base): RETORNA base * 0.08
CLASE Especial HEREDA Impuesto:
  METODO calcular(base): RETORNA SUPER.calcular(base) + 50

t1 = NUEVO Impuesto(); t2 = NUEVO Reducido(); t3 = NUEVO Especial()
IMPRIMIR t1.calcular(1000) + ", " + t2.calcular(1000) + ", " + t3.calcular(1000)`,
    options: ['"160, 80, 210"', '"160, 160, 160"', '"160, 80, 160"', "Error"],
    correctIndex: 0,
    explanation: "Impuesto: 1000×0.16=160. Reducido: 1000×0.08=80. Especial: SUPER.calcular(1000)+50 = 160+50=210.",
    hint: null,
  },
  {
    id: "pol_012",
    topic: "polimorfismo",
    difficulty: "medio",
    question: "¿Qué imprime este pseudocódigo?",
    code: `METODO procesar(obj):
  SI obj TIENE_METODO ejecutar:
    RETORNA obj.ejecutar()
  SINO: RETORNA "no soportado"

tarea = { ejecutar: () => "tarea hecha" }
dato  = { valor: 42 }
IMPRIMIR procesar(tarea) + " | " + procesar(dato)`,
    options: ['"tarea hecha | no soportado"', '"no soportado | no soportado"', "Error", '"tarea hecha | 42"'],
    correctIndex: 0,
    explanation: "Duck typing: procesar() verifica si el objeto tiene el método ejecutar. 'tarea' lo tiene; 'dato' no. El segundo retorna 'no soportado'. Polimorfismo sin herencia.",
    hint: null,
  },

  // --- DIFÍCIL ---
  {
    id: "pol_006",
    topic: "polimorfismo",
    difficulty: "dificil",
    question: "¿Qué imprime este pseudocódigo?",
    code: `METODO reproducir(media):
  RETORNA media.play()

video = { play: () => "▶ video" }
audio = { play: () => "♪ audio" }
IMPRIMIR reproducir(video) + " | " + reproducir(audio)`,
    options: ['"▶ video | ♪ audio"', '"♪ audio | ▶ video"', "Error", '"indefinido | indefinido"'],
    correctIndex: 0,
    explanation: "Duck typing en acción: reproducir() no requiere herencia, solo que los objetos tengan play(). Ambos objetos lo cumplen — polimorfismo sin clases formales.",
    hint: null,
  },
  {
    id: "pol_007",
    topic: "polimorfismo",
    difficulty: "dificil",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Logger:
  METODO log(msg): RETORNA "[LOG] " + msg

CLASE ErrorLogger HEREDA Logger:
  METODO log(msg): RETORNA "[ERROR] " + SUPER.log(msg)

el = NUEVO ErrorLogger()
IMPRIMIR el.log("fallo")`,
    options: ['"[ERROR] [LOG] fallo"', '"[LOG] fallo"', '"[ERROR] fallo"', '"[LOG] [ERROR] fallo"'],
    correctIndex: 0,
    explanation: "ErrorLogger.log() invoca SUPER.log('fallo') → '[LOG] fallo', luego envuelve: '[ERROR] [LOG] fallo'. Decoración del comportamiento padre.",
    hint: null,
  },
  {
    id: "pol_013",
    topic: "polimorfismo",
    difficulty: "dificil",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Cuadrado: METODO dibujar(): RETORNA "■"
CLASE Circulo:  METODO dibujar(): RETORNA "●"
CLASE Triangulo: METODO dibujar(): RETORNA "▲"

figuras = [NUEVO Cuadrado(), NUEVO Circulo(), NUEVO Triangulo(), NUEVO Cuadrado()]
resultado = ""
PARA CADA f EN figuras: resultado = resultado + f.dibujar() + " "
IMPRIMIR resultado`,
    options: ['"■ ● ▲ ■ "', '"Cuadrado Circulo Triangulo Cuadrado"', "Error", '"dibujar dibujar dibujar dibujar"'],
    correctIndex: 0,
    explanation: "El bucle no conoce los tipos concretos — solo llama dibujar() en cada uno. Cada clase lo implementa a su manera. Polimorfismo orientado a interfaz.",
    hint: null,
  },
  {
    id: "pol_014",
    topic: "polimorfismo",
    difficulty: "dificil",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Despachador:
  privado manejadores = {}
  METODO on(evento, fn): yo.manejadores[evento] = fn
  METODO emitir(evento, arg):
    SI yo.manejadores[evento] EXISTE: RETORNA yo.manejadores[evento](arg)

d = NUEVO Despachador()
d.on("doble", (x) => x * 2)
d.on("texto", (s) => MAYUSCULAS(s))
IMPRIMIR d.emitir("doble", 5) + " " + d.emitir("texto", "hola")`,
    options: ['"10 HOLA"', '"indefinido indefinido"', "Error", '"5 hola"'],
    correctIndex: 0,
    explanation: "emitir() busca el manejador por nombre y lo llama con el argumento. 'doble' retorna 5×2=10. 'texto' retorna 'hola' en mayúsculas = 'HOLA'. Mismo dispatch, distintos comportamientos.",
    hint: null,
  },
  {
    id: "pol_015",
    topic: "polimorfismo",
    difficulty: "dificil",
    question: "¿Cuál es la diferencia principal entre sobrecarga y sobreescritura?",
    code: null,
    options: [
      "Sobrecarga: mismo nombre, distintos parámetros. Sobreescritura: la hija redefine el método del padre",
      "Sobrecarga es para clases, sobreescritura para funciones sueltas",
      "Son sinónimos en POO",
      "Sobrecarga usa SUPER, sobreescritura no",
    ],
    correctIndex: 0,
    explanation: "Sobrecarga (overloading): mismo nombre, distintas firmas de parámetros — no todos los lenguajes la soportan nativamente. Sobreescritura (override): la clase hija redefine el método heredado.",
    hint: null,
  },

  // ══════════════════════════════════════
  // ENCAPSULAMIENTO
  // ══════════════════════════════════════

  // --- FÁCIL ---
  {
    id: "enc_001",
    topic: "encapsulamiento",
    difficulty: "facil",
    question: "¿Qué principio POO oculta los detalles internos de un objeto y expone solo lo necesario?",
    code: null,
    options: ["Encapsulamiento", "Herencia", "Polimorfismo", "Abstracción"],
    correctIndex: 0,
    explanation: "El encapsulamiento protege el estado interno de un objeto. Se logra con campos privados y getters/setters que controlan el acceso desde el exterior.",
    hint: "Este principio 'encapsula' los datos dentro del objeto — como una cápsula que protege su contenido.",
  },
  {
    id: "enc_002",
    topic: "encapsulamiento",
    difficulty: "facil",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Caja:
  privado contenido
  CONSTRUCTOR(item): yo.contenido = item
  METODO abrir(): RETORNA yo.contenido

c = NUEVO Caja("regalo")
IMPRIMIR c.abrir()`,
    options: ['"regalo"', "indefinido", "Error", '"contenido"'],
    correctIndex: 0,
    explanation: "'contenido' es privado, solo accesible dentro de la clase. abrir() actúa como interfaz pública controlada para leer el valor interno.",
    hint: "abrir() es la única puerta de acceso al campo privado — sin ella, el contenido es inaccesible desde fuera.",
  },
  {
    id: "enc_007",
    topic: "encapsulamiento",
    difficulty: "facil",
    question: "En POO moderna, ¿cómo se marca un campo como privado?",
    code: null,
    options: [
      "Con el prefijo # o la palabra clave 'privado'",
      "Con la palabra clave 'protected'",
      "Con guión bajo _ por convención",
      "Con la palabra clave 'internal'",
    ],
    correctIndex: 0,
    explanation: "El prefijo # (en JS/C#) o la palabra clave 'private' (en Java/C++) marcan un campo como inaccesible fuera de la clase. Es la única forma nativa de privacidad real.",
    hint: "Es un modificador especial que va pegado al nombre del campo — muy poderoso aunque parezca pequeño.",
  },
  {
    id: "enc_008",
    topic: "encapsulamiento",
    difficulty: "facil",
    question: "¿Qué función cumple un getter en una clase?",
    code: null,
    options: [
      "Permite leer un valor interno de forma controlada",
      "Establece el valor de un campo privado",
      "Inicializa el objeto al crearlo",
      "Retorna una copia del objeto",
    ],
    correctIndex: 0,
    explanation: "Un getter (PROPIEDAD en pseudocódigo) se accede como propiedad pero ejecuta lógica interna. Controla cómo se lee un dato interno — puede validar, calcular o transformar.",
    hint: "'Get' = obtener. Un getter te permite leer un valor — posiblemente transformado o protegido.",
  },
  {
    id: "enc_009",
    topic: "encapsulamiento",
    difficulty: "facil",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Circulo:
  CONSTRUCTOR(r): yo.r = r
  PROPIEDAD area: RETORNA 3.14 * yo.r * yo.r

c = NUEVO Circulo(2)
IMPRIMIR c.area`,
    options: ["12.56", "6.28", "3.14", "Error"],
    correctIndex: 0,
    explanation: "La propiedad 'area' calcula 3.14 × 2² = 3.14 × 4 = 12.56. Se accede como propiedad (c.area, sin paréntesis), aunque ejecuta código interno.",
    hint: "Los getters se usan como propiedades, no como métodos — sin paréntesis al accederlos.",
  },

  // --- MEDIO ---
  {
    id: "enc_003",
    topic: "encapsulamiento",
    difficulty: "medio",
    question: "¿Qué ocurre al intentar acceder a un campo privado desde fuera de la clase?",
    code: `CLASE Secreto:
  privado clave = "abc123"

s = NUEVO Secreto()
IMPRIMIR s.clave`,
    options: ["Error de acceso", '"abc123"', "indefinido", '"clave"'],
    correctIndex: 0,
    explanation: "Acceder a un campo privado desde fuera de la clase produce un error. La restricción es a nivel de lenguaje, no solo de convención.",
    hint: null,
  },
  {
    id: "enc_004",
    topic: "encapsulamiento",
    difficulty: "medio",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Temperatura:
  privado celsius
  CONSTRUCTOR(c): yo.celsius = c
  PROPIEDAD fahrenheit:
    RETORNA yo.celsius * 9 / 5 + 32

t = NUEVO Temperatura(100)
IMPRIMIR t.fahrenheit`,
    options: ["212", "100", "373", "Error"],
    correctIndex: 0,
    explanation: "El getter fahrenheit convierte celsius a Fahrenheit: 100 × 9/5 + 32 = 212. Los getters permiten acceso de solo lectura de forma controlada.",
    hint: null,
  },
  {
    id: "enc_010",
    topic: "encapsulamiento",
    difficulty: "medio",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Usuario:
  privado nombre
  CONSTRUCTOR(n): yo.nombre = RECORTAR(n)
  PROPIEDAD nombre: RETORNA yo.nombre
  SETTER nombre(v):
    SI LARGO(RECORTAR(v)) < 3: LANZAR "Demasiado corto"
    yo.nombre = RECORTAR(v)

u = NUEVO Usuario("  Ana  ")
IMPRIMIR u.nombre`,
    options: ['"Ana"', '"  Ana  "', "Error", "indefinido"],
    correctIndex: 0,
    explanation: "El constructor pasa el nombre por RECORTAR() antes de asignarlo. \"  Ana  \" recortado = \"Ana\". La propiedad devuelve el valor limpio.",
    hint: null,
  },
  {
    id: "enc_011",
    topic: "encapsulamiento",
    difficulty: "medio",
    question: "¿Qué ventaja tiene usar setters con validación en lugar de asignar directamente a la propiedad?",
    code: null,
    options: [
      "Garantiza que el estado interno sea siempre válido (invariante de clase)",
      "Hace el código más rápido",
      "Permite herencia múltiple",
      "Elimina la necesidad de constructores",
    ],
    correctIndex: 0,
    explanation: "Un setter con validación actúa como guardián del estado. Ningún código externo puede dejar el objeto en estado inválido, ya que toda asignación pasa por la lógica de verificación.",
    hint: null,
  },
  {
    id: "enc_012",
    topic: "encapsulamiento",
    difficulty: "medio",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Contador:
  privado maximo
  privado actual = 0
  CONSTRUCTOR(max): yo.maximo = max
  METODO subir():
    SI yo.actual < yo.maximo: yo.actual = yo.actual + 1
  PROPIEDAD valor: RETORNA yo.actual

c = NUEVO Contador(3)
c.subir(); c.subir(); c.subir(); c.subir()
IMPRIMIR c.valor`,
    options: ["3", "4", "2", "0"],
    correctIndex: 0,
    explanation: "El contador tiene maximo=3. Incrementa: 0→1→2→3. En el 4to intento ya está en 3 (=maximo), el SI lo bloquea. El valor final es 3.",
    hint: null,
  },

  // --- DIFÍCIL ---
  {
    id: "enc_005",
    topic: "encapsulamiento",
    difficulty: "dificil",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Edad:
  privado valor
  CONSTRUCTOR(n): yo.valor = SI n < 0 ENTONCES 0 SINO n
  PROPIEDAD valor: RETORNA yo.valor
  SETTER valor(n): yo.valor = SI n < 0 ENTONCES 0 SINO n

e = NUEVO Edad(25)
e.valor = -10
IMPRIMIR e.valor`,
    options: ["0", "-10", "25", "Error"],
    correctIndex: 0,
    explanation: "El setter valida el input: si n < 0, asigna 0. Al pasar -10, el setter lo convierte a 0. El getter retorna ese valor protegido.",
    hint: null,
  },
  {
    id: "enc_006",
    topic: "encapsulamiento",
    difficulty: "dificil",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Cuenta:
  privado saldo = 0
  METODO depositar(n): SI n > 0: yo.saldo = yo.saldo + n
  METODO retirar(n):
    SI n > 0 Y n <= yo.saldo: yo.saldo = yo.saldo - n
  PROPIEDAD saldo: RETORNA yo.saldo

c = NUEVO Cuenta()
c.depositar(1000); c.retirar(300); c.retirar(800)
IMPRIMIR c.saldo`,
    options: ["700", "300", "1000", "-100"],
    correctIndex: 0,
    explanation: "Depósito: 1000. Retiro 300: saldo=700. Retiro 800: 800 > 700, se rechaza. Saldo final: 700. El encapsulamiento impide que el saldo quede negativo.",
    hint: null,
  },
  {
    id: "enc_013",
    topic: "encapsulamiento",
    difficulty: "dificil",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Pila:
  privado items = []
  METODO apilar(v): yo.items.agregar(v)
  METODO desapilar(): RETORNA yo.items.extraerUltimo()
  PROPIEDAD tamaño: RETORNA yo.items.tamaño
  PROPIEDAD vacia: RETORNA yo.items.tamaño == 0

p = NUEVO Pila()
p.apilar(1); p.apilar(2); p.apilar(3)
p.desapilar()
IMPRIMIR p.tamaño + " " + p.vacia`,
    options: ['"2 falso"', '"3 falso"', '"1 falso"', '"2 verdadero"'],
    correctIndex: 0,
    explanation: "apilar×3 → [1,2,3], tamaño=3. desapilar() elimina 3 → [1,2], tamaño=2. vacia: 2 > 0 → falso. Output: \"2 falso\".",
    hint: null,
  },
  {
    id: "enc_014",
    topic: "encapsulamiento",
    difficulty: "dificil",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Config:
  privado datos = {}
  METODO set(k, v):
    SI NO es_texto(k): LANZAR "Clave debe ser texto"
    yo.datos[k] = v; RETORNA yo
  METODO get(k): RETORNA yo.datos[k]
  METODO tiene(k): RETORNA yo.datos CONTIENE k

cfg = NUEVO Config()
cfg.set("host", "local").set("port", 3000)
IMPRIMIR cfg.tiene("port") + " " + cfg.get("host")`,
    options: ['"verdadero local"', '"falso local"', "Error", '"verdadero indefinido"'],
    correctIndex: 0,
    explanation: "set() retorna 'yo' permitiendo encadenamiento. Tras las dos llamadas, datos tiene host y port. tiene(\"port\") → verdadero. get(\"host\") → \"local\".",
    hint: null,
  },
  {
    id: "enc_015",
    topic: "encapsulamiento",
    difficulty: "dificil",
    question: "¿Qué imprime este pseudocódigo?",
    code: `CLASE Singleton:
  privado ESTATICO instancia = nulo
  privado valor
  CONSTRUCTOR(v): yo.valor = v
  ESTATICO METODO getInstance(v):
    SI Singleton.instancia == nulo:
      Singleton.instancia = NUEVO Singleton(v)
    RETORNA Singleton.instancia

a = Singleton.getInstance("primera")
b = Singleton.getInstance("segunda")
IMPRIMIR (a == b) + " " + b.valor`,
    options: ['"verdadero primera"', '"falso segunda"', '"verdadero segunda"', '"falso primera"'],
    correctIndex: 0,
    explanation: "La primera llamada crea la instancia con 'primera'. La segunda devuelve la misma (ya existe). a == b es verdadero. b.valor es 'primera' — el Singleton no cambia su valor.",
    hint: null,
  },
];
