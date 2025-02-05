FROM php:8.0-apache

# Install dependencies
RUN docker-php-ext-install pdo pdo_mysql

# Copy source code to the container
COPY src/ /var/www/html/

# Copy custom Apache configuration
COPY apache-config.conf /etc/apache2/conf-available/custom.conf

# Enable custom configuration
RUN a2enconf custom

# Expose port 80
EXPOSE 80
