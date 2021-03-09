# GAME COLLECTION

Link a la app [Game Collection] (https://hidden-atoll-40469.herokuapp.com/home/)

# El Proyecto

Una libreria de juegos, en el cual se pueden agregar juegos, companias creadoras de juegos y generos, para agregar estos elementos se necesita estar logueado, de lo contrario no apareceran los botones necesarios para realizar dichas operaciones.
La informacion es almacenada en una base de datos ( MongoDB), los juegos y companias estan enlazados de manera tal que no se puede eliminar una compania sin antes eliminar todos sus juegos.
Fue todo un desafio enfrentarme a los metodos POST y GET, pero luego de varios dias se fue simplifcando todo.
Para el log in se utilizo el middleware passportJs, con su "strategy" mas basica LocalStrategy (password y username)

# Herramientas Utilizadas

Fue realizado con JavaScript, NodeJs, MongoDB, Express, PassportJs, Css y Pug.