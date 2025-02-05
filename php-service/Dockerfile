FROM php:8.2-apache

# Installer les dépendances nécessaires pour PDO MySQL
RUN apt-get update && apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev libmariadb-dev-compat libmariadb-dev && \
    docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install pdo pdo_mysql gd

# Activer les modules Apache
RUN a2enmod rewrite

# Copier la config Apache
COPY apache-config.conf /etc/apache2/sites-available/000-default.conf

# Copier l'application
COPY . /var/www/html/

# Donner les bons droits
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html

EXPOSE 80
CMD ["apache2-foreground"]
