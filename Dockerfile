# Usa la imagen base de PHP 8.0
FROM php:8.0-cli

# Instala Composer globalmente
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia todos los archivos de tu aplicación al contenedor
COPY . /app

# Instala las dependencias de Composer sin dev y optimiza el autoloader
RUN composer install --no-dev --optimize-autoloader

# Expone el puerto 80 (puedes cambiarlo según sea necesario)
EXPOSE 80

# Ejecuta el servidor PHP integrado para servir la aplicación
CMD ["php", "-S", "0.0.0.0:80"]
