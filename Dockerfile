# Usa una imagen de PHP 8.0 con Apache
FROM php:8.0-apache

# Instala las extensiones PHP necesarias
RUN docker-php-ext-install pdo mysqli pdo_mysql zip

# Copia tu aplicación PHP al directorio raíz del servidor web en el contenedor
COPY . /var/www/html/

# Expone el puerto 80 (el puerto predeterminado de Apache)
EXPOSE 80

# Ejecuta el servidor Apache
CMD ["apache2-foreground"]
