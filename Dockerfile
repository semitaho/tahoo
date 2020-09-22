FROM php:7.3-apache
RUN apt-get update && apt-get -y install git
COPY . /var/www/html
WORKDIR /var/www/html
RUN php -r "readfile('http://getcomposer.org/installer');" | php -- --install-dir=/usr/bin/ --filename=composer
RUN chown -R www-data:www-data /var/www && chmod 755 /var/www
RUN php /usr/bin/composer install
COPY .envdocker /var/www/html/.env
RUN chown -R www-data:www-data /var/www/html \
    && a2enmod rewrite
#RUN chcon -R -t httpd_sys_rw_content_t /var/www/html/storage/logs
#CMD ["php", "artisan", "serve", "--host", "0.0.0.0", "--port=3000"]
