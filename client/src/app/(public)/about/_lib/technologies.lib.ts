export interface Technology {
  title: string
  image: string
  description: string
}

export const technologies: Technology[] = [
  {
    title: 'NextJS 13',
    image: '/img/tecnologias/next.svg',
    description:
      'Next.js es un framework de React que permite crear aplicaciones web y sitios web estáticos. Next.js proporciona una serie de características que facilitan el desarrollo de aplicaciones web y sitios web estáticos, como el enrutamiento automático, la generación de páginas estáticas y la renderización del lado del servidor.'
  },
  {
    title: 'Typescript',
    image: '/img/tecnologias/typescript.svg',
    description: 'TypeScript es un lenguaje de programación de código abierto desarrollado y mantenido por Microsoft.'
  },
  {
    title: 'Redux Toolkit',
    image: '/img/tecnologias/redux.svg',
    description:
      'Redux es una librería de gestión de estado para aplicaciones JavaScript de una sola página (SPA). Se utiliza principalmente con React, pero también se puede utilizar con otras bibliotecas o marcos de trabajo de JavaScript. Redux se basa en la arquitectura Flux y se centra en la idea de que el estado de la aplicación debe ser centralizado y predecible.'
  },
  {
    title: 'Sass',
    image: '/img/tecnologias/sass.svg',
    description:
      'Sass es un preprocesador de CSS que permite escribir código CSS de manera más eficiente y estructurada. Con Sass, puedes utilizar variables, anidamiento de selectores, mixins, funciones y operadores matemáticos, lo que facilita la escritura y el mantenimiento de hojas de estilo. Además, Sass permite la creación de archivos parciales que se pueden importar en otros archivos para una mayor modularidad y reutilización de código.'
  },
  {
    title: 'Figma',
    image: '/img/tecnologias/figma.svg',
    description:
      'Figma es una herramienta de diseño de interfaz de usuario (UI) basada en la nube que permite a los diseñadores y equipos de diseño colaborar en tiempo real. Figma cuenta con una interfaz intuitiva y fácil de usar que permite crear diseños, prototipos y animaciones interactivas. Figma también ofrece una amplia variedad de recursos, como iconos, componentes, plantillas y complementos, que facilitan la creación de diseños de alta calidad de manera más rápida y eficiente.'
  },
  {
    title: 'NestJS',
    image: '/img/tecnologias/nest.svg',
    description:
      'NestJS es un framework de Node.js que permite crear aplicaciones web y API REST de manera rápida y sencilla. NestJS se basa en el concepto de middleware, que es una función que se ejecuta entre la solicitud y la respuesta del servidor. NestJS proporciona una serie de middleware predefinidos que facilitan la creación de aplicaciones web y API REST.'
  },
  {
    title: 'Sequelize',
    image: '/img/tecnologias/sequelize.svg',
    description:
      'Sequelize es un ORM (Object Relational Mapping) para Node.js que permite a los desarrolladores trabajar con bases de datos relacionales como MySQL, PostgreSQL, SQLite y Microsoft SQL Server. Sequelize proporciona una interfaz sencilla y fácil de usar para definir modelos, realizar consultas y realizar operaciones CRUD en la base de datos.'
  },
  {
    title: 'PostgreSQL',
    image: '/img/tecnologias/postgresql.svg',
    description:
      'PostgreSQL es un sistema de gestión de bases de datos relacional (RDBMS) de código abierto que permite a los desarrolladores crear y administrar bases de datos relacionales. PostgreSQL es un sistema de gestión de bases de datos relacional (RDBMS) de código abierto que permite a los desarrolladores crear y administrar bases de datos relacionales.'
  }
]
