export const challenges = [
  // ══════════════════════════════════════
  // CLASES
  // ══════════════════════════════════════
  {
    id: "cls_001",
    topic: "clases",
    difficulty: "facil",
    question: "¿Qué función especial se ejecuta automáticamente al crear una instancia con 'new'?",
    code: null,
    options: ["constructor", "init", "create", "start"],
    correctIndex: 0,
    explanation: "El método 'constructor' es el único que se invoca automáticamente al usar 'new'. Aquí se inicializan las propiedades del nuevo objeto."
  },
  {
    id: "cls_002",
    topic: "clases",
    difficulty: "facil",
    question: "¿Qué imprime este código?",
    code: `class Coche {\n  constructor(marca) {\n    this.marca = marca;\n  }\n}\nconst c = new Coche("Toyota");\nconsole.log(c.marca);`,
    options: ['"Toyota"', '"marca"', "undefined", '"Coche"'],
    correctIndex: 0,
    explanation: "En el constructor, 'this.marca = marca' asigna el argumento al objeto. Al acceder a c.marca obtenemos \"Toyota\"."
  },
  {
    id: "cls_003",
    topic: "clases",
    difficulty: "medio",
    question: "¿Qué imprime este código?",
    code: `class Contador {\n  count = 0;\n  incrementar() { this.count++; }\n  valor() { return this.count; }\n}\nconst c = new Contador();\nc.incrementar();\nc.incrementar();\nc.incrementar();\nconsole.log(c.valor());`,
    options: ["3", "0", "1", "undefined"],
    correctIndex: 0,
    explanation: "El campo 'count = 0' se inicializa por instancia. Cada llamada a incrementar() lo sube en 1. Tras tres llamadas, valor() retorna 3."
  },
  {
    id: "cls_004",
    topic: "clases",
    difficulty: "medio",
    question: "¿Cuál es la diferencia entre un método estático y uno de instancia?",
    code: null,
    options: [
      "El estático se llama con la clase, sin instancia",
      "El estático puede acceder a 'this'",
      "Los de instancia son más rápidos",
      "No hay diferencia en JavaScript"
    ],
    correctIndex: 0,
    explanation: "Los métodos estáticos se invocan sobre la clase (Clase.metodo()) y no tienen 'this' de instancia. Los de instancia requieren un objeto creado con 'new'."
  },
  {
    id: "cls_005",
    topic: "clases",
    difficulty: "medio",
    question: "¿Qué imprime este código?",
    code: `class Animal {\n  constructor(nombre) {\n    this.nombre = nombre;\n  }\n  presentarse() {\n    return \`Soy \${this.nombre}\`;\n  }\n}\nconst a = new Animal("León");\nconsole.log(a.presentarse());`,
    options: ['"Soy León"', '"Soy nombre"', "Error", '"León"'],
    correctIndex: 0,
    explanation: "El template literal interpola this.nombre (que es \"León\") dentro del string retornado por presentarse()."
  },
  {
    id: "cls_006",
    topic: "clases",
    difficulty: "dificil",
    question: "¿Puede una clase en JavaScript tener más de un método constructor?",
    code: null,
    options: [
      "No, lanza SyntaxError",
      "Sí, hasta dos",
      "Sí, con distintos parámetros",
      "Sí, si uno es estático"
    ],
    correctIndex: 0,
    explanation: "JavaScript solo permite un único 'constructor' por clase. Definir más de uno lanza SyntaxError. Para múltiples formas de inicialización se usan parámetros por defecto o factory methods."
  },
  {
    id: "cls_007",
    topic: "clases",
    difficulty: "dificil",
    question: "¿Qué imprime este código?",
    code: `class Rectangulo {\n  constructor(w, h) {\n    this.w = w;\n    this.h = h;\n  }\n  area() { return this.w * this.h; }\n  perimetro() { return 2 * (this.w + this.h); }\n}\nconst r = new Rectangulo(4, 5);\nconsole.log(r.area() + r.perimetro());`,
    options: ["38", "20", "18", "40"],
    correctIndex: 0,
    explanation: "area() = 4 × 5 = 20. perimetro() = 2 × (4 + 5) = 18. La suma es 38."
  },

  // ══════════════════════════════════════
  // OBJETOS
  // ══════════════════════════════════════
  {
    id: "obj_001",
    topic: "objetos",
    difficulty: "facil",
    question: "¿Qué imprime este código?",
    code: `class Libro {}\nconst l = new Libro();\nconsole.log(typeof l);`,
    options: ['"object"', '"class"', '"Libro"', '"function"'],
    correctIndex: 0,
    explanation: "En JavaScript, typeof siempre retorna 'object' para instancias de clases, ya que son objetos en el heap. Las clases en sí retornarían 'function'."
  },
  {
    id: "obj_002",
    topic: "objetos",
    difficulty: "facil",
    question: "¿Qué imprime este código?",
    code: `class Punto {\n  constructor(x, y) {\n    this.x = x;\n    this.y = y;\n  }\n}\nconst p1 = new Punto(1, 2);\nconst p2 = new Punto(3, 4);\nconsole.log(p1.x + p2.x);`,
    options: ["4", "2", "3", "6"],
    correctIndex: 0,
    explanation: "Cada instancia tiene sus propias propiedades independientes. p1.x = 1, p2.x = 3. La suma es 4."
  },
  {
    id: "obj_003",
    topic: "objetos",
    difficulty: "medio",
    question: "¿Qué imprime este código?",
    code: `class Config {}\nconst a = new Config();\nconst b = new Config();\nconsole.log(a === b);`,
    options: ["false", "true", "undefined", "Error"],
    correctIndex: 0,
    explanation: "=== compara referencias, no contenido. Aunque a y b son de la misma clase, son objetos distintos en memoria. La comparación retorna false."
  },
  {
    id: "obj_004",
    topic: "objetos",
    difficulty: "medio",
    question: "¿Qué imprime este código?",
    code: `class Config {\n  constructor() { this.debug = true; }\n  toggle() { this.debug = !this.debug; }\n}\nconst a = new Config();\nconst b = a;\na.toggle();\nconsole.log(b.debug);`,
    options: ["false", "true", "undefined", "Error"],
    correctIndex: 0,
    explanation: "'const b = a' no copia el objeto, copia la referencia. Ambas variables apuntan al mismo objeto en memoria. Al llamar a.toggle(), b.debug también cambia."
  },
  {
    id: "obj_005",
    topic: "objetos",
    difficulty: "medio",
    question: "¿Qué imprime este código?",
    code: `class Vehiculo {}\nclass Moto extends Vehiculo {}\nconst m = new Moto();\nconsole.log(m instanceof Vehiculo);`,
    options: ["true", "false", "Error", "undefined"],
    correctIndex: 0,
    explanation: "instanceof recorre la cadena de prototipos. Como Moto extiende Vehiculo, las instancias de Moto también son instancias de Vehiculo."
  },
  {
    id: "obj_006",
    topic: "objetos",
    difficulty: "dificil",
    question: "¿Qué imprime este código?",
    code: `class Animal {\n  constructor(nombre) { this.nombre = nombre; }\n}\nconst gato = new Animal("Gato");\ngato.velocidad = 50;\nconsole.log(gato.velocidad);`,
    options: ["50", "undefined", "Error", "null"],
    correctIndex: 0,
    explanation: "Se puede añadir propiedades a una instancia después de crearla. 'gato.velocidad = 50' crea una propiedad propia solo en ese objeto, sin afectar a Animal ni otras instancias."
  },
  {
    id: "obj_007",
    topic: "objetos",
    difficulty: "dificil",
    question: "¿Qué imprime este código?",
    code: `class Persona {\n  constructor(nombre) { this.nombre = nombre; }\n  saludar() { return "Hola"; }\n}\nconst p = new Persona("Ana");\nconsole.log("nombre" in p);`,
    options: ["true", "false", "Error", '"nombre"'],
    correctIndex: 0,
    explanation: "El operador 'in' verifica si una propiedad existe en el objeto o en su cadena de prototipos. 'nombre' es una propiedad propia de p, por lo que retorna true."
  },

  // ══════════════════════════════════════
  // HERENCIA
  // ══════════════════════════════════════
  {
    id: "her_001",
    topic: "herencia",
    difficulty: "facil",
    question: "¿Qué palabra clave se usa en JavaScript para que una clase herede de otra?",
    code: null,
    options: ["extends", "inherits", "super", "implements"],
    correctIndex: 0,
    explanation: "'extends' establece la relación de herencia: class Hijo extends Padre. El hijo hereda todos los métodos y propiedades del padre."
  },
  {
    id: "her_002",
    topic: "herencia",
    difficulty: "facil",
    question: "¿Qué imprime este código?",
    code: `class Vehiculo {\n  tipo() { return "vehículo"; }\n}\nclass Coche extends Vehiculo {}\nconst c = new Coche();\nconsole.log(c.tipo());`,
    options: ['"vehículo"', "undefined", '"Coche"', "Error"],
    correctIndex: 0,
    explanation: "Coche hereda tipo() de Vehiculo. Al no definir su propio tipo(), JS lo busca en la cadena de prototipos y ejecuta el del padre."
  },
  {
    id: "her_003",
    topic: "herencia",
    difficulty: "medio",
    question: "¿Qué imprime este código?",
    code: `class Figura {\n  constructor(color) { this.color = color; }\n}\nclass Circulo extends Figura {\n  constructor(color, radio) {\n    super(color);\n    this.radio = radio;\n  }\n}\nconst c = new Circulo("rojo", 5);\nconsole.log(c.color + " " + c.radio);`,
    options: ['"rojo 5"', '"undefined undefined"', "Error", '"5 rojo"'],
    correctIndex: 0,
    explanation: "super(color) invoca el constructor de Figura, que asigna this.color = 'rojo'. Luego this.radio = 5. Ambas propiedades quedan en la instancia."
  },
  {
    id: "her_004",
    topic: "herencia",
    difficulty: "medio",
    question: "¿Puede una clase de JavaScript heredar de múltiples clases a la vez?",
    code: null,
    options: [
      "No, solo herencia simple",
      "Sí, con 'extends Clase1, Clase2'",
      "Sí, automáticamente con mixins",
      "Sí, con 'implements'"
    ],
    correctIndex: 0,
    explanation: "JavaScript solo soporta herencia simple: una clase puede extender de una sola clase padre. Para reutilizar múltiples comportamientos se usan mixins o composición de forma manual."
  },
  {
    id: "her_005",
    topic: "herencia",
    difficulty: "medio",
    question: "¿Qué imprime este código?",
    code: `class A {\n  saludo() { return "Hola desde A"; }\n}\nclass B extends A {\n  saludo() { return "Hola desde B"; }\n}\nconst b = new B();\nconsole.log(b.saludo());`,
    options: ['"Hola desde B"', '"Hola desde A"', "Error", '"Hola desde A y B"'],
    correctIndex: 0,
    explanation: "La clase hija sobreescribe el método del padre. JS busca primero en la instancia/clase hija antes de subir al padre. El método de B tiene prioridad."
  },
  {
    id: "her_006",
    topic: "herencia",
    difficulty: "dificil",
    question: "¿Qué imprime este código?",
    code: `class A {\n  m() { return "A"; }\n}\nclass B extends A {\n  m() { return super.m() + "B"; }\n}\nclass C extends B {\n  m() { return super.m() + "C"; }\n}\nconst c = new C();\nconsole.log(c.m());`,
    options: ['"ABC"', '"CBA"', '"AB"', '"CB"'],
    correctIndex: 0,
    explanation: "C.m() llama super.m() (B) + 'C'. B.m() llama super.m() (A) + 'B'. A.m() retorna 'A'. Se construye de adentro hacia afuera: 'A' + 'B' + 'C' = 'ABC'."
  },
  {
    id: "her_007",
    topic: "herencia",
    difficulty: "dificil",
    question: "¿Qué imprime este código?",
    code: `class Base {\n  constructor(x) { this.x = x; }\n  doble() { return this.x * 2; }\n}\nclass Derivada extends Base {\n  constructor(x, y) {\n    super(x);\n    this.y = y;\n  }\n  suma() { return this.doble() + this.y; }\n}\nconst d = new Derivada(5, 3);\nconsole.log(d.suma());`,
    options: ["13", "10", "8", "15"],
    correctIndex: 0,
    explanation: "super(5) asigna this.x = 5. this.y = 3. doble() retorna 5 × 2 = 10. suma() retorna 10 + 3 = 13."
  },

  // ══════════════════════════════════════
  // POLIMORFISMO
  // ══════════════════════════════════════
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
      "Crear múltiples constructores"
    ],
    correctIndex: 0,
    explanation: "Polimorfismo ('muchas formas') permite que objetos de distintas clases respondan al mismo método de manera específica a su tipo. Es un pilar clave de POO."
  },
  {
    id: "pol_002",
    topic: "polimorfismo",
    difficulty: "facil",
    question: "¿Qué imprime este código?",
    code: `class Animal {\n  hablar() { return "..."; }\n}\nclass Perro extends Animal {\n  hablar() { return "¡Guau!"; }\n}\nclass Gato extends Animal {\n  hablar() { return "¡Miau!"; }\n}\nconst g = new Gato();\nconsole.log(g.hablar());`,
    options: ['"¡Miau!"', '"..."', '"¡Guau!"', "Error"],
    correctIndex: 0,
    explanation: "Gato sobreescribe hablar() de Animal. JS ejecuta la versión de Gato, retornando '¡Miau!'."
  },
  {
    id: "pol_003",
    topic: "polimorfismo",
    difficulty: "medio",
    question: "¿Qué imprime este código?",
    code: `class Forma {\n  area() { return 0; }\n}\nclass Cuadrado extends Forma {\n  constructor(l) { super(); this.l = l; }\n  area() { return this.l ** 2; }\n}\nclass Triangulo extends Forma {\n  constructor(b, h) { super(); this.b = b; this.h = h; }\n  area() { return (this.b * this.h) / 2; }\n}\nconst formas = [new Cuadrado(3), new Triangulo(4, 6)];\nconsole.log(formas.map(f => f.area()).join(", "));`,
    options: ['"9, 12"', '"0, 0"', '"9, 24"', "Error"],
    correctIndex: 0,
    explanation: "Cuadrado.area() = 3² = 9. Triangulo.area() = (4×6)/2 = 12. El mismo método area() produce resultados distintos según el tipo. Eso es polimorfismo."
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
      "Sobrecarga de métodos"
    ],
    correctIndex: 0,
    explanation: "Duck typing: 'Si camina como pato y hace cuac como pato, es un pato'. JS no requiere herencia formal; basta que los objetos tengan los métodos esperados."
  },
  {
    id: "pol_005",
    topic: "polimorfismo",
    difficulty: "medio",
    question: "¿Qué imprime este código?",
    code: `class Notificacion {\n  enviar() { return "notificación"; }\n}\nclass Email extends Notificacion {\n  enviar() { return "email: " + super.enviar(); }\n}\nconst e = new Email();\nconsole.log(e.enviar());`,
    options: ['"email: notificación"', '"notificación"', '"email: email: notificación"', "Error"],
    correctIndex: 0,
    explanation: "Email.enviar() llama super.enviar() (retorna 'notificación') y lo concatena. Resultado: 'email: notificación'. Extiende el comportamiento sin reemplazarlo."
  },
  {
    id: "pol_006",
    topic: "polimorfismo",
    difficulty: "dificil",
    question: "¿Qué imprime este código?",
    code: `function reproducir(media) {\n  return media.play();\n}\nconst video = { play: () => "▶ video" };\nconst audio = { play: () => "♪ audio" };\nconsole.log(reproducir(video) + " | " + reproducir(audio));`,
    options: ['"▶ video | ♪ audio"', '"♪ audio | ▶ video"', "Error", '"undefined | undefined"'],
    correctIndex: 0,
    explanation: "Duck typing en acción: reproducir() no requiere que los objetos hereden de nada, solo que tengan play(). Ambos objetos literales lo cumplen: polimorfismo sin clases."
  },
  {
    id: "pol_007",
    topic: "polimorfismo",
    difficulty: "dificil",
    question: "¿Qué imprime este código?",
    code: `class Logger {\n  log(msg) { return \`[LOG] \${msg}\`; }\n}\nclass ErrorLogger extends Logger {\n  log(msg) { return \`[ERROR] \${super.log(msg)}\`; }\n}\nconst el = new ErrorLogger();\nconsole.log(el.log("fallo"));`,
    options: ['"[ERROR] [LOG] fallo"', '"[LOG] fallo"', '"[ERROR] fallo"', '"[LOG] [ERROR] fallo"'],
    correctIndex: 0,
    explanation: "ErrorLogger.log() invoca super.log('fallo') → '[LOG] fallo', luego envuelve: '[ERROR] [LOG] fallo'. Polimorfismo con decoración del comportamiento padre."
  },

  // ══════════════════════════════════════
  // ENCAPSULAMIENTO
  // ══════════════════════════════════════
  {
    id: "enc_001",
    topic: "encapsulamiento",
    difficulty: "facil",
    question: "¿Qué principio POO oculta los detalles internos de un objeto y expone solo lo necesario?",
    code: null,
    options: ["Encapsulamiento", "Herencia", "Polimorfismo", "Abstracción"],
    correctIndex: 0,
    explanation: "El encapsulamiento protege el estado interno de un objeto. En JS se logra con campos privados (#) y getters/setters que controlan el acceso."
  },
  {
    id: "enc_002",
    topic: "encapsulamiento",
    difficulty: "facil",
    question: "¿Qué imprime este código?",
    code: `class Caja {\n  #contenido;\n  constructor(item) { this.#contenido = item; }\n  abrir() { return this.#contenido; }\n}\nconst c = new Caja("regalo");\nconsole.log(c.abrir());`,
    options: ['"regalo"', "undefined", "Error", '"#contenido"'],
    correctIndex: 0,
    explanation: "#contenido es privado, solo accesible dentro de la clase. abrir() actúa como interfaz pública controlada para leer el valor interno."
  },
  {
    id: "enc_003",
    topic: "encapsulamiento",
    difficulty: "medio",
    question: "¿Qué ocurre al intentar acceder a un campo privado desde fuera de la clase?",
    code: `class Secreto {\n  #clave = "abc123";\n}\nconst s = new Secreto();\nconsole.log(s.#clave);`,
    options: ["SyntaxError", '"abc123"', "undefined", '"#clave"'],
    correctIndex: 0,
    explanation: "Acceder a un campo privado (#) fuera de la clase es un SyntaxError. La restricción es a nivel de lenguaje, no solo de convención."
  },
  {
    id: "enc_004",
    topic: "encapsulamiento",
    difficulty: "medio",
    question: "¿Qué imprime este código?",
    code: `class Temperatura {\n  #celsius;\n  constructor(c) { this.#celsius = c; }\n  get fahrenheit() {\n    return this.#celsius * 9 / 5 + 32;\n  }\n}\nconst t = new Temperatura(100);\nconsole.log(t.fahrenheit);`,
    options: ["212", "100", "373", "Error"],
    correctIndex: 0,
    explanation: "El getter fahrenheit convierte #celsius a Fahrenheit: 100 × 9/5 + 32 = 212. Los getters permiten acceso de solo lectura de forma controlada."
  },
  {
    id: "enc_005",
    topic: "encapsulamiento",
    difficulty: "dificil",
    question: "¿Qué imprime este código?",
    code: `class Edad {\n  #valor;\n  constructor(edad) {\n    this.#valor = edad < 0 ? 0 : edad;\n  }\n  get valor() { return this.#valor; }\n  set valor(n) { this.#valor = n < 0 ? 0 : n; }\n}\nconst e = new Edad(25);\ne.valor = -10;\nconsole.log(e.valor);`,
    options: ["0", "-10", "25", "Error"],
    correctIndex: 0,
    explanation: "El setter valida el input: si n < 0, asigna 0. Al pasar -10, el setter lo convierte a 0. El getter retorna ese valor protegido. El encapsulamiento garantiza invariantes."
  },
  {
    id: "enc_006",
    topic: "encapsulamiento",
    difficulty: "dificil",
    question: "¿Qué imprime este código?",
    code: `class CuentaBancaria {\n  #saldo = 0;\n  depositar(monto) {\n    if (monto > 0) this.#saldo += monto;\n  }\n  retirar(monto) {\n    if (monto > 0 && monto <= this.#saldo)\n      this.#saldo -= monto;\n  }\n  get saldo() { return this.#saldo; }\n}\nconst c = new CuentaBancaria();\nc.depositar(1000);\nc.retirar(300);\nc.retirar(800);\nconsole.log(c.saldo);`,
    options: ["700", "300", "1000", "-100"],
    correctIndex: 0,
    explanation: "Depósito: 1000. Retiro de 300: saldo = 700. Retiro de 800: 800 > 700, se rechaza. Saldo final: 700. El encapsulamiento impide que el saldo quede negativo."
  }
];
