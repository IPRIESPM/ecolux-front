# Buscador de referencias frontend

## Autor

- [Isaac Julián](https://www.linkedin.com/in/isaac-juli%C3%A1n/)

## Resumen

El proyecto pretende ofrecer una solución para localizar dentro de un almacén, una referencia, devolviendo, todas las localizaciones de esta misma referencia, así cómo, la fecha dónde se guardo y la partida a la que pertenece, ordenadas por la fecha de referencia.

## Contexto

El programa está creando utilizando el framework de JavaScript Vue 3, opté por el uso de este framework, por la facilidad de lectura y de estructura que nos ofrece la composition api de Vue 3, ya que es muy similar a JavaScript Vanilla y AngularJS y teniendo una curva de aprendizaje muy corta, en respecto a otros frameworks o librerías. Con esto busco que el proyecto pueda ser mantenido o continuado por otros desabolladores, aunque no estén familiarizados con el sistema.

Para asegurarme el correcto uso y legibilidad del proyecto he decidido utilizar la librería de Eslint, que consta de un linter, encargado de mantener una lógica y estructura basada en el modelo de AirBnb, ampliamente reconocido y utilizando en la mayoría de proyectos, con el objetivo de mantener un código homogéneo, limpio y estructurado.

El despliegue de la aplicación está a cargo de un servidor privado virtual o VPS de la empresa Argentina DonWeb, ya que ofrece una simplicidad a la hora de montar, gestionar y mantener un servidor, dónde guardaremos los servicios de la aplicación integral, en este caso el frontend del proyecto. Asegurándonos que nuestra aplicación esté disponible 24/7 en cualquier parte del mundo.

## Objetivos

- Ofrecer de una manera rápida y sencilla de buscar referencias.
- Ser fácilmente mantenible y escalable.
- Posibilidad de poder gestionarse desde varios, sin necesidad de instalación.
- Posibilidad de poder trabajar de manera colaborativa, desde varios terminales y usuarios de manera simultánea.
- Ofrecer un puente entre oficina y almacén.
- Simplificar y optimizar la gestión de las referencias y acceso físico a estas.

## Fuera de objetivo

- No pretendo sustituir el uso de un ERP o una solución de backoffice integral, sino complementar y solucionar un problema muy especifico, de una manera rápida y accesible.
- No está pensado para reproducirse en Smartphones, PDAs o dispositivos con pantallas reducidas, ya que pretende ser una solución de control de stock activo, sino una manera sencilla de localizar una referencia.
- No prende trabajar junto a un ERP o sistemas de control de stock, sino funcionar de manera paralela, solucionado el problema planteado, sustituyendo a sistemas más limitados o rudimentarios cómo una hoja de cálculo.

## Solución alternativa

Se puede plantear cómo alternativa a esta aplicación el uso de una Solución de escritorio o web de forma local, asegurándonos y aumentando la seguridad evitando la exposición a internet de nuestra aplicación minimizando riesgos de seguridad y posibles escenarios, a costa de limitar su mantenimiento y ampliación de manera remota y el uso fuera de la empresa.

Cualquier ERP, ofrece una Solución similar al problema de localización, mantenimiento y trazabilidad de referencias, en tiempo real y sincronizado mediante las compras y ventas de la empresa, el problema de usar esta alternativa nos la encontramos si queremos realizar una trazabilidad paralela a la actual sin depender de compra/venta con objetivos de control, planificación, gestión estado general del almacén.
