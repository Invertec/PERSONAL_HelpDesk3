# Usa la imagen base de PHP 8.0
FROM php:8.0-cli
# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia todos los archivos de tu aplicación al contenedor
COPY . /app

# Expone el puerto 80 (puedes cambiarlo según sea necesario)
EXPOSE 80

# Ejecuta el servidor PHP integrado para servir la aplicación
CMD ["php", "-S", "0.0.0.0:80"]
